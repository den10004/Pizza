import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortProppertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortProppertyEnum;
};

interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}

export const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sort: {
    name: "популярности возрастанию",
    sortProperty: SortProppertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setfilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategoryId,
  setSearchValue,
  setSort,
  setCurrentPage,
  setfilters,
} = filterSlice.actions;

export default filterSlice.reducer;
