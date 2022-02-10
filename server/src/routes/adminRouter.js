const express = require("express");
const router = express.Router();
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const { loginAdmin, getAdmin } = require("../controllers/adminController");

router.post("/login", loginAdmin);
router.get("/", verifyTokenAdmin, getAdmin);

module.exports = router;
