import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiUser from "commons/api/apiUser";
import setAuthTokenUser from "commons/auth/setAuthTokenUser";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formValue) => {
    const res = await apiUser.post("/register", formValue);
    return res.data;
  }
);

export const checkEmailUser = createAsyncThunk(
  "user/checkEmailUser",
  async (email) => {
    const res = await apiUser.post("/check-email", { email });
    return res.data;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  const res = await apiUser.post("/login", user);
  return res.data;
});

const initialState = {
  isAuthenticated: false,
  loading: false,
  isEmail: true,
};
const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loadUser(state, { payload }) {
      state.isAuthenticated = payload;
      if (localStorage.getItem("ACCESS_TOKEN") !== "undefined") {
        setAuthTokenUser(localStorage.getItem("ACCESS_TOKEN"));
      }
    },
    logoutUser(state) {
      localStorage.removeItem("ACCESS_TOKEN");
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    },
    [registerUser.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    },
    [checkEmailUser.pending]: (state, { payload }) => {
      return { ...state, isEmail: true };
    },
    [checkEmailUser.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isEmail: payload.success,
      };
    },
    [checkEmailUser.rejected]: (state, { payload }) => {
      return { ...state, isEmail: payload.success };
    },
    [loginUser.pending]: (state) => {
      return { ...state, loading: true };
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem("ACCESS_TOKEN", payload.accessToken);
      localStorage.setItem("USER_NAME", payload.user.userName);
      setAuthTokenUser(localStorage.getItem("ACCESS_TOKEN"));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    },
    [loginUser.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      };
    },
  },
});

export const getIsAuthenticated = (state) => state.authUser.isAuthenticated;
export const getIsEmail = (state) => state.authUser.isEmail;

export const { loadUser, logoutUser, resetRegisterStatus } = authSlice.actions;

export default authSlice.reducer;
