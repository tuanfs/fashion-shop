const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
  checkEmailUser,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", registerUser);
router.post("/check-email", checkEmailUser);
router.post("/login", loginUser);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
