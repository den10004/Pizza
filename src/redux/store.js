import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cardSlice";
import pizza from "./slices/pizza.slice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
