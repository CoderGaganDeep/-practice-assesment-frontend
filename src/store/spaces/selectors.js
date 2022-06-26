export const selectSpaces = (state) => state.spaces.allSpaces;
export const selectSpaceDetails = (state) => state.spaces.spaceDetails;

// export const selectSpaceDetails = (state) => {
//     const space = state.space.spaceDetails;
//   const clonedStories = [...state.spaces.spaceDetails.stories];

//   const sortedStories = clonedStories.sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//     const spaceWithSortedStories = {
//         ...space,
//         stories: sortedStories
//     }

//   /*
//         {
//             id,
//             title,
//             description,
//             color,
//             stories: [{}, {}]
//         }
//     */

//   return clonedDetails.sort((a, b) => b.createdAt - a.createdAt);
// };
