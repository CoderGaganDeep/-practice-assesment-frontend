// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import HeroBanner from "../components/HeroBanner";
// import { fetchSpacesThunk } from "../store/space/thunks";
// import { spaceSelector } from "../store/space/selectors";
// import { Link } from "react-router-dom";
// const HomePage = () => {
//   const spaceList = useSelector(spaceSelector);
//   const sortedSpace = [...spaceList];
//   // console.log("sortedSpace", sortedSpace);
//   const latestSpaceCreated = sortedSpace.sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );
//   console.log("latestSpaceCreated:", latestSpaceCreated);
//   //   console.log("homepage", spaceList);
//   //! Link button not working -- solved
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchSpacesThunk());
//   }, [dispatch]);
//   return (
//     <div>
//       <HeroBanner>
//         <h2>This is HomePage</h2>
//       </HeroBanner>
//       {latestSpaceCreated.map((space) => {
//         return (
//           <div
//             key={space.id}
//             style={{
//               textAlign: "center",
//               backgroundColor: `${space.backgroundColor}`,
//               color: `${space.color}`,
//               margin: 2,
//               padding: 14,
//             }}
//           >
//             <h2>{space.title}</h2>
//             <p>{space.description}</p>
//             <p>{space.backgroundColor}</p>
//             <p>{space.color}</p>
//             {
//               <Link to={`/space/${space.id}`}>
//                 <button
//                   style={{
//                     backgroundColor: "blue",
//                     color: "white",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   Visit Space
//                 </button>
//               </Link>
//             }
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default HomePage;
