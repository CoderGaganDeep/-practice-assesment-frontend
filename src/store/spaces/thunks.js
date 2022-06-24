import { apiUrl } from "../../config/constants";
import axios from "axios";
import { fetchSpacesSuccess } from "./slice";
// export const FETCH_SPACES_SUCCESS = "FETCH_SPACES_SUCCESS";
// export const SPACE_DETAILS_FETCHED = "SPACE_DETAILS_FETCHED";

export const fetchSpaces = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/space`);
      console.log(response);
      dispatch(fetchSpacesSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

//1. write a thunk to fetch space by id
export const fetchSpaceById = (id) => {
  return async (dispatch, getState) => {
    try {
      //2. make an axios request to `/${apiUrl}/space/${id}`
      const response = await axios.get(`${apiUrl}/space/${id}`);
      //3. console.log the response
      console.log(response);
      //4. go to component and import this functions there
      //5. if you saw console.log, dispatch this action: dispatch(fetchSpacesSuccess(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
