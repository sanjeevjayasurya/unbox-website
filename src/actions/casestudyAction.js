import axios from "axios";
import {
  base_url,
  environment,
  fetchCasestudyApiEndPoint,
  fetchFeaturedCasestudyApiEndPoint,
} from "../helpers/config";

export const FETCH_CASESTUDY_REQUEST = "FETCH_CASESTUDY_REQUEST";
export const FETCH_CASESTUDY_SUCCESS = "FETCH_CASESTUDY_SUCCESS";
export const FETCH_CASESTUDY_FAILURE = "FETCH_CASESTUDY_FAILURE";

export const FETCH_CASESTUDY_DETAIL_REQUEST = "FETCH_CASESTUDY_DETAIL_REQUEST";
export const FETCH_CASESTUDY_DETAIL_SUCCESS = "FETCH_CASESTUDY_DETAIL_SUCCESS";
export const FETCH_CASESTUDY_DETAIL_FAILURE = "FETCH_CASESTUDY_DETAIL_FAILURE";

export const FETCH_FEATURED_CASESTUDY_REQUEST =
  "FETCH_FEATURED_CASESTUDY_REQUEST";
export const FETCH_FEATURED_CASESTUDY_SUCCESS =
  "FETCH_FEATURED_CASESTUDY_SUCCESS";
export const FETCH_FEATURED_CASESTUDY_FAILURE =
  "FETCH_FEATURED_CASESTUDY_FAILURE";

export const fetchCasestudies = (page = 1, limit = 3) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASESTUDY_REQUEST, payload: { page } });
    try {
      const response = await axios.get(
        `${base_url}${fetchCasestudyApiEndPoint}?page=${page}&limit=${limit}${environment === "staging" ? "&env=stage" : ""}`,
      );

      const casestudyData = response.data?.caseStudies || [];
      const pagination = {
        page: response.data?.page,
        pages: response.data?.pages,
        total: response.data?.total,
      };

      const formattedData = casestudyData.map((casestudy) => ({
        ...casestudy,
        id: casestudy._id || casestudy.id,
        date: casestudy.date
          ? new Date(casestudy.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
          : new Date(casestudy.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }),
      }));

      dispatch({
        type: FETCH_CASESTUDY_SUCCESS,
        payload: {
          data: formattedData,
          page: pagination.page,
          total: pagination?.total,
          hasMore: pagination.page < pagination.pages,
        },
      });
    } catch (error) {
      console.error("Error fetching casestudy:", error);
      dispatch({ type: FETCH_CASESTUDY_FAILURE, payload: error.message });
    }
  };
};

export const fetchCasestudyDetail = (slug) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CASESTUDY_DETAIL_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchCasestudyApiEndPoint}/${slug}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const casestudyData = response.data?.caseStudy || null;

      let formattedDetail = null;
      if (casestudyData) {
        formattedDetail = {
          ...casestudyData,
          id: casestudyData._id || casestudyData.id,
          date: casestudyData.date
            ? new Date(casestudyData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })
            : new Date(casestudyData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }),
        };
      }

      dispatch({
        type: FETCH_CASESTUDY_DETAIL_SUCCESS,
        payload: formattedDetail,
      });
    } catch (error) {
      console.error("Error fetching casestudy details:", error);
      dispatch({
        type: FETCH_CASESTUDY_DETAIL_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchFeaturedCasestudy = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FEATURED_CASESTUDY_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchFeaturedCasestudyApiEndPoint}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const casestudyData = response.data?.caseStudy;
      dispatch({
        type: FETCH_FEATURED_CASESTUDY_SUCCESS,
        payload: casestudyData,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
      dispatch({
        type: FETCH_FEATURED_CASESTUDY_FAILURE,
        payload: error.message,
      });
    }
  };
};
