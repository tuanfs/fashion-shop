const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "users",
    },
    cartItems: [
      {
        product: {
          type: Schema.ObjectId,
          ref: "products",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        img: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        priceTotal: {
          type: Number,
          required: true,
        },
      },
    ],
    cartTotal: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", CartSchema);
