import axios from "axios";
import { FETCH_USER } from "./types";

// Because we're returning a function from this Action Creator instead of
// a normal Action, Redux Thunk will automatically call this function
// and pass in the dispatch function as an argument. We then only return an
// Action to the reducers once the call to the API resolves.
export const fetchUser = () => {
  return async dispatch => {
    const res = await axios.get("/api/current_user");

    // Only concerned with the data property from the response.
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};
