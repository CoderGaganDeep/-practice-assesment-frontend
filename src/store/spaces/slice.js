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
      state.allSpaces = action.payload;
    },
    fetchSpaceByIdSuccess: (state, action) => {
      state.spaceDetails = action.payload;
    },
  },
});

export const { fetchSpacesSuccess, fetchSpaceByIdSuccess } =
  spacesSlice.actions;
export default spacesSlice.reducer;
