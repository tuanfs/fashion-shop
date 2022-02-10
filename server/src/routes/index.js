const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");

function route(app) {
  app.use("/api", productRouter);
  app.use("/api", userRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/order", orderRouter);
}

module.exports = route;
