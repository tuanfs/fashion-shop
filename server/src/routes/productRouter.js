const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  newProduct,
  getAllProduct,
  updatedProduct,
  deletedProduct,
  createProductReviews,
  deletedReviewProduct,
  getAllProductAdmin,
  getOneProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const verifyTokenAdmin = require("../middlewares/verifyTokenAdmin");
const cpUpload = upload.fields([
  { name: "mainImg", maxCount: 1 },
  { name: "subImg", maxCount: 3 },
]);

router.post("/admin/product/create", verifyTokenAdmin, cpUpload, newProduct);
router.get("/product", getAllProduct);
router.get("/product/:id", getOneProduct);
router.get("/admin/product/:id", verifyTokenAdmin, getOneProduct);
router.get("/admin/product", verifyTokenAdmin, getAllProductAdmin);
router.put(
  "/admin/product/update/:id",
  verifyTokenAdmin,
  cpUpload,
  updatedProduct
);
router.delete(
  "/admin/product/delete/:id",
  verifyTokenAdmin,
  cpUpload,
  deletedProduct
);
router.put("/product/reviews/update/:id", verifyToken, createProductReviews);
router.put("/product/reviews/delete/:id", verifyToken, deletedReviewProduct);

module.exports = router;
