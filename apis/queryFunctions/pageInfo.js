import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";
import pageInfoKeys from "../queryKeys/pageInfoKey";

export const fetchPageInfo = async (ma_trang, options = {}) => {
	let data = await asyncGetItem({
		collection_name: "news",
		options: {
			shared: true,
			...options,
			condition: {
				ma_loai_tin_tuc: "thong-tin-trang",
				ma_trang: ma_trang,
				status: true,
				shared: true,
				ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});

	return data;
};
export const fetchPageInfos = async (list, options = {}) => {
	return await asyncGetList({
		collection_name: "news",
		options: {
			shared: true,
			...options,
			condition: {
				ma_loai_tin_tuc: "thong-tin-trang",
				ma_trang: { $in: [...list] },
				status: true,
				shared: true,
				ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});
};

export const useFetchPageInfo = (ma_trang, options = {}, initialData) => {
	return useQuery(
		pageInfoKeys.detail(ma_trang, options),
		() => fetchPageInfo(ma_trang, options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !!ma_trang,
			initialData: initialData,
		}
	);
};

export const useFetchPageInfos = (list, options = {}) => {
	const queryClient = useQueryClient();

	return useQuery(
		pageInfoKeys.list(list, options),
		() => fetchPageInfos(list, options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !!list,
			onSuccess: (pageInfos) => {
				pageInfos.map((pageInfo) => {
					queryClient.setQueriesData(
						pageInfoKeys.detail(pageInfo?.ma_trang, options),
						pageInfo
					);
				});
			},
		}
	);
};
