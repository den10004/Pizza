import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState: {},
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    /*
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
    },*/
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
