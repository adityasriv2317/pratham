import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// type define for ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;