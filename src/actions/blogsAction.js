import axios from "axios";
import {
  base_url,
  environment,
  fetchBlogsApiEndPoint,
  fetchFeaturedBlogsApiEndPoint,
  fetchRecentBlogsApiEndPoint,
} from "../helpers/config";

export const FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST";
export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";
export const FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE";

export const FETCH_BLOG_DETAIL_REQUEST = "FETCH_BLOG_DETAIL_REQUEST";
export const FETCH_BLOG_DETAIL_SUCCESS = "FETCH_BLOG_DETAIL_SUCCESS";
export const FETCH_BLOG_DETAIL_FAILURE = "FETCH_BLOG_DETAIL_FAILURE";

export const FETCH_RECENT_BLOGS_REQUEST = "FETCH_RECENT_BLOGS_REQUEST";
export const FETCH_RECENT_BLOGS_SUCCESS = "FETCH_RECENT_BLOGS_SUCCESS";
export const FETCH_RECENT_BLOGS_FAILURE = "FETCH_RECENT_BLOGS_FAILURE";

export const FETCH_FEATURED_BLOG_REQUEST = "FETCH_FEATURED_BLOG_REQUEST";
export const FETCH_FEATURED_BLOG_SUCCESS = "FETCH_FEATURED_BLOG_SUCCESS";
export const FETCH_FEATURED_BLOG_FAILURE = "FETCH_FEATURED_BLOG_FAILURE";

export const fetchBlogs = (page = 1, limit = 3) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BLOGS_REQUEST, payload: { page } });
    try {
      const response = await axios.get(
        `${base_url}${fetchBlogsApiEndPoint}?page=${page}&limit=${limit}${environment === "staging" ? "&env=stage" : ""}`,
      );

      const blogsData = response.data?.blogs || [];
      const pagination = {
        page: response.data?.page,
        pages: response.data?.pages,
        total: response.data?.total,
      };

      const formattedData = blogsData.map((blog) => ({
        ...blog,
        id: blog._id || blog.id,
        type: blog.category || blog.type,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
          : new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }),
      }));

      dispatch({
        type: FETCH_BLOGS_SUCCESS,
        payload: {
          data: formattedData,
          page: pagination.page,
          total: pagination?.total,
          hasMore: pagination.page < pagination.pages,
        },
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
    }
  };
};

export const fetchBlogDetail = (slug) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_BLOG_DETAIL_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchBlogsApiEndPoint}/${slug}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const blogData = response.data?.blog || null;

      if (!blogData) {
        throw new Error("Blog not found");
      }

      let formattedDetail = null;
      if (blogData) {
        formattedDetail = {
          ...blogData,
          id: blogData._id || blogData.id,
          type: blogData.category || blogData.type,
          date: blogData.date
            ? new Date(blogData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })
            : new Date(blogData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }),
        };
      }

      dispatch({
        type: FETCH_BLOG_DETAIL_SUCCESS,
        payload: formattedDetail,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
      dispatch({
        type: FETCH_BLOG_DETAIL_FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
};

export const fetchRecentBlogs = (excludeSlug) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_RECENT_BLOGS_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchRecentBlogsApiEndPoint}?excludeSlug=${excludeSlug}${environment === "staging" ? "&env=stage" : ""}`,
      );
      const blogsData = response.data?.recentBlogs || [];

      const formattedData = blogsData.map((blog) => ({
        ...blog,
        id: blog._id || blog.id,
        type: blog.category || blog.type,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })
          : new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }),
      }));

      dispatch({
        type: FETCH_RECENT_BLOGS_SUCCESS,
        payload: formattedData,
      });
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      dispatch({ type: FETCH_RECENT_BLOGS_FAILURE, payload: error.message });
    }
  };
};

export const fetchFeaturedBlog = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FEATURED_BLOG_REQUEST });
    try {
      const response = await axios.get(
        `${base_url}${fetchFeaturedBlogsApiEndPoint}${environment === "staging" ? "?env=stage" : ""}`,
      );
      const blogData = response.data?.blog;

      dispatch({
        type: FETCH_FEATURED_BLOG_SUCCESS,
        payload: blogData,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
      dispatch({ type: FETCH_FEATURED_BLOG_FAILURE, payload: error.message });
    }
  };
};
