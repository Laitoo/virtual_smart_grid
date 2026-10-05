
module.exports = app => {

    var ctrl = require("../controller/praktikum.controller");
    var router = require("express").Router();

    ctrl.createTable();

    // Retrieve all Tutorials
    router.get("/", ctrl.findAll);

    app.use('/api/praktikum', router);

}