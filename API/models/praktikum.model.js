const sql = require("../models/user.model");

// constructor
const Row = function (Row) {
    this.title = Row.title;
    this.description = Row.description;
    this.published = Row.published;
};

Row.tabelName = `praktikum`

Row.create = () => {
    let query = `CREATE TABLE IF NOT EXISTS ${Row.tabelName}
        ( 
            id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            name varchar(255) NOT NULL, 
            description varchar(255) NOT NULL, 
            image varchar(255) NOT NULL, 
            url varchar(255) DEFAULT 'KABUPATEN MINAHASA TENGGARA' 
        ) 
        ENGINE=InnoDB DEFAULT CHARSET=utf8;`
    try {
        sql.query(query);
    } catch {
        error => {
            console.log(error);
        }
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

Row.getAll = (params, result) => {

    // let query = `SELECT * FROM ${Row.tabelName}`
    let query = `SELECT * FROM ${Row.tabelName} `
    query = query + 'WHERE `group` = "pscs"'
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("plant.model.js:getAll", res);
        result(null, res);
    });
};

Row.remove = (id, result) => {
    sql.query(`DELETE FROM ${Row.tabelName} WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Row with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Row with id: ", id);
        result(null, res);
    });
};

Row.removeAll = result => {
    sql.query(`DELETE FROM ${Row.tabelName}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Rows`);
        result(null, res);
    });
};

module.exports = Row;