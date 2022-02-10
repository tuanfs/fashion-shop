const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    orderNotes,
    itemOrders,
    shippingPrice,
    orderTotal,
  } = req.body;
  try {
    const newOrder = new Order({
      fullName,
      email,
      phone,
      address,
      orderNotes,
      itemOrders,
      shippingPrice,
      orderTotal,
      user: req.userId,
    });
    await newOrder.save();
    res.json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Private
// User
// Get All Order

exports.getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    if (!allOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      message: "Get All Order successfully",
      allOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
