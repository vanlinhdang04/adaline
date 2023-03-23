import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";
import { ecompagesKeys } from "../queryKeys";

const DEFAULT_STALE_TIME = 60000; // 1min

export const fetchEcompage = async (slug) => {
	return await asyncGetItem({
		collection_name: "news",
		options: {
			shared: true,
			condition: {
				slug,
			},
		},
	});
};

// export const useFetchNewsArticle = (slug) => {
//   return useQuery(ecompagesKeys.detail(slug), () => fetchEcompage(slug), {
//     staleTime: DEFAULT_STALE_TIME,
//   });
// };

/* -------------------------------------------------------------------------- */

export const fetchEcompages = async (options = {}) => {
	return await asyncGetList({
		collection_name: "news",
		options: {
			page: 1,
			limit: 100,
			...options,
			condition: {
				isnews: false,
				ngon_ngu: "vi",
				shared: true,
				...(options?.condition || {}),
			},
		},
	});
};

export const useFetchEcompages = (options) => {
	const queryClient = useQueryClient();

	return useQuery(ecompagesKeys.list(options), () => fetchEcompages(options), {
		enabled: !!options,
		staleTime: DEFAULT_STALE_TIME,
		onSuccess: (ecompages) => {
			ecompages.map((ecompage) => {
				queryClient.setQueriesData(
					ecompagesKeys.detail(ecompage?.slug),
					ecompage
				);
			});
		},
	});
};

/* -------------------------------------------------------------------------- */

// export const fetchNewsArticlesCount = async (options = {}) => {
//   const data = await asyncGetList({
//     collection_name: "news",
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
