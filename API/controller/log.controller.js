var moment = require('moment-timezone');
const model = require("../models/log.model");

exports.createTable = (periode) => {
    model.create(periode).catch(error => console.log("log.controller createTable", error));
}

// GET /log/daily?group=&date=YYYY-MM-DD&periode=1|2|3[&limit=&offset=]
exports.findDaily = async (request, response) => {
    const { group, date, periode } = request.query;

    if (!model.isValidGroup(group)) {
        return response.status(400).json({ error: true, message: "group tidak valid" });
    }
    if (typeof date !== "string" || !moment(date, "YYYY-MM-DD", true).isValid()) {
        return response.status(400).json({ error: true, message: "date harus berformat YYYY-MM-DD" });
    }
    if (![1, 2, 3].includes(Number(periode))) {
        return response.status(400).json({ error: true, message: "periode harus 1 (harian), 2 (jam), atau 3 (menit)" });
    }

    let params = { group, date, periode: Number(periode) }

    const limit = Number(request.query.limit)
    const offset = Number(request.query.offset)
    if (request.query.limit && request.query.offset) {
        if (Number.isInteger(limit) && Number.isInteger(offset) && limit > 0 && offset >= 0) {
            params.limit = limit
            params.offset = offset
        }
    }

    try {
        await model.create(params);
    } catch (error) {
        return response.status(500).json({ error: true, message: error.msg || "Gagal menyiapkan tabel log" });
    }

    model.findDaily(
        params,
        (err, data) => {
            if (err)
                response.status(500).json({
                    error: true,
                    message:
                        err.message || `Some error occurred while retrieving Test .`
                });
            else response.json({ error: false, data });
        }
    )

}
