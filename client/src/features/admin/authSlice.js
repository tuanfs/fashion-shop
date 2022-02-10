import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAdmin from "commons/api/apiAdmin";
import setAuthToken from "commons/auth/setAuthToken";

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (formValue) => {
    const res = await apiAdmin.post("/login", formValue);
    return res.data;
  }
);

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const loadAdmin = createAsyncThunk("admin/loadAdmin", async () => {
  if (localStorage.getItem("ACCESS_TOKEN_ADMIN")) {
    setAuthToken(localStorage.getItem("ACCESS_TOKEN_ADMIN"));
  } else {
    setAuthToken(null);
  }
  await apiAdmin.get("/");
});

const authSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    logOut(state, { payload }) {
      state.isAuthenticated = false;
      localStorage.removeItem("ACCESS_TOKEN_ADMIN");
    },
    fetchAuthenticatedAdmin(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: {
    [loginAdmin.pending]: (state, { payload }) => {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    },
    [loginAdmin.fulfilled]: (state, { payload }) => {
      console.log("Login successfully");
      localStorage.setItem("ACCESS_TOKEN_ADMIN", payload.accessTokenAdmin);
      setAuthToken(payload.accessTokenAdmin);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
    [loadAdmin.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [loadAdmin.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    [loginAdmin.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { logOut } = authSlice.actions;
export const getLoadingAdmin = (state) => state.authAdmin.loading;
export const getIsAuthenticatedAdmin = (state) =>
  state.authAdmin.isAuthenticated;
export default authSlice.reducer;
