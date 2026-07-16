import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import whitepaperReducer from "./whitepaperReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  whitepaper: whitepaperReducer,
});

export default rootReducer;
