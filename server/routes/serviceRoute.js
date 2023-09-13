const express = require("express");
const serviceController = require("../controller/serviceController");
const router = express.Router();

router.route("/").get(serviceController.getServices);

router.route("/:id").get(serviceController.getServiceById);

module.exports = router;
