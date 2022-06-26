### Setup React-app with Redux - Week5.1

# SETUP: Create React App

1. Creating React App:

   - npx create-react-app <dirname>
   - cd into directory

# SETUP: Add & configure React-Redux

1. Adding dependencies:

   - npm i @reduxjs/toolkit react-redux

2. Creating a Redux store:

   - create the folder structure src/store/index.js

   In src/store/index.js:

   ```js
   // On the next few lines we create our store by calling a function
   // called configureStore. This function creates a store for us and
   // configures it with all the basics settings we are going to need.

   // It also means that the state we define in balance/slice.js will
   // be available in the store through reduxState.balance.
   import { configureStore } from "@reduxjs/toolkit";

   const store = configureStore({
     reducer: {},
   });

   export default store;
   ```

3. a. Integrating the store with the React-app:

   b. Change src/index.js so that the app is wrapped with the
   React-Redux provider:

   c. Install react-router-dom:

   - npm i react-router-dom
   - import it in src/index.js

   ```js
   import React from "react";
   import ReactDOM from "react-dom/client";
   import "./index.css";
   import App from "./App";
   import reportWebVitals from "./reportWebVitals";
   import { Provider } from "react-redux"; // b
   import store from "./store"; // a
   import { BrowserRouter as Router } from "react-router-dom"; // c

   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(
     <Router>
       <Provider store={store}>
         <App />
       </Provider>
     </Router>
   );

   reportWebVitals();
   ```

4. Creating slice:

   - create the folder structure src/store/balance/slice.js

   In src/store/balance/slice.js:

   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const initialState = {
     amount: 0,
   };

   export const balanceSlice = createSlice({
     name: "balance",
     initialState,
     reducers: {},
   });

   // Action creators are generated for each case reducer
   // function as we add cases to our reducer we will also
   // export the corresponding actions
   export const {} = balanceSlice.actions;
   export default balanceSlice.reducer;
   ```

5. Add new slice to our store:

   In src/store/index.js:

   ```js
   import { configureStore } from "@reduxjs/toolkit";
   import balanceReducer from "./balance/slice"; // +

   const store = configureStore({
     reducer: {
       balance: balanceReducer, // +
     },
   });

   export default store;
   ```

# DISPATCH ACTION: Sending data to the store

1. Define a key in new slice:

   Lets add a key in our reducer in src/store/balance/slice.js:

   ```js
   import { createSlice } from "@reduxjs/toolkit";

   const initialState = {
     amount: 0,
   };

   export const balanceSlice = createSlice({
     name: "balance",
     initialState,
     reducers: {
       // Add a key called "deposit"
       deposit: (state) => {
         // empty for now
       },
     },
   });

   // Add the newly created key to our export statement
   export const { deposit } = balanceSlice.actions;

   export default balanceSlice.reducer;
   ```

2. Import useDispatch in App.js. &&
3. Dispatch the action:

   ```js
   import { useState } from "react";
   import { useDispatch } from "react-redux"; // +
   import { deposit } from "./store/balance/slice"; // +
   import "./App.css";

   function App() {
     const [balance, setBalance] = useState(0);
     const dispatch = useDispatch();

     return (
       <div className="App">
         <p>Balance: {balance}$</p>
         <button
           onClick={() => {
             dispatch(deposit(10)); // +
           }}
         >
           Deposit 10$
         </button>
       </div>
     );
   }

   export default App;
   ```

# REDUCER: Intercept action & update the Redux state

1. Add a console.log() inside the key in our reducer:
2. Add the logic to update the state:

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    // 2 + (action)
    deposit: (state, action) => {
      console.log("Hello from the reducer!"); // 1
      state.amount = state.amount + action.payload; // 2
    },
  },
});

export const { deposit } = balanceSlice.actions;

export default balanceSlice.reducer;
```

# SELECTOR: Get data from the store

1.  Creating selector function in src/store/balance/selectors:

    ```js
    export const selectBalance = (reduxState) => reduxState.balance.amount;
    ```

2.  Use the selector in a component:

    ```js
    import { useDispatch, useSelector } from "react-redux"; // +
    import { deposit } from "./store/balance/slice";
    import { selectBalance } from "./store/balance/selectors"; // +
    import "./App.css";

    function App() {
      const dispatch = useDispatch();
      const balance = useSelector(selectBalance); // +

      return (
        <div className="App">
          <p>Balance: {balance}$</p>
          <button
            onClick={() => {
              dispatch(deposit(10));
            }}
          >
            Deposit 10$
          </button>
        </div>
      );
    }

    export default App;
    ```

# THUNK

1.  Install axios, for fetching data:

    - npm i axios

```js
// **** Thunk Skeleton ****

export const thunkSkeleton = () => async (dispatch, getState) => {
  try {
    // here goes your fetching logic
  } catch (e) {
    console.log(e.message);
  }
};

// **** In the component we use it like: ****
dispatch(thunkSkeleton());

// EXAMPLE
import axios from "axios";
import { startLoadingPost, postFullyFetched } from "./slice";
import { API_URL } from "../../config"; // API_URL in config.js

export const fetchPost = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoadingPost());

    const [postResponse, commentsReponse] = await Promise.all([
      axios.get(`${API_URL}/posts/${id}`),
      axios.get(`${API_URL}/posts/${id}/comments`),
    ]);
    dispatch(
      postFullyFetched({
        post: postResponse.data,
        comments: commentsReponse.data,
      })
    );
  } catch (e) {
    console.log(e.message);
  }
};
```

# ..

Install moment, used for formatting dates:

- npm i moment
