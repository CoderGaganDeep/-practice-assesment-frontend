### Fetching Data with a thunk - Week 6

1.  Set up the endpoint in the backend and test it (http):
    ```js
    // import the Router class from express
    const { Router } = require(“express”);
    // import the corresponding model
    const Space = require(“../models”).space;
    // instantiate a router
    const router = new Router();
    // TEST: http :4000/spaces/testest
    router.get(“/testest”, (req, res) => {
      res.send(“Testest..“);
    });
    // http GET :4000/spaces/
    router.get(“/”, async (req, res) => {
      try {
        const allSpaces = await Space.findAll();
        res.send(allSpaces);
      } catch (e) {
        console.log(e.message);
      }
    });
    // export the router
    module.exports = router;
    ```
2.  Create a new page/component:
    ```js
    // Page
    export default function SpacesPage() {
      return <div></div>;
    }
    ```
    ```js
    // Component
    export default function Space() {
      return <div></div>;
    }
    ```
3.  Add to app.js, register a page:
    ```js
    // App.js
    import SpacesPage from “./pages/SpacesPage”;
    // ....
    <Route exact path=“/” element={<SpacesPage />} />;
    // ....
    ```
4.  GO TO >> StepsReactRedux (other .md)
    - create store/<dirname>/
      slice.js,
      actions.js,
      selectors.js
5.  a. Write a thunk to fetch data (in this case spaces):
    ```js
    // actions.js
    import axios from “axios”;
    import { apiUrl } from “../../config/constants”;
    import { fetchedSpaces } from “./slice”;
    export const fetchSpaces = () => async (dispatch, getState) => {
      try {
        // console.log(“Here”);
        const response = await axios.get(`${apiUrl}/spaces`);
        // console.log(“Response all spaces”, response.data);
        dispatch(fetchedSpaces(response.data)); // [{}, {}, {}]
      } catch (e) {
        console.log(e.message);
      }
    };
    ```
    b. Import the thunk in the page (// a), pass it to useEffect
    and dispatch it
    ```js
    // SpacesPage/index.js
    import { useDispatch } from “react-redux”;
    import { useEffect } from “react”;
    import { fetchSpaces } from “../../store/space/actions”; // a
    export default function SpacesPage() {
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(fetchSpaces());
      }, []);
      return;
      <div></div>;
    }
    ```
    c. Check the response in de console // [{}, {}, {}]
    d. Go back to thunk, dispatch it to the reducer (See 5a):
    ```js
    // this part
    dispatch(fetchedSpaces(response.data)); // [{}, {}, {}]
    ```
6.  Write a case in the reducer (a), add it into actions (b):
    ```js
    import { createSlice } from “@reduxjs/toolkit”;
    const initialState = {
      allSpaces: [],
    };
    export const spaceSlice = createSlice({
      name: “space”,
      initialState,
      reducers: {
        // a (fetchedSpaces)
        fetchedSpaces: (state, action) => {
          state.allSpaces = [...action.payload];
        },
      },
    });
    export const { fetchedSpaces } = spaceSlice.actions; // b
    export default spaceSlice.reducer;
    ```
7.  Create a selector to select spaces:
    ```js
    export const selectSpace = (reduxState) => reduxState.space.allSpaces;
    ```
8.  Import the selector on the page, pass it to useSelector
    ```js
    // SpacesPage/index.js
    import { useDispatch, useSelector } from “react-redux”; // +
    import { useEffect } from “react”;
    import { fetchSpaces } from “../../store/space/actions”;
    import { selectSpace } from “../../store/space/selectors”; // +
    export default function SpacesPage() {
      const dispatch = useDispatch();
      const allSpaces = useSelector(selectSpace); // +
      useEffect(() => {
        dispatch(fetchSpaces());
      }, []);
      return <div></div>;
    }
    ```
9.  Import component (a), and map the data:
    ```js
    // SpacesPage/index.js
    import { useDispatch, useSelector } from “react-redux”;
    import { useEffect } from “react”;
    import { fetchSpaces } from “../../store/space/actions”;
    import { selectSpace } from “../../store/space/selectors”;
    import Space from “../../components/Space”; // a
    export default function SpacesPage() {
      const dispatch = useDispatch();
      const allSpaces = useSelector(selectSpace);
      useEffect(() => {
        dispatch(fetchSpaces());
      }, []);
      // +
      return (
        <div>
          <h1>All Spaces</h1>
          <div className=“container-allspaces”>
            {allSpaces.map((space) => {
              return (
                <Space
                  key={space.id}
                  id={space.id}
                  title={space.title}
                  description={space.description}
                  backgroundColor={space.backgroundColor}
                  color={space.color}
                />
              );
            })}
          </div>
        </div>
      );
    }
    ```
10. Pass props in component (with link to detailspage):
    ```js
    // Space/index.js
    import { Link } from “react-router-dom”;
    export default function Space(props) {
      return (
        <div
          className=“container-space”
          style={{ backgroundColor: props.backgroundColor, color: props.color }}
        >
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Link to={`/spaces/${props.id}`}>
            <button>Visit space</button>
          </Link>
        </div>
      );
    }
    ```
