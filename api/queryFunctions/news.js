import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { queryKeyList } from "./../queryKeys/queryKeys";

// FETCH LOAI-TIN-TUC
export const fetchNewsType = async (
  path = "/loai-tin-tuc",
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchNewsType = (params = { populate: "*" }, options = {}) => {
  return useQuery(queryKeyList("/loai-tin-tuc", params, options), () =>
    fetchNewsType("/loai-tin-tuc", params, options)
  );
};

// FETCH TIN-TUC
export const fetchNews = async (
  path = "/tin-tuc",
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchNews = (params = { populate: "*" }, options = {}) => {
  return (
    useQuery(queryKeyList("/tin-tuc"), params, options),
    () => fetchNews("/tin-tuc", params, options)
  );
};
