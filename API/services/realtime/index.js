var moment = require('moment-timezone');
const SOCKET_TAG = require("./json/socket_tag.json");
const { insert, create } = require('../../controller/insert.controller');
const { setSocketForMQTT } = require('./mqtt.service');

const json = {
    [SOCKET_TAG.pltsPV]: { index: 0, data: require("./json/pv.json") },
    [SOCKET_TAG.pltsOnGrid]: { index: 1, data: require("./json/ongrid.json") },
    [SOCKET_TAG.pltsOffGrid]: { index: 2, data: require("./json/offgrid.json") },
    [SOCKET_TAG.pltb]: { index: 3, data: require("./json/pltb.json") },
    [SOCKET_TAG.pltmh]: { index: 4, data: require("./json/pltmh.json") },
}

module.exports = (server) => {

    const brokerUrl = `mqtt://${process.env.MQTT_BROKER_HOST}:${process.env.MQTT_PORT}`
    const TOPICS = require("./json/topics.json")

    const ioCorsOrigins = [
        `http://localhost:${process.env.CLIENT_SOCKET_PORT}`,
        `${process.env.CLIENT_SOCKET_HOST}`
    ]

    mqttSinergi = require("./mqtt.service")(brokerUrl, TOPICS, cbMqtt);

    require("./socket.service")(server, ioCorsOrigins, cbSocketIO)
        .then(
            socket => {
                setSocketForMQTT(socket);
            }
        )

}

const Random = (value) => {
    return Math.random() * value;
}

const ValueGenerator = (fieldValue, randomValue = 50, isToggle = false) => {
    const mode = process.env.APP_MODE;
    let retValue = fieldValue;

    if (mode === "dev") {
        if (isToggle) {
            retValue = fieldValue && fieldValue > 0 ? fieldValue : 0;
        } else {
            retValue = fieldValue && fieldValue > 0 ? fieldValue : Random(randomValue).toFixed(2);
        }
    } else {
        retValue = fieldValue && Number(fieldValue) > 0 ? Number(fieldValue) : 0;
    }
    return retValue;
}

const cbSocketIO = (ioObject, client) => {

    client.on(SOCKET_TAG.growattService, (data) => {
        console.log(data)
    })

    if (process.env.APP_WEBCAM === "1") require("../webcam")(ioObject);
    console.log("Callback  by " + client.id);

}

let count = [10, 10, 10, 10, 10]
let fileExist = [false, false, false, false, false]
let periode = [null, null, null, null, null]
let lastPeriode = [null, null, null, null, null]
const cbMqtt = (socket, group, code, data) => {

    let index = 0;
    let payload = { _terminalTime: data._terminalTime };
    data.code = code

    // console.log("test", group)
    
    if (json && json[group] && json[group].data) {

        json[group].data.forEach(
            (py) => {
                payload[py.attr] = ValueGenerator(data[py.field], 50, py.toggle, py.attr, py.field)
            }
        )
        index = json[group].index;

        periode[index] = moment(data._terminalTime).format("YYYYMMDD");

        if (lastPeriode[index] !== periode[index]) {
            lastPeriode[index] = periode[index];
            fileExist[index] = false
        }
        if (!fileExist[index] && group !== SOCKET_TAG.pltmh) {
            create({ group, periode: periode[index], data: payload }).then(
                data => {
                    fileExist[index] = true;
                }
            )
        }
        count[index]++;
        if (count[index] >= process.env.MQTT_SUBSCRIBE_COUNT) {
            // if (group === SOCKET_TAG.pltsPV) console.log("group", group, data._terminalTime)
            // to change MySQL table name, just set periode ex: dayly name : YYYYMMDD, 20250105   
            // array count[?] count increment according to Gateway/HMI published interval
            //if (fileExist[index]) insert({ group, periode: periode[index], data: payload })
            count[index] = 0;
        }

    //    console.log("test", code, group)
        if (socket) socket.emit(group, { code, group, payload });

    }

}