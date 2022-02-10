const Product = require("../models/Product");
const ApiFeatures = require("../features/apiFeatures");
const cloudinary = require("../utils/cloudinary");

// Private
// Admin
// Create New Product
exports.newProduct = async (req, res) => {
  const { name, price, description, category, gender, sale, stock } = req.body;
  try {
    const priceDecrease = Math.ceil((price / 100) * (100 - sale));

    const paths = [];
    paths.push(req.files["mainImg"][0].path);
    const subImgs = req.files["subImg"];
    if (subImgs) {
      subImgs.forEach((subImg) => paths.push(subImg.path));
    }

    let results = [];

    for (const path of paths) {
      const result = await cloudinary.uploader.upload(path, {
        folder: "fashion-shop",
        use_filename: true,
      });

      results.push(result);
    }
    const newProduct = new Product({
      name,
      price,
      description,
      img: results.map((result) => {
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }),
      category,
      gender,
      sale: sale || 0,
      stock: stock || 0,
      priceDecrease,
    });
    await newProduct.save();
    res.json({
      success: true,
      message: "Create product successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Public
// Get All Product
exports.getAllProduct = async (req, res) => {
  const resultPerPage = 12;

  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeatures.query.clone();
    const productCounts = products.length;
    const pageCount = Math.ceil(productCounts / resultPerPage);

    apiFeatures.pagination(resultPerPage);

    products = await apiFeatures.query;
    res.json({
      success: true,
      message: "Get all product successfully",
      products,
      productCounts,
      resultPerPage,
      pageCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// Admin
exports.getAllProductAdmin = async (req, res) => {
  const resultPerPage = 8;

  try {
    const productCounts = await Product.countDocuments;

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apiFeatures.query;
    res.json({
      success: true,
      message: "Get all product successfully",
      products,
      productCounts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Get one product successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
// Private
// Admin
// Update Product
exports.updatedProduct = async (req, res) => {
  const { name, price, description, img, category, gender, sale, stock } =
    req.body;
  try {
    let updatedProduct = {
      name,
      price,
      description,
      img,
      category,
      gender,
      sale: sale || 0,
      stock: stock || 0,
    };
    updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      updatedProduct,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Updated product successfully",
      products: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// Admin
// Delete Product
exports.deletedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    const publicIds = [];

    const imgs = product.img;

    imgs.forEach((img) => {
      publicIds.push(img.public_id);
    });

    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId);
    }
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.json({
      success: true,
      message: "Deleted product successfully",
      products: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// User
// Create Review Product
exports.createProductReviews = async (req, res) => {
  const { rating, comment, name, email } = req.body;
  if (!rating) {
    return res.status(400).json({ success: false, message: "Missing rating" });
  }

  console.log(rating, comment, name, email);
  const review = {
    user: req.userId,
    name,
    email,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(req.params.id);

  const isReviewd = product.reviews.find((review) => {
    return review.user.toString() === req.userId.toString();
  });

  if (isReviewd) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.userId.toString()) {
        review.rating = rating;
        review.comment = comment;
        review.name = name;
        review.email = email;
      }
    });
  } else {
    product.reviews.push(review);
  }
  product.numOfReviews = product.reviews.length;
  let avg = 0;
  product.reviews.forEach((review) => (avg += review.rating));
  product.ratings = avg / product.reviews.length;

  await product.save();
  res.json({ success: true, message: "Add rating successfully", product });
};

// Private
// User
exports.deletedReviewProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const review = product.reviews.find(
    (review) => review.user.toString() === req.userId.toString()
  );
  if (!review) {
    return res
      .status(400)
      .json({ success: false, message: "Not found review in Product" });
  }
  let avg = 0;
  product.reviews.forEach((review) => (avg += review.rating));
  avg = avg - review.rating;
  product.reviews = product.reviews.filter(
    (review) => review.user.toString() !== req.userId.toString()
  );
  if (product.reviews.length > 0) {
    product.ratings = avg / product.reviews.length;
  } else {
    product.ratings = 0;
  }
  product.numOfReviews = product.reviews.length;
  await Product.findByIdAndUpdate(req.params.id, product);
  res.json({ success: true, message: "test", product });
};
