var moment = require('moment-timezone');
const sql = require("./db.model");
const SOCKET_TAG = require("../services/realtime/json/socket_tag.json");

const Row = function (Row) {
    this.title = Row.title
};

Row.json = {
    [SOCKET_TAG.pltsPV]: require("../services/realtime/json/pv.json"),
    [SOCKET_TAG.pltsOffGrid]: require("../services/realtime/json/offgrid.json"),
    [SOCKET_TAG.pltsOnGrid]: require("../services/realtime/json/ongrid.json"),
    [SOCKET_TAG.pltb]: require("../services/realtime/json/pltb.json"),
    [SOCKET_TAG.pltmh]: require("../services/realtime/json/pltmh.json")
}

Row.prefix = "tr_";

// Hanya group yang terdaftar di Row.json yang boleh dipakai sebagai bagian nama tabel.
Row.isValidGroup = (group) => {
    return typeof group === "string" && Object.prototype.hasOwnProperty.call(Row.json, group);
}

// Nama tabel: <group>_<YYYYMMDD>. Kedua bagian sudah divalidasi, jadi aman dipakai sebagai identifier.
Row.tableNameFor = (group, yyyymmdd) => {
    if (!Row.isValidGroup(group)) throw new Error(`group tidak dikenal: ${group}`);
    if (!/^\d{8}$/.test(String(yyyymmdd))) throw new Error(`periode tabel tidak valid: ${yyyymmdd}`);
    return `${group}_${yyyymmdd}`;
}

Row.create = (params) => {
    return new Promise(
        (resolve, reject) => {
            let tableName;
            try {
                // Tanpa params.date (dipanggil dari service realtime) = hari ini; selain itu wajib YYYY-MM-DD.
                const date = params.date === undefined ? moment() : moment(params.date, "YYYY-MM-DD", true);
                if (!date.isValid()) throw new Error(`tanggal tidak valid: ${params.date}`);
                tableName = Row.tableNameFor(params.group, date.format("YYYYMMDD"));
            } catch (error) {
                return reject({ state: false, msg: error.message });
            }

            let Q1 = `CREATE TABLE IF NOT EXISTS ${tableName}
        (
            id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            _terminalTime varchar(100) NOT NULL, `
            let Q2 = "";
            let idx = 1;
            Row.json[params.group].forEach(
                data => {
                    Q2 += `${data.attr} ${data.dataType} ${data.dataType === "int" ? "DEFAULT 0" : ""}`
                    if (idx < Row.json[params.group].length) {
                        Q2 += ","
                    }
                    idx++;
                }
            )
            let Q3 = ` ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
            const query = Q1 + Q2 + Q3;

            // Tunggu sampai CREATE TABLE benar-benar selesai (sebelumnya langsung resolve tanpa menunggu).
            sql.query(query, (err) => {
                if (err) {
                    console.log("log.model/create error", tableName, err.message);
                    reject({ state: false, msg: `create table ${tableName} failed` });
                } else {
                    resolve({ state: true, msg: `create table ${tableName} success`, tableName });
                }
            });
        }
    )
}

Row.insert = (params) => {
    let tableName;
    try {
        tableName = Row.tableNameFor(params.group, params.periode);
    } catch (error) {
        console.log("ERROR SQL INSERT", error.message);
        return;
    }
    sql.query(`INSERT INTO ${tableName} SET ?`, params.data, (err, res) => {
        if (err) {
            console.log("ERROR SQL INSERT", tableName, err);
        } else {
            console.log("SQL INSERT", tableName, params.group, new Date());
        }
    });
}

// params: { group, date: 'YYYY-MM-DD', periode: 1|2|3, limit?, offset? } -- sudah divalidasi di controller.
Row.findDaily = (params, result) => {

    let tableName;
    let day;
    try {
        const date = moment(params.date, "YYYY-MM-DD", true);
        if (!date.isValid()) throw new Error(`tanggal tidak valid: ${params.date}`);
        day = date.format("YYYY-MM-DD");
        tableName = Row.tableNameFor(params.group, date.format("YYYYMMDD"));
    } catch (error) {
        return result({ message: error.message }, null);
    }

    // 1 = per hari (10 karakter), 2 = per jam (13), selain itu = per menit (16)
    const length = Number(params.periode) === 1 ? 10 : Number(params.periode) === 2 ? 13 : 16;

    const columns = Row.json[params.group].map(
        data => `ROUND(AVG(${data.attr}),2) as ${data.attr}`
    ).join(",");

    let query = `SELECT _terminalTime,${columns} FROM ${tableName} `
    query += ` WHERE LEFT(_terminalTime,10) = ? `
    query += `GROUP BY LEFT(_terminalTime,${length}) `
    query += `ORDER BY _terminalTime DESC `

    const values = [day];
    if (params.limit > 0 && params.offset >= 0) {
        query += `LIMIT ? OFFSET ?`
        values.push(Number(params.limit), Number(params.offset));
    }

    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("log.model.js:findDaily", tableName, day);
        result(null, res);
    });
}

module.exports = Row;
