import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./API/apiSlice";
import authReducer from "./Components/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});
