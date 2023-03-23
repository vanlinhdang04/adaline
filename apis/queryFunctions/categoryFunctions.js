import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";
import { categoryKeys } from "../queryKeys";
import initialCategories from "./initialData/categories.json";

// const DEFAULT_STALE_TIME = 1000 * 60 * 60; // 1 hour
const DEFAULT_STALE_TIME = 1000; // 5 sec

export const fetchCategory = async (slug) => {
  return await asyncGetItem({
    collection_name: "ecomcategories_cty",
    options: {
      condition: {
        slug,
        id_app: process.env.id_app,
      },
    },
  });
};

export const useFetchCategory = (slug) => {
  return useQuery(categoryKeys.detail(slug), () => fetchCategory(slug), {
    staleTime: DEFAULT_STALE_TIME,
  });
};

/* -------------------------------------------------------------------------- */

export const fetchCategories = async (options = {}) => {
  return await asyncGetList({
    collection_name: "ecomcategories_cty",
    options: {
      ...options,
      condition: {
        ...(options?.condition || {}),
      },
    },
  });
};

export const useFetchCategories = () => {
  // const queryClient = useQueryClient();

  return useQuery(categoryKeys.all, () => fetchCategories(), {
    staleTime: DEFAULT_STALE_TIME,
    initialData: initialCategories,
    // onSuccess: (categories) => {
    //   categories.map((category) => {
    //     queryClient.setQueriesData(
    //       categoryKeys.detail(category?.slug),
    //       category
    //     );
    //   });
    // },
  });
};

/* -------------------------------------------------------------------------- */

// export const fetchNewsArticlesCount = async (options = {}) => {
//   const data = await asyncGetList({
//     collection_name: "ecomcategories_cty",
//     options: {
//       ...options,
//       count: true,
//       condition: {
//         ngon_ngu: "vi",
//         isnews: true,
//         shared: true,
//         loai_tin_tuc: { $in: ["Tin tức Zengroup", "Tin tức thị trường"] },
//         ...(options?.condition || {}),
//       },
//     },
//   });
//   return data?.rows_number || 0;
// };

// export const useFetchNewsArticlesCount = (options) => {
//   return useQuery(
//     newsKeys.count(options || {}),
//     () => fetchNewsArticlesCount(options),
//     {
//       enabled: !!options,
//       staleTime: DEFAULT_STALE_TIME,
//     }
//   );
// };
