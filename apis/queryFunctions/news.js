import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";
import { newsKeys } from "../queryKeys";

const DEFAULT_STALE_TIME = 1000 * 60 * 60; // 1 hour

export const DEFAULT_FETCHING_NEWS_OPTIONS = {
	limit: process.env.NEWS_LOADING_LIMIT,
	page: 1,
	condition: {
		// ngon_ngu: "vi",
		loai_tin_tuc: { $in: ["Sản phẩm đầu tư", "Tài chính", "Bất động sản"] },
	},
};

export const fetchNewsArticle = async (slug) => {
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

export const useFetchNewsArticle = (slug) => {
	return useQuery(newsKeys.detail(slug), () => fetchNewsArticle(slug), {
		staleTime: DEFAULT_STALE_TIME,
		enabled: !!slug,
	});
};

/* -------------------------------------------------------------------------- */

export const fetchNewsArticles = async (options = {}) => {
	return await asyncGetList({
		collection_name: "news",
		options: {
			page: 1,
			limit: process.env.NEWS_LOADING_LIMIT,
			...options,
			condition: {
				// isnews: true,
				// ngon_ngu: "vi",
				...(options?.condition || {}),
			},
			sort: {
				date_created: -1,
				...(options?.sort || {}),
			},
		},
	});
};

export const useFetchNewsArticles = (options) => {
	const queryClient = useQueryClient();

	return useQuery(newsKeys.list(options), () => fetchNewsArticles(options), {
		enabled: !!options,
		staleTime: DEFAULT_STALE_TIME,
		onSuccess: (newsArticles) => {
			newsArticles.map((newsArticle) => {
				queryClient.setQueriesData(
					newsKeys.detail(newsArticle?.slug),
					newsArticle
				);
			});
		},
	});
};

/* -------------------------------------------------------------------------- */

export const fetchNewsArticlesCount = async (options = {}) => {
	const data = await asyncGetList({
		collection_name: "news",
		options: {
			count: true,
			...options,
			condition: {
				// isnews: true,
				// ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});
	return data?.rows_number || 0;
};

export const useFetchNewsArticlesCount = (options) => {
	return useQuery(
		newsKeys.count(options?.condition || {}),
		() => fetchNewsArticlesCount(options),
		{
			enabled: !!options,
			staleTime: DEFAULT_STALE_TIME,
		}
	);
};
