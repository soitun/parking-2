import { LISTING_CREATED, ALL_LISTINGS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LISTING_CREATED:
      return "Listing successfully created.";

    case ALL_LISTINGS:
      return action.payload;

    default:
      return state;
  }
};
