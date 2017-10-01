import {
  LISTING_CREATED,
  ALL_LISTINGS,
  LISTING_RESERVED
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LISTING_CREATED:
      return "Listing successfully created.";

    case LISTING_RESERVED:
      return [...state, action.payload];

    case ALL_LISTINGS:
      return action.payload;

    default:
      return state;
  }
};
