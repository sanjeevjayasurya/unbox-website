import {
  FETCH_WHITEPAPER_REQUEST,
  FETCH_WHITEPAPER_FAILURE,
  FETCH_WHITEPAPER_SUCCESS,
  FETCH_WHITEPAPER_DETAIL_REQUEST,
  FETCH_WHITEPAPER_DETAIL_SUCCESS,
  FETCH_WHITEPAPER_DETAIL_FAILURE,
  FETCH_FEATURED_WHITEPAPER_SUCCESS
} from "../actions/whitepaperAction";

const initialState = {
  loading: false,
  whitepaperData: [],
  page: 1,
  total: 0,
  hasMore: true,
  error: null,
  loadingDetail: false,
  currentWhitepaper: null,
  detailError: null,
  featuredWhitepaper: null,
};

const whitepaperReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WHITEPAPER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_WHITEPAPER_SUCCESS:
      const { data, page, hasMore, total } = action.payload;
      return {
        ...state,
        loading: false,
        whitepaperData: page === 1 ? data : [...state.whitepaperData, ...data],
        page: page,
        total: total,
        hasMore: hasMore,
        error: null,
      };
    case FETCH_WHITEPAPER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_WHITEPAPER_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detailError: null,
        currentWhitepaper: null,
      };
    case FETCH_WHITEPAPER_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        currentWhitepaper: action.payload,
        detailError: null,
      };
    case FETCH_WHITEPAPER_DETAIL_FAILURE:
      return {
        ...state,
        loadingDetail: false,
        detailError: action.payload,
      };

    case FETCH_FEATURED_WHITEPAPER_SUCCESS:
      return {
        ...state,
        featuredWhitepaper: action.payload,
      };
    default:
      return state;
  }
};

export default whitepaperReducer;
