import { flattenObj } from "@/utils/lodash";

const sort = {
	date_created: -1,
};

// export const INITIAL_LOADING_NEWS_OPTIONS = {
//   limit: process.env.NEWS_LOADING_LIMIT,
//   condition: {
//     ngon_ngu: "vi",
//   },
// };

const newsKeys = {
	all: [{ scope: "newsArticles", limit: 100, sort }],
	count: (options) => [
		{
			scope: "newsArticles",
			type: "count",
			// ngon_ngu: "vi",
			sort,
			...flattenObj(options || {}),
		},
	],
	list: (options) => [
		{
			scope: "newsArticles",
			type: "list",
			sort,
			...flattenObj(options || {}),
		},
	],
	first: () => [
		{
			scope: "newsArticles",
			type: "list",
			sort,
			// ...flattenObj(INITIAL_LOADING_NEWS_OPTIONS),
		},
	],
	detail: (slug, options) => [
		{
			scope: "newsArticles",
			type: "detail",
			slug,
			...flattenObj(options || {}),
		},
	],
};

export default newsKeys;
