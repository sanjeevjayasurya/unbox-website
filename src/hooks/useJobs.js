"use client";

import useSWR from "swr";
import { fetchJobsApiEndPoint } from "../helpers/config";
import fetcher from "../helpers/fetcher";

// Group a flat list of normalized Keka jobs into the shape
// CareersPositionComponent expects: [{ id, name, postions: [...] }]
export const groupJobsByDepartment = (jobs = []) => {
  const groups = new Map();
  jobs.forEach((job) => {
    const dept = job.department || "Other";
    if (!groups.has(dept)) groups.set(dept, []);
    groups.get(dept).push({
      id: job.id,
      title: job.title,
      subTitle: job.summary || job.experience || "",
      location: job.location,
      type: job.type,
      // carry the full job through so the details page has everything
      department: job.department,
      locations: job.locations,
      description: job.description,
      experience: job.experience,
      applyUrl: job.applyUrl,
      postedAt: job.postedAt,
    });
  });
  return Array.from(groups.entries()).map(([name, postions], index) => ({
    id: index + 1,
    name,
    postions,
  }));
};

// Fetch live open positions from the backend (which proxies Keka).
export const useJobs = () => {
  const { data, error, isLoading } = useSWR(fetchJobsApiEndPoint, fetcher, {
    revalidateOnFocus: false,
  });

  const jobs = data?.jobs || [];

  return {
    jobs,
    grouped: groupJobsByDepartment(jobs),
    isLoading,
    error: error || (data && data.success === false ? data.error : null),
  };
};

// Resolve a single job by id from the (cached) jobs list. URL-driven, so it
// survives refresh / deep-links / back-forward without router state.
export const useJob = (jobId) => {
  const { jobs, isLoading, error } = useJobs();
  const job = jobId ? jobs.find((j) => String(j.id) === String(jobId)) : null;
  return { job, isLoading, error };
};

// Fetch the dynamic application form fields for a single job.
export const useApplicationFields = (jobId) => {
  const { data, error, isLoading } = useSWR(
    jobId ? `${fetchJobsApiEndPoint}/${jobId}/application-fields` : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    fields: data?.fields || [],
    isLoading,
    error: error || (data && data.success === false ? data.error : null),
  };
};
