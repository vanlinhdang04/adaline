import { flattenObj } from "@/utils/lodash";

const sort = {
	date_created: -1,
};

const pageInfoKeys = {
	all: [{ scope: "asspages", limit: 100, sort }],
	count: (options) => [
		{
			scope: "asspages",
			type: "count",
			...flattenObj(options || {}),
		},
	],
	list: (list, options = {}) => [
		{
			scope: "asspages",
			type: "list",
			sort,
			list: list,
			options: options,
			// ...flattenObj(options || {}),
		},
	],

	detail: (ma_trang, options = {}) => [
		{ scope: "asspages", type: "detail", ma_trang, options: options },
	],
};

export default pageInfoKeys;
