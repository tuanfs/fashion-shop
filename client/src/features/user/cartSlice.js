import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiUser from "commons/api/apiUser";

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ id, valueCart }) => {
    const res = await apiUser.put(`/cart/add/${id}`, valueCart);
    return res.data;
  }
);

export const createCart = createAsyncThunk("cart/createCart", async () => {
  await apiUser.post(`/cart/create`);
});

export const getAllCart = createAsyncThunk("cart/getAllCart", async () => {
  const res = await apiUser.get(`/cart`);
  return res.data;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ id, quantity }) => {
    const res = await apiUser.put(`/cart/update/${id}`, { quantity });
    return res.data;
  }
);

export const deleteCart = createAsyncThunk("cart/deleteCart", async (id) => {
  const res = await apiUser.put(`/cart/delete`, { cartItemId: id });
  return res.data;
});

const initialState = {
  loading: true,
  allCart: {},
};

const cartSlice = createSlice({
  name: "cartUser",
  initialState,
  reducers: {
    removeAllCart(state) {
      state.allCart = {};
    },
  },
  extraReducers: {
    [addProductToCart.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [addProductToCart.fulfilled]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [addProductToCart.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [createCart.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [createCart.fulfilled]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [createCart.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [getAllCart.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getAllCart.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        allCart: payload.cart,
        loading: false,
      };
    },
    [getAllCart.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const { removeAllCart } = cartSlice.actions;
export const loadingCart = (state) => state.cartUser.loading;
export const allCart = (state) => state.cartUser.allCart;
export default cartSlice.reducer;
