const { mqttEmiter } = require('../services/realtime/mqtt.service');
const { canControlPlant } = require('../middleware/verifyToken.middleware');

// Nama variabel .env yang berisi topik MQTT perintah untuk tiap pembangkit.
// (Nama berawalan VITE_ dipertahankan agar .env yang sudah ada tetap berlaku.)
const TOPIC_ENV = {
    pltb: 'VITE_MQTT_PLTB_COMMAND',
    pltmh: 'VITE_MQTT_PLTMH_COMMAND',
    pv: 'VITE_MQTT_PV_COMMAND',
};

const TAG_PATTERN = /^[A-Za-z0-9_.-]{1,64}$/;

// Kirim satu perintah { tag, value } ke topik MQTT. Token sudah diverifikasi oleh middleware.
const publish = async (topic, data, response) => {
    if (!topic) {
        return response.status(500).json({
            error: true,
            message: 'Topik MQTT perintah belum dikonfigurasi (periksa file .env)',
        });
    }
    try {
        const result = await mqttEmiter({ command: topic, data });
        response.json(result);
    } catch (error) {
        console.log('controller/command.controller.js:publish error', error);
        response.status(500).json({ error: true, message: error.message || 'Gagal mengirim perintah' });
    }
};

// Perintah umum dari tombol-tombol di website: body = { tag, value }
const commandFor = (plant, topicKey) => (request, response) => {
    const { tag, value } = request.body || {};

    if (typeof tag !== 'string' || !TAG_PATTERN.test(tag)) {
        return response.status(400).json({ error: true, message: 'tag perintah tidak valid' });
    }
    if (value === undefined || value === null || String(value).length > 32) {
        return response.status(400).json({ error: true, message: 'value perintah tidak valid' });
    }

    console.log(`command.controller:${plant}`, { user: request.userId, role: request.userRole, tag, value });
    return publish(process.env[TOPIC_ENV[topicKey]], { tag, value: String(value) }, response);
};

exports.pltb = commandFor('pltb', 'pltb');
exports.pltmh = commandFor('pltmh', 'pltmh');
exports.pv = commandFor('pv', 'pv');

// --- SMART VOLTAGE CONTROL (SINERGI) ---
// Body: { plant_type: 'pltb' | 'pltmh' | 'plts' | 'pv', target_voltage: number }
exports.setVoltage = (request, response) => {
    const { plant_type, target_voltage } = request.body || {};

    const plant = String(plant_type || '').toLowerCase();
    const topicKey = plant === 'plts' ? 'pv' : plant;
    if (!TOPIC_ENV[topicKey]) {
        return response.status(400).json({ error: true, message: 'plant_type tidak valid (pltb, pltmh, plts/pv)' });
    }

    // Satu pembangkit per perintah, jadi otorisasi dicek di sini (plant baru diketahui dari body).
    if (!canControlPlant(request.userRole, plant)) {
        return response.status(403).json({ error: true, message: `Role '${request.userRole}' tidak boleh mengendalikan ${plant}` });
    }

    // Batas tegangan alat. Bisa diubah lewat .env (VOLTAGE_MIN / VOLTAGE_MAX).
    const min = Number(process.env.VOLTAGE_MIN || 5);
    const max = Number(process.env.VOLTAGE_MAX || 24);

    if (target_voltage === undefined || target_voltage === null || target_voltage === '') {
        return response.status(400).json({ error: true, message: 'target_voltage harus diisi' });
    }
    const voltage = Number(target_voltage);
    if (!Number.isFinite(voltage)) {
        return response.status(400).json({ error: true, message: 'target_voltage harus berupa angka' });
    }
    if (voltage < min || voltage > max) {
        return response.status(400).json({ error: true, message: `target_voltage harus antara ${min} V dan ${max} V` });
    }

    // Dibulatkan 2 desimal agar tidak mengirim noise floating point (mis. 12.100000000000001).
    const value = String(Math.round(voltage * 100) / 100);

    console.log('command.controller:setVoltage', { user: request.userId, role: request.userRole, plant, value });
    return publish(process.env[TOPIC_ENV[topicKey]], { tag: 'set_voltage', value }, response);
};
