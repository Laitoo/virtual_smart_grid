
const model = require("../models/praktikum.model");

exports.createTable = (periode) => {
    model.create(periode);
}

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (request, response) => {
    const params = {}
    // console.log("plants controller call")
    model.getAll(params, (err, data) => {
        // console.log("response")
        if (err)
            response.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving Test .`
            });
        else response.json(data);
    });

};