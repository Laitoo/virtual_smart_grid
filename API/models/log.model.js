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

Row.create = (params) => {
    Row.tableName = params.group + "_" + moment(params.date).format("YYYYMMDD");
    let Q1 = `CREATE TABLE IF NOT EXISTS ${Row.tableName}
        ( 
            id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            _terminalTime varchar(100) NOT NULL, `
    let Q2 = "";
    let idx = 1;
    // console.log("log.model/Create -> Cek File Existing",Row.tableName)
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
    let query = Q1 + Q2 + Q3;
    return new Promise(
        (resolve, reject) => {
            try {
                sql.query(query);
                resolve({ state: true, msg: `create table ${Row.tableName} success` })
            } catch (error) {
                reject({ state: true, msg: `create table ${Row.tableName} failed` })
            }
        }
    )
}

Row.insert = (params) => {
    Row.tableName = params.group + "_" + params.periode;
    sql.query(`INSERT INTO ${Row.tableName} SET ?`, params.data, (err, res) => {
        if (err) {
            console.log("ERROR SQL INSERT", Row.tableName, err);
        } else {
            console.log("SQL INSERT", Row.tableName, params.group, new Date());
        }
    });


}

Row.insertRequest = (prefix, newData, result) => {
    Row.create(prefix).then(
        data => {
            // console.log(newData);
            sql.query(`INSERT INTO ${Row.tableName} SET ?`, newData, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    // result(err, null);
                    return;
                }

            });
        }
    )

};

Row.findDaily = (params,result) => {

    let length = Number(params.periode) === 1 ? 10 : Number(params.periode) === 2 ? 13 : 16;
    let Q1 = `SELECT _terminalTime,`
    let Q2 = "";
    let idx = 1;
    Row.json[params.group].forEach(
        data => {
            Q2 += `ROUND(AVG(${data.attr}),2) as ${data.attr}`
            if (idx < Row.json[params.group].length) {
                Q2 += ","
            }
            idx++;
        }
    )
    let Q3 = ` FROM ${Row.tableName} `
    Q3 += ` WHERE LEFT(_terminalTime,10) LIKE LEFT("${params.date}",10) `
    Q3 += `GROUP BY LEFT(_terminalTime,${length}) `
    Q3 += `ORDER BY _TerminalTime DESC `
    if ( params.limit > 0 && params.offset >=0 ) {
        Q3 += `LIMIT ${params.limit} OFFSET ${params.offset}`
    }
    Q3 += `;`

    const query = Q1+Q2+Q3;

    console.log(Row.tableName, query)
    try {
        sql.query(query, (err,res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("log.model.js:getAll", params.date);
            result(null, res);
        });
    } catch (error) {
        result({ state: true, msg: `create table ${Row.tableName} failed` })
    }
}

module.exports = Row;