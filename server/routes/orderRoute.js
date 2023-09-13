const express = require("express");
const orderController = require("../controller/orderController");
const router = express.Router();

router.route("/").post(orderController.addOrder);
router.route("/:id").get(orderController.getOrderbyId);
module.exports = router;
