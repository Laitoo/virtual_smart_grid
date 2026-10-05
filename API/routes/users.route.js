const { verifyToken, requireRole } = require("../middleware/verifyToken.middleware");

module.exports = app => {

    var ctrl = require("../controller/users.controller");
    var router = require("express").Router();

    ctrl.createTable();

    console.log("users.route:users.controller.js")

    router.post("/login", ctrl.login);
    // Mengelola akun hanya untuk root/admin.
    router.post("/insert", verifyToken, requireRole("root", "admin"), ctrl.insert);
    router.get("/byToken", verifyToken, ctrl.findByToken);
    router.get("/", verifyToken, requireRole("root", "admin"), ctrl.findAll);

    app.use('/user', router);

}
