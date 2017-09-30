import { FETCH_USER } from "../actions/types";

// Initially while making the request to the API, we set the value of
// the state to null. When the user is not logged in, the payload response
// from the API is an empty string, which evaluates to false.
// i.e. "" || false === false
export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
