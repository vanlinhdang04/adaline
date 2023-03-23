import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	asyncDeleteList,
	asyncGetItem,
	asyncGetList,
	asyncPostList,
} from "../fetch";
import { wishlistKeys } from "../queryKeys";

const DEFAULT_STALE_TIME = 0; // 1min

export const addProductToWishList = async (data) => {
	return await asyncPostList({
		access_token: data?.token,
		collection_name: "ecomwishlist",
		data,
	});
};
export const removeWishListItem = async (data) => {
	return await asyncDeleteList({
		access_token: data?.token,
		collection_name: "ecomwishlist",
		_id: data?._id,
	});
};

export const fetchWishListItem = async ({ ma_vt, token, email }) => {
	return await asyncGetItem({
		collection_name: "ecomwishlist",
		access_token: token,
		options: {
			// shared: true,
			condition: {
				ma_vt,
				user: email,
			},
		},
	});
};

export const useFetchWishListItem = ({ ma_vt, token, email }) => {
	const shouldEnable = !!email && !!ma_vt;
	return useQuery(
		wishlistKeys.detail(ma_vt),
		() => fetchWishListItem({ ma_vt, token, email }),
		{
			staleTime: DEFAULT_STALE_TIME,
			enabled: shouldEnable,
		}
	);
};

/* -------------------------------------------------------------------------- */

export const fetchWishListOfUser = async (options = {}) => {
	return await asyncGetList({
		collection_name: "ecomwishlist",
		options: {
			page: 1,
			limit: process.env.NEWS_LOADING_LIMIT,
			sort: {
				date_created: -1,
			},
			...options,
			condition: {
				isnews: true,
				ngon_ngu: "vi",
				shared: true,
				...(options?.condition || {}),
			},
		},
	});
};

export const useFetchWishListOfUser = (options) => {
	const queryClient = useQueryClient();

	return useQuery(
		wishlistKeys.list(options),
		() => fetchWishListOfUser(options),
		{
			enabled: !!options,
			staleTime: DEFAULT_STALE_TIME,
			onSuccess: (newsArticles) => {
				newsArticles.map((newsArticle) => {
					queryClient.setQueriesData(
						wishlistKeys.detail(newsArticle?.slug),
						newsArticle
					);
				});
			},
		}
	);
};

/* -------------------------------------------------------------------------- */

export const fetchWishlistCount = async (options = {}) => {
	const data = await asyncGetList({
		collection_name: "ecomwishlist",
		options: {
			...options,
			count: true,
			condition: {
				...(options?.condition || {}),
			},
		},
	});
	return data?.rows_number || 0;
};

// export const useFetchNewsArticlesCount = (options) => {
//   return useQuery(
//     wishlistKeys.count(options || {}),
//     () => fetchWishlistCount(options),
//     {
//       enabled: !!options,
//       staleTime: DEFAULT_STALE_TIME,
//     }
//   );
// };
