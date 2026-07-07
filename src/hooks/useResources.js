"use client";

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
  fetchBlogsApiEndPoint,
  fetchFeaturedBlogsApiEndPoint,
  fetchRecentBlogsApiEndPoint,
  fetchCasestudyApiEndPoint,
  fetchFeaturedCasestudyApiEndPoint,
  fetchWhitePaperApiEndPoint,
  fetchFeaturedWhitePaperApiEndPoint,
  fetchPrNewsApiEndPoint,
  fetchFeaturedPrNewsApiEndPoint,
  fetchRecentPrNewsApiEndPoint,
  gdprApiEndPoint,
  privacyPolicyApiEndPoint,
  termsApiEndPoint,
  dpaApiEndPoint,
  environment
} from '../helpers/config';
import fetcher from '../helpers/fetcher';

// Helper to format dates consistently with the original Redux implementation
const formatDate = (dateString, createdAt) => {
  const dateStr = dateString || createdAt;
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

// --- Blogs Hooks ---

export const useBlogs = (limit = 3) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.blogs.length === 0) return null;
    return `${fetchBlogsApiEndPoint}?page=${pageIndex + 1}&limit=${limit}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: true,
  });

  const blogs = data 
    ? data.flatMap((page) => page.blogs).map(blog => ({
        ...blog,
        id: blog._id || blog.id,
        type: blog.category || blog.type,
        date: formatDate(blog.date, blog.createdAt)
      }))
    : [];

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const total = data?.[0]?.total || 0;
  const pages = data?.[0]?.pages || 0;
  const hasMore = size < pages;

  return {
    blogs,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    hasMore,
    total,
  };
};

export const useBlogDetail = (slug) => {
  const { data, error, isLoading } = useSWR(slug ? `${fetchBlogsApiEndPoint}/${slug}` : null, fetcher);
  
  const blog = data?.blog ? {
    ...data.blog,
    id: data.blog._id || data.blog.id,
    type: data.blog.category || data.blog.type,
    date: formatDate(data.blog.date, data.blog.createdAt)
  } : null;

  return { blog, error, isLoading };
};

export const useFeaturedBlog = () => {
  const { data, error, isLoading } = useSWR(fetchFeaturedBlogsApiEndPoint, fetcher);
  return { featuredBlog: data?.blog, error, isLoading };
};

export const useRecentBlogs = (excludeSlug) => {
  const { data, error, isLoading } = useSWR(
    excludeSlug ? `${fetchRecentBlogsApiEndPoint}?excludeSlug=${excludeSlug}` : fetchRecentBlogsApiEndPoint, 
    fetcher
  );

  const recentBlogs = data?.recentBlogs?.map(blog => ({
    ...blog,
    id: blog._id || blog.id,
    type: blog.category || blog.type,
    date: formatDate(blog.date, blog.createdAt)
  })) || [];

  return { recentBlogs, error, isLoading };
};

// --- Case Studies Hooks ---

export const useCaseStudies = (limit = 3) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.caseStudies.length === 0) return null;
    return `${fetchCasestudyApiEndPoint}?page=${pageIndex + 1}&limit=${limit}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: true,
  });

  const caseStudies = data 
    ? data.flatMap((page) => page.caseStudies).map(cs => ({
        ...cs,
        id: cs._id || cs.id,
        date: formatDate(cs.date, cs.createdAt)
      }))
    : [];

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const pages = data?.[0]?.pages || 0;
  const hasMore = size < pages;

  return {
    caseStudies,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    hasMore,
  };
};

export const useCaseStudyDetail = (slug) => {
  const { data, error, isLoading } = useSWR(slug ? `${fetchCasestudyApiEndPoint}/${slug}` : null, fetcher);
  
  const caseStudy = data?.caseStudy ? {
    ...data.caseStudy,
    id: data.caseStudy._id || data.caseStudy.id,
    date: formatDate(data.caseStudy.date, data.caseStudy.createdAt)
  } : null;

  return { caseStudy, error, isLoading };
};

export const useFeaturedCaseStudy = () => {
  const { data, error, isLoading } = useSWR(fetchFeaturedCasestudyApiEndPoint, fetcher);
  return { featuredCaseStudy: data?.caseStudy, error, isLoading };
};

// --- White Papers Hooks ---

