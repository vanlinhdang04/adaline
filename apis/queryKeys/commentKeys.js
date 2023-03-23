import { flattenObj } from "@/utils/lodash";

const sort = {
	date_created: -1,
};

const commentKeys = {
	all: [{ scope: "asscomments", limit: 100, sort }],
	count: (from, options) => [
		{
			scope: "asscomments",
			type: "count",
			from: from,
			...flattenObj(options || {}),
		},
	],
	list: (from, options) => [
		{
			scope: "asscomments",
			type: "list",
			from: from,
			...flattenObj(options || {}),
		},
	],
	reply: (from, options) => [
		{
			scope: "asscomments",
			type: "reply",
			from: from,
			...flattenObj(options || {}),
		},
	],

	detail: (ma_trang) => [{ scope: "asscomments", type: "detail", ma_trang }],
};

export default commentKeys;
