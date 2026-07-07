import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_FAILURE,
  FETCH_RECENT_BLOGS_REQUEST,
  FETCH_RECENT_BLOGS_SUCCESS,
  FETCH_RECENT_BLOGS_FAILURE,
  FETCH_FEATURED_BLOG_SUCCESS,
} from "../actions/blogsAction";

const initialState = {
  loading: false,
  blogs: [],
  page: 1,
  total: 0,
  hasMore: true,
  error: null,
  loadingDetail: false,
  currentBlog: null,
  detailError: null,
  recentBlogs: [],
  loadingRecent: false,
  recentError: null,
  featuredBlog: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      const { data, page, hasMore, total } = action.payload;
      return {
        ...state,
        loading: false,
        blogs: page === 1 ? data : [...state.blogs, ...data],
        page: page,
        total: total,
        hasMore: hasMore,
        error: null,
      };
    case FETCH_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_BLOG_DETAIL_REQUEST:
      return {
        ...state,
        loadingDetail: true,
        detailError: null,
        currentBlog: null,
      };
    case FETCH_BLOG_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        currentBlog: action.payload,
        detailError: null,
      };
    case FETCH_BLOG_DETAIL_FAILURE:
      return {
        ...state,
        loadingDetail: false,
        detailError: action.payload,
      };
    case FETCH_RECENT_BLOGS_REQUEST:
      return {
        ...state,
        loadingRecent: true,
        recentError: null,
      };
    case FETCH_RECENT_BLOGS_SUCCESS:
      return {
        ...state,
        loadingRecent: false,
        recentBlogs: action.payload,
        recentError: null,
      };
    case FETCH_RECENT_BLOGS_FAILURE:
      return {
        ...state,
        loadingRecent: false,
        recentError: action.payload,
      };

    case FETCH_FEATURED_BLOG_SUCCESS:
      return {
        ...state,
        featuredBlog: action.payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
