import { flattenObj } from "@/utils/lodash";

// const sort = {
// 	date_created: -1,
// };

const projectKeys = {
	all: [{ scope: "project", limit: 100 }],
	count: (options) => [
		{
			scope: "project",
			type: "count",
			...flattenObj(options || {}),
		},
	],
	list: (list, options = {}) => [
		{
			scope: "project",
			type: "list",
			list,
			options: options,
			// ...flattenObj(options || {}),
		},
	],

	detail: (ma_trang, options = {}) => [
		{ scope: "project", type: "detail", ma_trang, options: options },
	],
};

export default projectKeys;
