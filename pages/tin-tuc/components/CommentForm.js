import { postComment } from "@/apis/queryFunctions/comment";
import commentKeys from "@/apis/queryKeys/commentKeys";
import { appAlert } from "@/setup/mantine-provider/notifications";
import {
	Box,
	Button,
	Group,
	Stack,
	Text,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import imgVector from "public/icons/greenarrow.png";
import React from "react";
import { getFromStorage, setToStorage } from "utils/localStorage";

export default function CommentForm({ from, reply_to, callback }) {
	const { locale } = useRouter();
	const subscribe_info = getFromStorage("subscribe_info");
	const queryClient = useQueryClient();

	const label = {
		vi: {
			title: "Để lại bình luận của bạn",
			error: {
				username: "Họ và tên quá ngắn",
				content: "Nội dung quá ngắn",
				phone: "Số điện thoại không hợp lệ",
			},
			placeholder: {
				username: "Nhập họ tên",
				content: "Nhập số điện thoại",
				phone: "Nhập nội dung",
			},
			titleBtn: "Gửi",
		},
		en: {
			title: "Your comment",
			error: {
				username: "First and last name too short",
				content: "Content is too short",
				phone: "Invalid phone number",
			},
			placeholder: {
				username: "FullName",
				content: "Your comment",
				phone: "Phone number",
			},
			titleBtn: "Send",
		},
	};

	const form = useForm({
		initialValues: {
			username: subscribe_info?.name || "",
			phone: subscribe_info?.phone || "",
			// email: "",
			content: "",
		},
		validate: {
			username: (val) =>
				val.length <= 1 ? label?.[locale]?.error?.username : null,
			content: (val) =>
				val?.trim().split(" ").length > 1
					? null
					: label?.[locale]?.error?.content,
			phone: (value) =>
				/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
					value
				)
					? null
					: label?.[locale]?.error?.phone,
			// email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email không hợp lệ"),
		},
	});
	const commentMutation = useMutation(postComment, {
		onSuccess: () => {
			// console.log(form.values);
			appAlert({
				type: "success",
				message: "Bình luận thành công",
			});
			queryClient.invalidateQueries(commentKeys.list(from));
			queryClient.invalidateQueries(commentKeys.count(from));
			queryClient.invalidateQueries(commentKeys.reply(from));
			callback && callback();

			setToStorage("subscribe_info", {
				name: form.values.username,
				phone: form.values.phone,
			});
			form.reset();
		},
		onError: () => {
			console.log("error");
			appAlert({
				type: "error",
				message: "Bình luận không thành công",
			});
			queryClient.invalidateQueries(commentKeys.list(from));
		},
	});

	return (
		<Box>
			<Text weight={700} size={24}>
				{label?.[locale]?.title}
			</Text>
			<form
				onSubmit={form.onSubmit(({ username, phone, content }) => {
					// console.log(username);
					commentMutation.mutate({
						username: username,
						phone: phone,
						content: content,
						from: from,
						shared: true,
						reply_to,
					});
				})}
			>
				<Stack spacing={16}>
					<Group grow spacing={16}>
						<TextInput
							size="md"
							placeholder={label?.[locale]?.placeholder?.username}
							{...form.getInputProps("username")}
						/>
						<TextInput
							size="md"
							placeholder={label?.[locale]?.placeholder?.phone}
							{...form.getInputProps("phone")}
						/>
					</Group>
					<Textarea
						size="md"
						minRows={5}
						placeholder={label?.[locale]?.placeholder?.content}
						{...form.getInputProps("content")}
						autoFocus={reply_to ? true : false}
					/>
				</Stack>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<Button
						sx={{
							// float: "right",
							height: 46,
							width: 154,
							marginTop: 15,
							display: "flex",
							alignItems: "center",
							padding: "0 20px 0 30px",
							justifyContent: "center",
							backgroundColor: "#001529",
						}}
						type="submit"
						radius={13}
					>
						<Text
							sx={{ marginRight: 20 }}
							size={14}
							weight={600}
							color="#A8EFEB"
						>
							{label?.[locale]?.titleBtn}
						</Text>
						<Image
							src={imgVector}
							alt="Vector"
							layout="fixed"
							width={18}
							height={14}
						/>
					</Button>
				</Box>
			</form>
		</Box>
	);
}
