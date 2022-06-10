import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cardSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});
