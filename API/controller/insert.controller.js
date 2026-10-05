const Log = require("../models/log.model")

exports.create = (params) => {
    return new Promise(
        (resolve,reject) => {
           Log.create(params).then(
                data => {
                    resolve(data)
                }
            ).catch (
                error => {
                    reject(error)
                }
            )
        }
    )
}

exports.insert = (params) => {
    Log.insert(params)
}
