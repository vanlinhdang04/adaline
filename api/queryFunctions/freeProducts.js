import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { queryKeyList } from "api/queryKeys/queryKeys";

const DEFAULT_STALE_TIME = 10 * 60 * 1000; // 10min

export const fetchFreeProducts = async (
  path = "/spfrees",
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchFreeProducts = (
  params = { populate: "*" },
  options = {}
) => {
  return useQuery(
    queryKeyList("/spfrees", params, options),
    () => fetchFreeProducts("/spfrees", params, options),
    {
      staleTime: DEFAULT_STALE_TIME,
    }
  );
};
