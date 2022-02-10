import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAdmin from "commons/api/apiAdmin";

export const fetchAsyncProduct = createAsyncThunk(
  "product/fetchAsyncProduct",
  async () => {
    const response = await apiAdmin.get("/product");
    return response.data;
  }
);

export const addAsyncProduct = createAsyncThunk(
  "product/addAsyncProduct",
  async (formAdd) => {
    await apiAdmin.post("/product/create", formAdd);
  }
);

export const fetchOneAsyncProduct = createAsyncThunk(
  "product/fetchOneAsyncProduct",
  async (id) => {
    const res = await apiAdmin.get(`/product/${id}`);
    return res.data;
  }
);

export const addProductFc = async (formAdd) => {
  const res = await apiAdmin.post("/product/create", {
    method: "POST",
    body: formAdd,
  });

  return res.data.success;
};

const initialState = {
  loading: true,
  products: [],
  product: {},
  addStatus: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProduct(state, { payload }) {
      state.product = {};
    },
    setLoading(state, { payload }) {
      state.loading = true;
    },
  },
  extraReducers: {
    [fetchAsyncProduct.pending]: (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchAsyncProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        products: payload.products,
      };
    },
    [fetchAsyncProduct.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    },
    [addAsyncProduct.fulfilled]: (state, { payload }) => {
      console.log("Add product successfully");
      return {
        ...state,
        addStatus: true,
      };
    },
    [addAsyncProduct.rejected]: (state, { payload }) => {
      return {
        ...state,
        addStatus: false,
      };
    },
    [fetchOneAsyncProduct.pending]: (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchOneAsyncProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        product: payload.product,
      };
    },
    [fetchOneAsyncProduct.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const { resetProduct, setLoading } = productSlice.actions;

export const getOneProduct = (state) => state.productAdmin.product;
export const getAllProduct = (state) => state.productAdmin.products;
export const getProduct = (state) => state.productAdmin.product;
export const getLoading = (state) => state.productAdmin.loading;
export const getStatusAdd = (state) => state.productAdmin.addStatus;
export default productSlice.reducer;
