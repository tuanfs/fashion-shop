const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    orderNotes: {
      type: String,
    },
    user: {
      type: Schema.ObjectId,
      ref: "users",
      required: true,
    },
    itemOrders: [
      {
        product: { type: Schema.ObjectId, ref: "orders", required: true },
        name: { type: String, required: true },
        priceTotal: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingPrice: {
      type: Number,
    },
    paidAt: { type: Date, default: Date.now() },
    status: {
      type: String,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);