export const useWhitePapers = (limit = 3) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.whitePapers.length === 0) return null;
    return `${fetchWhitePaperApiEndPoint}?page=${pageIndex + 1}&limit=${limit}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: true,
  });

  const whitePapers = data 
    ? data.flatMap((page) => page.whitePapers).map(wp => ({
        ...wp,
        id: wp._id || wp.id,
        date: formatDate(wp.date, wp.createdAt)
      }))
    : [];

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const pages = data?.[0]?.pages || 0;
  const hasMore = size < pages;

  return {
    whitePapers,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    hasMore,
  };
};

export const useWhitePaperDetail = (slug) => {
  const { data, error, isLoading } = useSWR(slug ? `${fetchWhitePaperApiEndPoint}/${slug}` : null, fetcher);
  
  const whitePaper = data?.whitePaper ? {
    ...data.whitePaper,
    id: data.whitePaper._id || data.whitePaper.id,
    date: formatDate(data.whitePaper.date, data.whitePaper.createdAt)
  } : null;

  return { whitePaper, error, isLoading };
};

export const useFeaturedWhitePaper = () => {
  const { data, error, isLoading } = useSWR(fetchFeaturedWhitePaperApiEndPoint, fetcher);
  return { featuredWhitePaper: data?.whitePaper, error, isLoading };
};

// --- PR & News Hooks ---

export const usePrNews = ({ limit = 6, q = "", category = "", year = "" } = {}) => {
  const buildQuery = (pageIndex) => {
    const params = new URLSearchParams();
    params.set("page", String(pageIndex + 1));
    params.set("limit", String(limit));
    if (q) params.set("q", q);
    if (category && category !== "All") params.set("category", category);
    if (year && year !== "All") params.set("year", year);
    return `${fetchPrNewsApiEndPoint}?${params.toString()}`;
  };

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.prNews.length === 0) return null;
    return buildQuery(pageIndex);
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: false,
  });

  const prNews = data
    ? data.flatMap((page) => page.prNews).map((item) => ({
        ...item,
        id: item._id || item.id,
        date: formatDate(item.date, item.createdAt),
      }))
    : [];

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const pages = data?.[0]?.pages || 0;
  const years = data?.[0]?.years || [];
  const hasMore = size < pages;

  return {
    prNews,
    years,
    error,
    isLoading,
    isValidating,
    size,
    setSize,
    hasMore,
  };
};

export const usePrNewsDetail = (slug) => {
  const { data, error, isLoading } = useSWR(slug ? `${fetchPrNewsApiEndPoint}/${slug}` : null, fetcher);

  const prNews = data?.prNews ? {
    ...data.prNews,
    id: data.prNews._id || data.prNews.id,
    date: formatDate(data.prNews.date, data.prNews.createdAt)
  } : null;

  return { prNews, error, isLoading };
};

export const useFeaturedPrNews = () => {
  const { data, error, isLoading } = useSWR(fetchFeaturedPrNewsApiEndPoint, fetcher);
  return { featuredPrNews: data?.prNews, error, isLoading };
};

export const useRecentPrNews = (excludeSlug) => {
  const { data, error, isLoading } = useSWR(
    excludeSlug ? `${fetchRecentPrNewsApiEndPoint}?excludeSlug=${excludeSlug}` : fetchRecentPrNewsApiEndPoint,
    fetcher
  );

  const recentPrNews = data?.recentPrNews?.map((item) => ({
    ...item,
    id: item._id || item.id,
    date: formatDate(item.date, item.createdAt)
  })) || [];

  return { recentPrNews, error, isLoading };
};

// --- Policy Hooks ---

export const useGDPR = () => {
  const { data, error, isLoading } = useSWR(gdprApiEndPoint, fetcher);
  return { gdprData: data, error, isLoading };
};

export const usePrivacyPolicy = () => {
  const { data, error, isLoading } = useSWR(privacyPolicyApiEndPoint, fetcher);
  return { privacyData: data, error, isLoading };
};

export const useTerms = () => {
  const { data, error, isLoading } = useSWR(termsApiEndPoint, fetcher);
  return { termsData: data, error, isLoading };
};

export const useDPA = () => {
  const { data, error, isLoading } = useSWR(dpaApiEndPoint, fetcher);
  return { dpaData: data, error, isLoading };
};
