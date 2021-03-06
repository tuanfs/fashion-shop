import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiUser from "commons/api/apiUser";

export const fetchAllProduct = createAsyncThunk(
  "product/fetchAllProduct",
  async (query) => {
    const { category, keyword, gender, priceDecrease, page } = query;
    let priceLte = 0;
    let priceGte = 0;
    if (priceDecrease) {
      priceGte = priceDecrease.split("to")[0];
      priceLte = priceDecrease.split("to")[1];
    }
    const res = await apiUser.get(
      `/product?keyword=${keyword || ""}&category=${category || ""}&gender=${
        gender || ""
      }&page=${page || 0}&priceDecrease[gte]=${priceGte}${
        priceLte > 0 ? `&priceDecrease[lte]=${priceLte}` : ""
      }`
    );
    return res.data;
  }
);

export const fetchOneProduct = createAsyncThunk(
  "product/fetchOneProduct",
  async (id) => {
    const res = await apiUser.get(`/product/${id}`);
    return res.data;
  }
);

export const addReviewProduct = createAsyncThunk(
  "product/addReviewProduct",
  async ({ formValue, id }) => {
    const res = await apiUser.put(`/product/reviews/update/${id}`, formValue);
    return res.data;
  }
);

const initialState = {
  product: {},
  loading: true,
  products: [],
  pageCount: 0,
};

const productSlice = createSlice({
  name: "productUser",
  initialState,
  reducers: {
    removeProduct(state, { payload }) {
      state.product = {};
    },
  },
  extraReducers: {
    [fetchAllProduct.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchAllProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        products: payload.products,
        pageCount: payload.pageCount,
      };
    },
    [fetchAllProduct.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [fetchOneProduct.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchOneProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        product: payload.product,
        loading: false,
      };
    },
    [fetchOneProduct.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    [addReviewProduct.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [addReviewProduct.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    },
    [addReviewProduct.rejected]: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});

export const getOneProduct = (state) => state.productUser.product;
export const getPageCount = (state) => state.productUser.pageCount;
export const getLoadingProduct = (state) => state.productUser.loading;
export const getAllProduct = (state) => state.productUser.products;
export const { removeProduct } = productSlice.actions;
export default productSlice.reducer;

export const productCategoryOption = {
  "shirt-men": {
    category: "shirt",
    gender: "men",
    title: "??o s?? mi nam",
  },
  "shirt-women": {
    category: "shirt",
    gender: "women",
    title: "??o s?? mi n???",
  },
  "t-shirt-men": {
    category: "t-shirt",
    gender: "men",
    title: "??o ph??ng nam",
  },
  "t-shirt-women": {
    category: "t-shirt",
    gender: "women",
    title: "??o ph??ng n???",
  },
  "sweater-men": {
    category: "sweater",
    gender: "men",
    title: "??o len nam",
  },
  "sweater-women": {
    category: "sweater",
    gender: "women",
    title: "??o len n???",
  },
  "skirt-women": {
    category: "skirt",
    gender: "women",
    title: "Ch??n v??y",
  },
  "jean-men": {
    category: "jean",
    gender: "men",
    title: "Qu???n b?? nam",
  },
};
