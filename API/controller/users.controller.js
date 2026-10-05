const jwt = require("jsonwebtoken");
const model = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createTable = (periode) => {
  // console.log("users.controller.js:createTable")
  model.create(periode);
};

exports.findAll = (request, response) => {
  const params = {};
  // console.log("plants controller call")
  model.getAll((err, data) => {
    // console.log("response")
    if (err)
      response.status(500).send({
        message: err.message || `Some error occurred while retrieving Test .`,
      });
    else response.json({ error: false, data });
  });
};

exports.findByName = (request, response) => {
  const params = request.params;
  // console.log(params)
  model.findByName(params, (err, data) => {
    console.log("response");
    if (err)
      response.status(500).send({
        message: err.message || `Some error occurred while retrieving Test .`,
      });
    else response.json({ error: false, data });
  });
};

exports.findByToken = (request, response) => {
  const token = request.headers["authorization"];
  if (!token) return response.sendStatus(403);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return response.sendStatus(403);
    request.userId = decoded.id;
    model.findById(request.userId, (err, packet) => {
      console.log("response", packet);
      if (err) {
        response.status(500).send({
          error: true,
          message: err.message || `Some error occurred while retrieving Test .`,
        });
      } else {
        const data = JSON.parse(JSON.stringify(packet));
        console.log("users.controller.js:findByToken", data);
        response.json({ error: false, data });
      }
    });
  });
};

exports.login = (request, response) => {
  const body = request.body;
  // console.log("IP", request.ip)
  model.findByName(body.username, (err, row) => {
    if (err) {
      console.log(err);
      response.status(500).send({
        error: false,
        message: err.message || `Some error occurred .`,
      });
    } else {
      const json = JSON.parse(JSON.stringify(row));
      // console.log("users.controller.js:login", json)
      const data = json.data;
      if (json.state) {
        bcrypt.compare(body.password, data.password, function (err, result) {
          console.log("bcrypt", err, result);
          if (result) {
            data.token = jwt.sign(
              { id: data.id, role: data.role },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            response.json({ error: false, data });
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

exports.insert = (request, response) => {
  const body = request.body;
  model.findByName(body.username, (err, row) => {
    if (err) {
      response.status(500).send({
        error: false,
        message: err.message || `Some error occurred .`,
      });
    } else {
      const json = JSON.parse(JSON.stringify(row));
      // console.log("users.controller.js:insert", json)
      if (json.state) {
        response.json({ error: true, message: "User already exists" });
      } else {
        bcrypt.hash(body.password, 10, function (err, hasilBcrypt) {
          if (err) {
            response.json({ error: true, message: "bcrypt error" });
          }
          model.insert(
            "users",
            { name: body.username, password: hasilBcrypt },
            (err, data) => {
              response.json({
                error: true,
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
