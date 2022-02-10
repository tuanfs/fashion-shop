const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
const {
  createCart,
  addProductCart,
  getAllCart,
  updatedCart,
  deletedCart,
} = require("../controllers/cartController");

router.post("/create", verifyToken, createCart);
router.put("/add/:id", verifyToken, addProductCart);
router.get("/", verifyToken, getAllCart);
router.put("/update/:id", verifyToken, updatedCart);
router.put("/delete", verifyToken, deletedCart);

module.exports = router;
