import { configureStore } from "@reduxjs/toolkit";
import authAdminReducer from "./admin/authSlice";
import productAdminReducer from "./admin/productSlice";
import authUserReducer from "./user/authSlice";
import productUserReducer from "./user/productSlice";
import cartUserReducer from "./user/cartSlice";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    productAdmin: productAdminReducer,
    authUser: authUserReducer,
    productUser: productUserReducer,
    cartUser: cartUserReducer,
  },
});
