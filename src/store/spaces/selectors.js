export const selectSpaces = (state) => state.spaces.allSpaces;
export const selectSpaceDetails = (state) => state.spaces.spaceDetails;

// export const selectSpaceDetails = (reduxState) => {
//   const clonedArray = [...reduxState.spaces.spaceDetails];
//   return clonedArray.sort((a, b) => b.createdAt - a.createdAt);
// };
