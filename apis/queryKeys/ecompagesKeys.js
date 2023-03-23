import { flattenObj } from "@/utils/lodash";

const sort = {
	date_created: -1,
};

const ecompagesKeys = {
	all: [{ scope: "ecompages", limit: 100, sort }],
	count: (options) => [
		{
			scope: "ecompages",
			type: "count",
			...flattenObj(options || {}),
		},
	],
	list: (options) => [
		{
			scope: "ecompages",
			type: "list",
			sort,
			...flattenObj(options || {}),
		},
	],

	detail: (_id) => [{ scope: "ecompages", type: "detail", _id }],
};

export default ecompagesKeys;
