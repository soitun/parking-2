import axios from "axios";
import { FETCH_USER, CREATE_LISTING } from "./types";

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

export const createListing = (address, price, startTime, endTime) => {
  const dataFromUser = { address, price, startTime, endTime };
  console.log(dataFromUser);

  return async dispatch => {
    const res = await axios.post("/api/create_listing", dataFromUser);
    console.log(res);

    dispatch({ type: CREATE_LISTING, payload: res.data });
  };
};
