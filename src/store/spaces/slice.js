import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSpaces: [],
  spaceDetails: null,
};

export const spacesSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    fetchSpacesSuccess: (state, action) => {
      state.allSpaces = [state.allSpaces, action.payload];
    },
  },
});

export const { fetchSpacesSuccess } = spacesSlice.actions;
export default spacesSlice.reducer;
