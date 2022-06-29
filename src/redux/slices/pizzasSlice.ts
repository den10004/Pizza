import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { CartItem } from "./cartSlice";
import { Sort } from "./filterSlice";

type FetchPizzasArgs = Record<string, string>;

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface pizzasSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

const initialState: pizzasSliceState = {
  items: [],
  status: Status.LOADING, //loading || success || error
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://629f37c8461f8173e4e44389.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  /* Без TS
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },

    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },*/
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
