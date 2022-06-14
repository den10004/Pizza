import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cardSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});
