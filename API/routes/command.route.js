const { verifyToken, authorizePlant } = require("../middleware/verifyToken.middleware");

module.exports = (app) => {

    var ctrl = require("../controller/command.controller");
    var router = require("express").Router();

    // Semua perintah wajib login, lalu dicek role-nya terhadap pembangkit yang dituju.
    router.post("/pltmh", verifyToken, authorizePlant("pltmh"), ctrl.pltmh);
    router.post("/pltb", verifyToken, authorizePlant("pltb"), ctrl.pltb);
    router.post("/ongrid", verifyToken, authorizePlant("ongrid"), ctrl.pv);
    router.post("/offgrid", verifyToken, authorizePlant("offgrid"), ctrl.pv);
    router.post("/pv", verifyToken, authorizePlant("pv"), ctrl.pv);

    // Otorisasi per pembangkit dilakukan di dalam controller (plant_type ada di body).
    router.post("/set-voltage", verifyToken, ctrl.setVoltage);

    app.use('/command', router);

}
