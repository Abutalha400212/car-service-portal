const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();

router.route("/success").post(paymentController.paymentSuccess);

module.exports = router;
