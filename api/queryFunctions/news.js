import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "api/api";
import { newsKeys } from "../queryKeys/newsKeys";
import { newsTypeKeys } from "../queryKeys/newsTypeKeys";

const STALE_TIME = 60 * 10 * 10 * 1000;
const STALE_TIME_NEWS = 60 * 10 * 1000;

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

// ------------------ FETCH TIN-TUC --------------------------
export const fetchNewsList = async (
  params = { populate: "*" },
  options = {}
) => {
  return await fetchAPI("/tin-tucs", params, options);
};

export const fetchNews = async (slug, option = {}) => {
  const data = await fetchAPI(
    "/tin-tucs",
    {
      populate: "*",
      filters: {
        siteSlug: { $eq: slug },
      },
    },
    option
  );

  return data?.data?.[0] || null;
};

export const useFetchNewsList = (params, options) => {
  const queryClient = useQueryClient();

  return useQuery(
    newsKeys.list(params, options),
    () => fetchNewsList(params, options),
    {
      enabled: !!params,
      staleTime: STALE_TIME_NEWS,
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

export const useFetchNews = (slug) => {
  return useQuery(newsKeys.detail(slug), () => fetchNews(slug), {
    enabled: !!slug,
    staleTime: STALE_TIME_NEWS,
  });
};

// export const useFetchNews
