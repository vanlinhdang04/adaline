import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetList } from "../fetch";
import bannersKeys from "../queryKeys/bannersKeys";

const DEFAULT_STALE_TIME = 60000; // 1min

export const DEFAULT_BANNER_OPTIONS = {
  sort: {
    stt: 1,
  },
  limit: 5,
  condition: {
    status: true,
    shared: true,
  },
};

export const HOME_BANNER_OPTIONS = {
  ...DEFAULT_BANNER_OPTIONS,
  condition: {
    ...DEFAULT_BANNER_OPTIONS.condition,
    vi_tri: "home-top-sliders",
  },
};

export const fetchBanners = async (options = {}) => {
  return asyncGetList({
    collection_name: "ecombanners",
    options,
  });
};

export const useFetchBanners = (options) => {
  const queryClient = useQueryClient();

  return useQuery(
    bannersKeys.list(options?.condition?.vi_tri),
    () => fetchBanners(options),
    {
      enabled: !!options?.condition?.vi_tri,
      staleTime: DEFAULT_STALE_TIME,
      onSuccess: (banners) => {
        banners.map((banner) => {
          queryClient.setQueriesData(bannersKeys.detail(banner?._id), banner);
        });
      },
    }
  );
};
