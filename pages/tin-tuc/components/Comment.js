import { Avatar, Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import CommentForm from "./CommentForm";

export default function Comment({ data, allReply, level = 1 }) {
	const [open, setOpen] = React.useState(false);
	const colors = [
		"red",
		"orange",
		"yellow",
		"green",
		"teal",
		"cyan",
		"blue",
		"purple",
		"pink",
		"gray",
	];
	const charCode = +data?.username.charCodeAt(0).toString()[0];

	const created = dayjs(data?.date_updated);
	const diff =
		dayjs().diff(created, "d") > 0
			? `${dayjs().diff(created, "d")} ngày trước`
			: dayjs().diff(created, "h") > 0
			? `${dayjs().diff(created, "h")} giờ trước`
			: `${dayjs().diff(created, "m")} phút trước`;
	return (
		<Box sx={{ color: "#001529" }} mb={16}>
			<Group position="apart">
				<Group spacing={"xs"}>
					<Avatar radius={"xl"} color={colors[charCode]} variant="filled">
						{data?.username[0]?.toUpperCase()}
					</Avatar>
					<Text weight={600} size={16}>
						{data?.username}
					</Text>
				</Group>
				<Text weight={400} size={14}>
					{diff}
				</Text>
			</Group>
			<Text weight={400} size={16} mt={14} mb={4} sx={{ lineHeight: "24px" }}>
				{data?.content}
			</Text>
			<Box
				sx={{
					display: "flex",
					fontSize: 14,
					fontWeight: "600",
					textDecorationLine: "underline",
					cursor: "pointer",
				}}
				onClick={() => setOpen((e) => !e)}
			>
				Trả lời
			</Box>
			<Box sx={{ borderLeft: "1px solid #000", paddingLeft: "20px" }} my={16}>
				{open && (
					<CommentForm
						from={data?.from}
						reply_to={level >= 3 ? data?.reply_to : data?._id}
						callback={() => setOpen(false)}
					/>
				)}
				{allReply
					?.filter((x) => x.reply_to === data?._id)
					?.map((item, k) => (
						<Comment
							data={item}
							key={k}
							allReply={allReply}
							level={level + 1}
						/>
					))}
			</Box>
		</Box>
	);
}
