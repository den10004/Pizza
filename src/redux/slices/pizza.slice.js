import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://629f37c8461f8173e4e44389.mockapi.io/items?page=${currentPage}&limit=5&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    extraReducers: {
      [fetchPizzas.pending]: (state, action) => {
        console.log("отправка");
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        console.log(state, "хор");
      },
      [fetchPizzas.rejected]: (state, action) => {
        console.log("ошибка");
      },
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
