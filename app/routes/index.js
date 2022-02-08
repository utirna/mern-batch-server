var express = require("express");
var router = express.Router();
var apiRoutes = require("./apiRoutes");
var webRoutes = require("./webRoutes");

router.use("/api", apiRoutes);
router.use("/", webRoutes);

module.exports = router;
