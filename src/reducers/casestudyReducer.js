import {
  FETCH_CASESTUDY_REQUEST,
  FETCH_CASESTUDY_SUCCESS,
  FETCH_CASESTUDY_FAILURE,
  FETCH_FEATURED_CASESTUDY_SUCCESS,
  FETCH_CASESTUDY_DETAIL_REQUEST,
  FETCH_CASESTUDY_DETAIL_SUCCESS,
  FETCH_CASESTUDY_DETAIL_FAILURE,
} from "../actions/casestudyAction";

const initialState = {
  loading: false,
  casestudyData: [],
  page: 1,
  total: 0,
  hasMore: true,
  error: null,
  loadingDetail: false,
  currentCasestudy: null,
  detailError: null,
  featuredCasestudy: null,
};

const casestudyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CASESTUDY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CASESTUDY_SUCCESS:
      const { data, page, hasMore, total } = action.payload;
      return {
        ...state,
        loading: false,
        casestudyData: page === 1 ? data : [...state.casestudyData, ...data],
        page: page,
        total: total,
        hasMore: hasMore,
        error: null,
      };
    case FETCH_CASESTUDY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_CASESTUDY_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detailError: null,
        currentCasestudy: null,
      };
    case FETCH_CASESTUDY_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        currentCasestudy: action.payload,
        detailError: null,
      };
    case FETCH_CASESTUDY_DETAIL_FAILURE:
      return {
        ...state,
        loadingDetail: false,
        detailError: action.payload,
      };

    case FETCH_FEATURED_CASESTUDY_SUCCESS:
      return {
        ...state,
        featuredCasestudy: action.payload,
      };
    default:
      return state;
  }
};

export default casestudyReducer;
