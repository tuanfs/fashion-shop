const { connect } = require("mongoose");
const Cart = require("../models/Cart");

// Private
// User
// Create Cart
exports.createCart = async (req, res) => {
  try {
    const cartValid = await Cart.findOne({ user: req.userId });
    if (cartValid) {
      return res.json({ success: false, message: "Cart created" });
    }
    const newCart = new Cart({
      user: req.userId,
    });
    await newCart.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server erorr" });
  }
};

// Private
// User
// Add Product to Cart
exports.addProductCart = async (req, res) => {
  const { quantity, size, name, price, img } = req.body;
  try {
    const cartItem = {
      product: req.params.id,
      quantity: quantity || 0,
      size: size || "",
      name,
      price,
      img,
      priceTotal: quantity * price,
    };
    const cart = await Cart.findOne({ user: req.userId });
    const product = cart.cartItems.find(
      (cartItem) => cartItem.product.toString() === req.params.id.toString()
    );
    if (product) {
      return res.json({ success: false, message: "Product exists in Cart" });
    }

    cart.cartItems.push(cartItem);

    let cartTotal = 0;
    cart.cartItems.forEach((cartItem) => {
      cartTotal += cartItem.priceTotal;
    });

    cart.cartTotal = cartTotal;

    await cart.save();

    res.json({ success: true, message: "Add product to card success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// User
// Get All Cart
exports.getAllCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    res.json({ success: true, message: "Get all cart successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// User
// Update Cart
exports.updatedCart = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.userId });
    let cartTotal = 0;
    if (cart.cartItems.length > 0) {
      const cartItem = cart.cartItems.find(
        (cartItem) => cartItem.product.toString() === req.params.id.toString()
      );

      cartItem.quantity = quantity;
      cartItem.priceTotal = cartItem.price * quantity;
      cart.cartItems.forEach((cartItem) => {
        cartTotal += cartItem.priceTotal;
      });
    }

    cart.cartTotal = cartTotal;

    await cart.save();
    res.json({ success: true, message: "Cart successfully updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// User
// Delete Cart Item
exports.deletedCart = async (req, res) => {
  const { cartItemId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.userId });
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.product.toString() === cartItemId.toString()
    );
    if (!cartItem) {
      return res
        .status(400)
        .json({ success: false, message: "Cart item not found product" });
    }

    cart.cartItems = cart.cartItems.filter(
      (cartItem) => cartItem.product.toString() !== cartItemId.toString()
    );

    let cartTotal = 0;
    cart.cartItems.forEach((cartItem) => {
      cartTotal += cartItem.priceTotal;
    });
    cart.cartTotal = cartTotal;

    await cart.save();
    res.json({ success: true, message: "Deleted cart item successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
