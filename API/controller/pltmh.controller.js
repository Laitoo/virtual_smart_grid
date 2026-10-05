const { Log } = require("../models/log.model")

exports.insertPLTMH = (count, params) => {
    params.data.simulasi = "plts";
    Log.insert(params.plant + "_" + params.periode, params.data)
}

