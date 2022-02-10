const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    img: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      require: true,
      enum: ["men", "women"],
    },
    reviews: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "users",
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        email: {
          type: String,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    sale: {
      type: Number,
    },
    numOfReviews: {
      type: Number,
    },
    priceDecrease: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
