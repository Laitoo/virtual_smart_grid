const sql = require("./db.model");
const Row = {}

Row.tabelName = `users`

// Role yang valid (sama dengan enum di tabel dan menu di website).
Row.roles = ['root', 'admin', 'dosen', 'asisten', 'praktikan', 'plts', 'pltmh', 'pltb'];

// Kolom yang aman dikirim ke client (tanpa password / refresh_token).
Row.safeColumns = `id, name, role`;

Row.create = () => {
    let query = `CREATE TABLE IF NOT EXISTS ${Row.tabelName}
        (
            id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            refresh_token varchar(255) NOT NULL DEFAULT '',
            role enum('root','admin','dosen','asisten','praktikan','plts','pltmh','pltb') DEFAULT 'praktikan'
        )
        ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    // console.log("user.model.js:create", query)
    try {
        sql.query(query);
    } catch (error) {
        console.log(error);
    }
}

Row.insert = (tabelName, newData, result) => {
    sql.query(`INSERT INTO ${Row.tabelName} SET ?`, newData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Jangan ikut mengembalikan hash password.
        const { password, ...safeData } = newData;
        console.log(`created ${Row.tabelName}: `, { id: res.insertId, ...safeData });
        result(null, { id: res.insertId, ...safeData });
    });
};

Row.findById = (id, result) => {
    sql.query(`SELECT ${Row.safeColumns} FROM ${Row.tabelName} WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found Row with the id
        result({ kind: "not_found" }, null);
    });
};

// Dipakai untuk login, jadi sengaja mengembalikan baris lengkap (termasuk hash password).
// Pemanggil WAJIB membuang kolom password sebelum mengirimnya ke client.
Row.findByName = (name, result) => {
    sql.query(`SELECT * FROM ${Row.tabelName} WHERE name = ?`, [name], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, { state: true, data: res[0] });
            return;
        }

        // not found Row with the name
        result(null, { state: false, code: -1, message: "user name not_found" }, null);
    });
};

Row.getAll = (result) => {

    let query = `SELECT ${Row.safeColumns} FROM ${Row.tabelName} `
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Row;
