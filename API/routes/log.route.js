const { verifyToken } = require("../middleware/verifyToken.middleware");

module.exports = app => {

    var ctrl = require("../controller/log.controller");
    var router = require("express").Router();

    router.get("/daily",verifyToken,ctrl.findDaily)

    app.use("/log",router);
    
}