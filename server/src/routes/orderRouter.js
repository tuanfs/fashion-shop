const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const { createOrder, getAllOrder } = require("../controllers/orderController");

router.post("/create", verifyToken, createOrder);
router.get("/", verifyTokenAdmin, getAllOrder);

module.exports = router;
