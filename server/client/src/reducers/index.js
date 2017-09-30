import { combineReducers } from "redux";
import authReducer from "./authReducer";
import listingsReducer from "./listingsReducer";

export default combineReducers({
  auth: authReducer,
  listings: listingsReducer
});
