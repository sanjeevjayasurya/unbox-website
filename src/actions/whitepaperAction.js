import axios from "axios";
import {
  base_url,
  environment,
  fetchWhitePaperApiEndPoint,
  fetchFeaturedWhitePaperApiEndPoint,
} from "../helpers/config";

export const FETCH_WHITEPAPER_REQUEST = "FETCH_WHITEPAPER_REQUEST";
export const FETCH_WHITEPAPER_SUCCESS = "FETCH_WHITEPAPER_SUCCESS";
export const FETCH_WHITEPAPER_FAILURE = "FETCH_WHITEPAPER_FAILURE";

export const FETCH_WHITEPAPER_DETAIL_REQUEST = "FETCH_WHITEPAPER_DETAIL_REQUEST";
export const FETCH_WHITEPAPER_DETAIL_SUCCESS = "FETCH_WHITEPAPER_DETAIL_SUCCESS";
export const FETCH_WHITEPAPER_DETAIL_FAILURE = "FETCH_WHITEPAPER_DETAIL_FAILURE";

export const FETCH_FEATURED_WHITEPAPER_REQUEST = "FETCH_FEATURED_WHITEPAPER_REQUEST";
export const FETCH_FEATURED_WHITEPAPER_SUCCESS = "FETCH_FEATURED_WHITEPAPER_SUCCESS";
export const FETCH_FEATURED_WHITEPAPER_FAILURE = "FETCH_FEATURED_WHITEPAPER_FAILURE";

export const fetchWhitepapers= (page = 1, limit = 3) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WHITEPAPER_REQUEST, payload: { page } });
    try {
      const response = await axios.get(
        `${base_url}${fetchWhitePaperApiEndPoint}?page=${page}&limit=${limit}${environment === "staging" ? "&env=stage" : ""}`,
      );

      const whitepaperData = response.data?.whitePapers || [];
      const pagination = {
        page: response.data?.page,
        pages: response.data?.pages,
        total: response.data?.total,
      };

      const formattedData = whitepaperData.map((whitepaper) => ({
        ...whitepaper,
        id: whitepaper._id || whitepaper.id,
        date: whitepaper.createdAt
          ? new Date(whitepaper.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
          : whitepaper.date,
      }));

      dispatch({
        type: FETCH_WHITEPAPER_SUCCESS,
        payload: {
          data: formattedData,
          page: pagination.page,
          total: pagination?.total,
          hasMore: pagination.page < pagination.pages,
        },
      });
    } catch (error) {
      console.error("Error fetching whitepaper:", error);
      dispatch({ type: FETCH_WHITEPAPER_FAILURE, payload: error.message });
    }
  };
};

export const fetchWhitepaperDetail = (slug) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WHITEPAPER_DETAIL_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchWhitePaperApiEndPoint}/${slug}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const whitepaperData = response.data?.whitePaper || null;

      let formattedDetail = null;
      if (whitepaperData) {
        formattedDetail = {
          ...whitepaperData,
          id: whitepaperData._id || whitepaperData.id,
          date: whitepaperData.createdAt
            ? new Date(whitepaperData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })
            : whitepaperData.date,
        };
      }

      dispatch({
        type: FETCH_WHITEPAPER_DETAIL_SUCCESS,
        payload: formattedDetail,
      });
    } catch (error) {
      console.error("Error fetching whitepaper details:", error);
      dispatch({ type: FETCH_WHITEPAPER_DETAIL_FAILURE, payload: error.message });
    }
  };
};

export const fetchFeaturedWhitePaper= () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FEATURED_WHITEPAPER_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchFeaturedWhitePaperApiEndPoint}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const whitepaperData = response.data?.whitePaper ;
      dispatch({
        type: FETCH_FEATURED_WHITEPAPER_SUCCESS,
        payload: whitepaperData,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
      dispatch({ type: FETCH_FEATURED_WHITEPAPER_FAILURE, payload: error.message });
    }
  };
};
