import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { queryKeyDetail } from "api/queryKeys/queryKeys";

const DEFAULT_STALE_TIME = 10 * 60 * 1000; // 10min

export const fetchGlobal = async () => {
  return await fetchAPI("/global", { populate: "*" });
};

export const useFetchGlobal = () => {
  return useQuery(queryKeyDetail("/global"), () => fetchGlobal(), {
    staleTime: DEFAULT_STALE_TIME,
  });
};
