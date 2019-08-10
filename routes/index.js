var router = require("express").Router();
var apiRoutes = require("./api/apiRoutes");
var htmlRoutes = require("./htmlRoutes");
var headlineRoutes = require("./api/headline");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);
router.use("/headline", headlineRoutes);
module.exports = router;
