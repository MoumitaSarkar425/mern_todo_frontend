import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuHeaderOpened: false,
};

const menusSlice = createSlice({
  name: "menus",
  initialState: initialState,
  reducers: {
    openMenuHeader(state) {
      state.menuHeaderOpened = true;
    },
    closeMenuHeader(state) {
      state.menuHeaderOpened = false;
    },
  },
});

export const menusActions = menusSlice.actions;
export default menusSlice.reducer;
