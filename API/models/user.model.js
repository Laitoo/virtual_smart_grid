const sql = require("./db.model");
const Row = {}

Row.tabelName = `users`

Row.create = () => {
    let query = `CREATE TABLE IF NOT EXISTS ${Row.tabelName}
        ( 
            id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            name varchar(255) NOT NULL, 
            password varchar(255) NOT NULL, 
            role enum('root', 'admin', 'dosen', 'asisten', 'praktikan') DEFAULT 'praktikan'
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

        console.log(`created ${Row.tabelName}: `, { id: res.insertId, ...newData });
        result(null, { id: res.insertId, ...newData });
    });
};

Row.findById = (id, result) => {
    sql.query(`SELECT * FROM ${Row.tabelName} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Row: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Row with the id
        result({ kind: "not_found" }, null);
    });
};

Row.findByName = (name, result) => {
    const str = `SELECT * FROM ${Row.tabelName} WHERE name = "${name}"`
    // console.log("Query: ", str);
    sql.query(str, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            // console.log("found Row: ", res[0]);
            result(null, { state: true, data: res[0] });
            return;
        }

        // not found Row with the id
        result(null, { state: false, code: -1, message: "user name not_found" }, null);
    });
};

Row.getAll = (result) => {

    let query = `SELECT * FROM ${Row.tabelName} `
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        // console.log("users.model.js:getAll", res);
        result(null, res);
    });
};

module.exports = Row;