const jwt = require('jsonwebtoken');
const { mqttEmiter } = require('../services/realtime/mqtt.service');

const publish = (token, command, data, request, response) => {
    // Memisahkan "Bearer " jika token dikirim menggunakan format standar
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(actualToken, process.env.SECRET_KEY, async (err, decoded) => {
        console.log(err, decoded)
        if (err) {
            response.status(403).send({
                error: true,
                message: err.message || `Some error occurred while retrieving Test .`
            });
        } else {
            // request.userId = decoded.id;
            const result = await mqttEmiter({ command, data })
            console.log(command, data)
            // response.json({ id: request.userId, role: decoded.role, data: request.body })
            response.json(result)
        }
    });
}

exports.pltb = (request, response) => {
    const token = request.headers['authorization'];
    // console.log("controller/command.controller.jsx:pltb:body", request.body)
    if (!token) return response.sendStatus(403);
    publish(token, process.env.VITE_MQTT_PLTB_COMMAND, request.body, request, response)
};

exports.pltmh = (request, response) => {
    const token = request.headers['authorization'];
    // console.log("controller/command.controller.jsx:pltmh:body", request.body)
    if (!token) return response.sendStatus(403);
    publish(token, process.env.VITE_MQTT_PLTMH_COMMAND, request.body, request, response)
};

exports.pv = (request, response) => {
    const token = request.headers['authorization'];
    console.log("controller/command.controller.jsx:pv:body", request.body)
    if (!token) return response.sendStatus(403);
    publish(token, process.env.VITE_MQTT_PV_COMMAND, request.body, request, response)
};

// --- FITUR BARU: SMART VOLTAGE CONTROL (SINERGI) ---
exports.setVoltage = (request, response) => {
    const token = request.headers['authorization'];
    if (!token) return response.sendStatus(403);

    // Menerima request dari komponen frontend SmartVoltageControl
    const { plant_type, target_voltage } = request.body;

    if (!plant_type || target_voltage === undefined) {
        return response.status(400).send({ 
            error: true, 
            message: "plant_type dan target_voltage harus diisi!" 
        });
    }

    // 1. Tentukan topik (command) MQTT berdasarkan jenis pembangkit
    let mqttTopic;
    if (plant_type === 'pltb') {
        mqttTopic = process.env.VITE_MQTT_PLTB_COMMAND;
    } else if (plant_type === 'pltmh') {
        mqttTopic = process.env.VITE_MQTT_PLTMH_COMMAND;
    } else if (plant_type === 'plts' || plant_type === 'pv') {
        mqttTopic = process.env.VITE_MQTT_PV_COMMAND;
    } else {
        return response.status(400).send({ error: true, message: "plant_type tidak valid!" });
    }

    // 2. Susun payload untuk alat
    // Menggunakan struktur data standar seperti yang Anda gunakan di alat (contoh: { tag: 'fan', value: '1' })
    const dataPayload = {
        tag: "set_voltage", 
        value: String(target_voltage) // Diubah ke string untuk mengantisipasi alat yang membaca payload sebagai string
    };

    console.log(`controller/command.controller.js:setVoltage:body`, request.body);

    // 3. Eksekusi pengiriman menggunakan fungsi publish bawaan Anda
    publish(token, mqttTopic, dataPayload, request, response);
};