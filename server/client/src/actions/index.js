import axios from "axios";
import {
  FETCH_USER,
  LISTING_CREATED,
  ALL_LISTINGS,
  LISTING_RESERVED
} from "./types";

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

export const createListing = (address, lat, lng, price, startTime, endTime) => {
  const dataFromUser = { address, lat, lng, price, startTime, endTime };

  return async dispatch => {
    const res = await axios.post("/api/create_listing", dataFromUser);

    dispatch({ type: LISTING_CREATED, payload: res.data });
  };
};

export const fetchListings = () => {
  return async dispatch => {
    const res = await axios.get("/api/listings");

    dispatch({ type: ALL_LISTINGS, payload: res.data });
  };
};

export const handleToken = (token, listingId, price) => {
  const stripeFormData = { token, listingId, price };

  return async dispatch => {
    const res = await axios.post("/api/stripe", stripeFormData);
    // console.log(res);

    dispatch({ type: LISTING_RESERVED, payload: res.data });
  };
};
