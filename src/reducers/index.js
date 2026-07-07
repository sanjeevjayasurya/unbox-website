import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import blogsReducer from "./blogsReducer";
import casestudyReducer from "./casestudyReducer";
import whitepaperReducer from "./whitepaperReducer";

const rootReducer = combineReducers({
  location: locationReducer,
  blogs: blogsReducer,
  casestudy: casestudyReducer,
  whitepaper: whitepaperReducer
});

export default rootReducer;
