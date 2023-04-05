import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { newsKeys } from "../queryKeys/newsKeys";
import { newsTypeKeys } from "../queryKeys/newsTypeKeys";
import { queryKeyDetail, queryKeyList } from "./../queryKeys/queryKeys";

const STALE_TIME = 60 * 10 * 10 * 1000;

// FETCH LOAI-TIN-TUC
export const fetchNewsTypes = async (
  params = {
    populate: "*",
  },
  options = {}
) => {
  return await fetchAPI("/loai-tin-tucs", params, options);
};
export const fetchNewsType = async (slug, options = {}) => {
  const data = await fetchAPI(
    `/loai-tin-tucs`,
    {
      populate: "*",
      filters: {
        slug: { $eq: slug },
      },
    },
    options
  );
  return data?.data?.[0] || null;
};

export const useFetchNewsTypes = (
  params = {
    populate: "*",
  },
  options = {}
) => {
  const queryClient = useQueryClient();

  return useQuery(
    newsTypeKeys.list(params, options),
    () => fetchNewsTypes(params, options),
    {
      onSuccess: (newsTypes) => {
        newsTypes?.data?.map((newsType) => {
          queryClient.setQueryData(
            newsTypeKeys.detail(newsType?.attributes?.slug),
            newsType
          );
        });
      },
      staleTime: STALE_TIME,
    }
  );
};

export const useFetchNewsType = (slug) => {
  return useQuery(newsTypeKeys.detail(slug), () => fetchNewsType(slug), {
    enabled: !!slug,
    staleTime: STALE_TIME,
  });
};

// FETCH TIN-TUC
export const fetchNews = async (
  path = "/tin-tucs",
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI(path, params, options);
};

export const useFetchNewsList = (params, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    newsKeys.list(params, options),
    () => fetchNews("/tin-tucs", params, options),
    {
      enabled: !!params,
      onSuccess: (news) => {
        news?.data?.map((newsItem) => {
          queryClient.setQueryData(
            newsKeys.detail(newsItem?.attributes?.siteSlug),
            newsItem
          );
        });
      },
    }
  );
};

// export const useFetchNews
