import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { queryKeyDetail, queryKeyList } from "./../queryKeys/queryKeys";

// FETCH LOAI-TIN-TUC
export const fetchNewsTypes = async (
  path = "/loai-tin-tucs",
  params = {
    populate: "*",
  },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchNewsTypes = (params, options = {}) => {
  const queryClient = useQueryClient();

  return useQuery(
    queryKeyList("/loai-tin-tucs", params, options),
    () => fetchNewsTypes("/loai-tin-tucs", params, options),
    {
      onSuccess: (newsTypes) => {
        newsTypes?.data?.map((newsType) => {
          queryClient.setQueriesData(
            queryKeyDetail("/loai-tin-tucs", newsType?.id)
          );
        });
      },
    }
  );
};

export const useFetchNewsType = (id) => {
  return useQuery(
    queryKeyDetail("/loai-tin-tucs", id),
    () => fetchNewsTypes(`/loai-tin-tucs/${id}`),
    {
      enabled: !!id,
    }
  );
};

// FETCH TIN-TUC
export const fetchNews = async (
  path = "/tin-tucs",
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchNews = (params, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    queryKeyList("/tin-tucs", params, options),
    () => fetchNews("/tin-tucs", params, options),
    {
      enabled: !!params,
      onSuccess: (news) => {
        news?.data?.map((newsItem) => {
          queryClient.setQueriesData(queryKeyDetail("/tin-tucs", newsItem?.id));
        });
      },
    }
  );
};
