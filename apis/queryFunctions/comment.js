import { useQuery } from "@tanstack/react-query";
import { asyncGetList, asyncPostList } from "../fetch";
import commentKeys from "../queryKeys/commentKeys";

export const fetchComments = async (from, options = {}) => {
	return await asyncGetList({
		collection_name: "asscomments",
		options: {
			shared: true,
			...options,
			condition: {
				status: true,
				shared: true,
				from: from,
				...(options?.condition || {}),
			},
		},
	});
};

export const fetchCommentsCount = async (from, options) => {
	const data = await asyncGetList({
		collection_name: "asscomments",
		options: {
			count: true,
			...options,
			condition: {
				// isnews: true,
				status: true,
				shared: true,
				from: from,
				...(options?.condition || {}),
			},
		},
	});
	return data?.rows_number || 0;
};

export const useFetchComments = (from, options = {}) => {
	return useQuery(
		commentKeys.list(from, options),
		() => fetchComments(from, options),
		{
			// staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !!from,
		}
	);
};
export const useFetchCommentsReply = (from, options = {}) => {
	return useQuery(commentKeys.reply(from), () => fetchComments(from, options), {
		// staleTime: process.env.DEFAULT_STALE_TIME,
		enabled: !!from,
	});
};

export const useFetchCommentsCount = (from, options = {}) => {
	return useQuery(
		commentKeys.count(from),
		() => fetchCommentsCount(from, options),
		{
			// staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !!from,
		}
	);
};

export const postComment = async (inputValues) => {
	try {
		return await asyncPostList({
			collection_name: "asscomments",
			data: inputValues,
		});
	} catch (error) {
		console.log("Error postContact", error);
		return error;
	}
};
