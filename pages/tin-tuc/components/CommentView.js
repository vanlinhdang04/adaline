import {
	useFetchComments,
	useFetchCommentsCount,
	useFetchCommentsReply,
} from "@/apis/queryFunctions/comment";
import { Box, Center, Pagination, Text } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import React from "react";
import Comment from "./Comment";

export default function CommentView({ from, ...style }) {
	const { locale } = useRouter();
	const limit = 5;
	const [page, setPage] = React.useState(1);
	const { data: count } = useFetchCommentsCount(from, {
		// page: page,
		// limit: limit,
		condition: {
			reply_to: { $in: [undefined, null, ""] },
		},
	});
	const { data, isFetched } = useFetchComments(from, {
		page: page,
		limit: limit,
		sort: {
			date_updated: -1,
		},
		condition: {
			reply_to: { $in: [undefined, null, ""] },
		},
	});
	const { data: allReply } = useFetchCommentsReply(from, {
		// page: page,
		limit: 10000,
		sort: {
			date_updated: 1,
		},
		condition: {
			reply_to: { $nin: [undefined, null, ""] },
		},
	});
	const { scrollIntoView, targetRef } = useScrollIntoView({
		// offset: 60,
		duration: 1000,
	});
	// console.log("data", data);
	const label = {
		vi: {
			noComment: "Hãy trở thành người đầu tiên bình luận cho bài viết này",
		},
		en: {
			noComment: "Be the first to comment on this post",
		},
	};
	return (
		<Box {...style} ref={targetRef}>
			{data?.map((item, k) => (
				<Box key={k}>
					<Comment data={item} allReply={allReply} />
				</Box>
			))}
			{isFetched && data?.length > 0 && (
				<Center>
					<Pagination
						size={"md"}
						total={Math.ceil(count / limit)}
						onChange={(page) => {
							setPage(page);
							scrollIntoView({ alignment: "start" });
						}}
						page={page}
					/>
				</Center>
			)}
			{isFetched && data?.length <= 0 && (
				<Text align="center">{label?.[locale]?.noComment}</Text>
			)}
		</Box>
	);
}
