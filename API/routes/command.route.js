const { verifyToken } = require("../middleware/verifyToken.middleware");

module.exports = (app) => {

    var ctrl = require("../controller/command.controller");
    var router = require("express").Router();
    // router.mqttService = mqttService;

    // console.log("command.route.js")

    router.post("/pltmh", verifyToken, ctrl.pltmh);
    router.post("/pltb", verifyToken, ctrl.pltb);
    router.post("/ongrid", verifyToken, ctrl.pv);
    router.post("/offgrid", verifyToken, ctrl.pv);
    router.post("/pv", verifyToken, ctrl.pv);
    router.post('/set-voltage', commandController.setVoltage);
    
    app.use('/command', router);

}