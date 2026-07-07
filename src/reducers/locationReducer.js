import {
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
} from "../actions/locationActions";

const initialState = {
  locationInfo: null,
  error: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return { ...state, error: null };
    case FETCH_LOCATION_SUCCESS:
      return { ...state, locationInfo: action.payload };
    case FETCH_LOCATION_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
