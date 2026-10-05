const jwt = require("jsonwebtoken");
const model = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const MIN_PASSWORD_LENGTH = 6;

exports.createTable = (periode) => {
  // console.log("users.controller.js:createTable")
  model.create(periode);
};

// GET /user  (hanya root/admin, lihat users.route.js). Tidak mengembalikan hash password.
exports.findAll = (request, response) => {
  model.getAll((err, data) => {
    if (err)
      response.status(500).send({
        error: true,
        message: err.message || `Some error occurred while retrieving Test .`,
      });
    else response.json({ error: false, data });
  });
};

// GET /user/byToken  (verifyToken sudah mengisi request.userId)
exports.findByToken = (request, response) => {
  model.findById(request.userId, (err, data) => {
    if (err) {
      response.status(500).send({
        error: true,
        message: err.message || `Some error occurred while retrieving Test .`,
      });
    } else {
      response.json({ error: false, data });
    }
  });
};

exports.login = (request, response) => {
  const body = request.body || {};

  // Pastikan berupa string (mencegah objek/array disuntikkan ke query).
  if (typeof body.username !== "string" || typeof body.password !== "string") {
    return response.json({ error: true, message: "Invalid username or password" });
  }

  model.findByName(body.username, (err, row) => {
    if (err) {
      console.log(err);
      response.status(500).send({
        error: true,
        message: err.message || `Some error occurred .`,
      });
    } else {
      const json = JSON.parse(JSON.stringify(row));
      const data = json.data;
      if (json.state) {
        bcrypt.compare(body.password, data.password, function (err, result) {
          if (result) {
            const token = jwt.sign(
              { id: data.id, role: data.role },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            // Jangan kirim hash password / refresh_token ke client.
            const { password, refresh_token, ...user } = data;
            response.json({ error: false, data: { ...user, token } });
          } else {
            response.json({
              error: true,
              message: "Invalid username or password",
            });
          }
        });
      } else {
        response.json({ error: true, message: "Invalid username or password" });
      }
    }
  });
};

// POST /user/insert  (hanya root/admin). Body: { username, password, role? }
exports.insert = (request, response) => {
  const body = request.body || {};

  if (typeof body.username !== "string" || body.username.trim() === "") {
    return response.status(400).json({ error: true, message: "username wajib diisi" });
  }
  if (typeof body.password !== "string" || body.password.length < MIN_PASSWORD_LENGTH) {
    return response.status(400).json({ error: true, message: `password minimal ${MIN_PASSWORD_LENGTH} karakter` });
  }
  const role = body.role === undefined ? "praktikan" : body.role;
  if (!model.roles.includes(role)) {
    return response.status(400).json({ error: true, message: "role tidak valid" });
  }
  // Hanya root yang boleh membuat akun root.
  if (role === "root" && request.userRole !== "root") {
    return response.status(403).json({ error: true, message: "Hanya root yang boleh membuat akun root" });
  }

  const username = body.username.trim();

  model.findByName(username, (err, row) => {
    if (err) {
      response.status(500).send({
        error: true,
        message: err.message || `Some error occurred .`,
      });
    } else {
      const json = JSON.parse(JSON.stringify(row));
      if (json.state) {
        response.json({ error: true, message: "User already exists" });
      } else {
        bcrypt.hash(body.password, saltRounds, function (err, hasilBcrypt) {
          if (err) {
            return response.json({ error: true, message: "bcrypt error" });
          }
          model.insert(
            "users",
            { name: username, password: hasilBcrypt, refresh_token: "", role },
            (err, data) => {
              if (err) {
                return response.status(500).json({ error: true, message: "Gagal menyimpan user" });
              }
              response.json({
                error: false,
                message: "User sudah disimpan",
                data,
              });
            }
          );
        });
      }
    }
  });
};
