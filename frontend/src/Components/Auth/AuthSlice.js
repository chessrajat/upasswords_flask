import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const getToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      return null;
    } else {
      console.log("Valid token");
      return token;
    }
  }
  return null;
};

const initialState = {
  token: getToken(),
  authenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
      state.authenticated = true;
      localStorage.setItem("token", accessToken);
    },
    logOut: (state, action) => {
      state.token = null;
      state.authenticated = false;
      localStorage.removeItem("token");
    },
  },
});

const { actions, reducer } = authSlice;

export const { setCredentials, logOut } = actions;

export default reducer;
