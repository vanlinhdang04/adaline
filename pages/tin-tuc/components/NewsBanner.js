import BtnShowMore from "@/common/components/Button/BtnShowMore";
import { Box, CopyButton, Grid, Skeleton, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

import { appAlert } from "@/setup/mantine-provider/notifications";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import dayjs from "dayjs";
import Link from "next/link";
import shareFb from "public/icons/share_fb.png";
import shareLink from "public/icons/share_link.png";

export default function NewsBanner({ data, isLoading = false }) {
	const title = getFieldFromFieldId("title", "content_id", data?.text_field);
	const content = getFieldFromFieldId(
		"content",
		"content_id",
		data?.text_field
	);
	const link = getFieldFromFieldId("link", "content_id", data?.text_field);
	const picture = getFieldFromFieldId("picture", "picture_id", data?.pictures);

	const created = dayjs(data?.line);
	const diff =
		dayjs().diff(created, "d") > 0
			? `${dayjs().diff(created, "d")} ngày trước`
			: dayjs().diff(created, "h") > 0
			? `${dayjs().diff(created, "h")} giờ trước`
			: `${dayjs().diff(created, "m")} phút trước`;

	return (
		<Box
			sx={(theme) => ({
				borderRadius: 13,
				overflow: "hidden",
				maxWidth: "923px",
				width: "100%",
				margin: "0 auto",
				// marginRight: 2,
				// padding: 10,
				boxShadow: "20px 20px 40px rgba(46, 232, 214, 0.2)",
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					maxWidth: "85%",
					boxShadow: "20px 20px 40px rgba(46, 232, 214, 0.2)",
				},
				[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
					maxWidth: "85%",
					boxShadow: "10px 10px 40px rgba(46, 232, 214, 0.2)",
				},
			})}
		>
			<Skeleton
				visible={isLoading}
				sx={{ boxShadow: "20px 20px 40px rgba(46, 232, 214, 0.2)" }}
			>
				<Grid align={"center"}>
					<Grid.Col xs={12} sm={4} md={4}>
						<Box
							sx={(theme) => ({
								aspectRatio: "1",
								width: "100%",
								position: "relative",
								[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
									aspectRatio: "1.55",
								},
							})}
						>
							<Image
								src={appendImageUrlFromAPI({ src: picture?.picture_url })}
								alt="Banner"
								layout="fill"
								// width={304}
								// height={304}
								objectFit="cover"
								priority
							/>
						</Box>
					</Grid.Col>
					<Grid.Col xs={12} sm={8} md={8}>
						<Box
							sx={(theme) => ({
								filter: "drop-shadow(20px 20px 40px rgba(93, 190, 236, 0.4))",
								padding: "24px 22px 16px 24px",
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									padding: "16px 12px",
								},
							})}
						>
							<Text size={"md"} weight={700} color="#001529">
								{title?.content || "title"}
							</Text>
							<Text size={"sm"} weight={400} color="#001529" lineClamp={4}>
								{content?.content}
							</Text>
							<Text size={"xs"} weight={400} color="#414141" mb={8}>
								{diff}
							</Text>
							<Box
								sx={(theme) => ({
									display: "flex",
									justifyContent: "flex-start",
									[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
										justifyContent: "center",
										marginBottom: 18,
									},
								})}
							>
								<BtnShowMore
									href={link?.content}
									color="#ADB4BB"
									// onClick={() => push(link?.content)}
								/>
							</Box>
							<Box
								sx={(theme) => ({
									display: "flex",
									justifyContent: "flex-end",
									[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
										justifyContent: "center",
										marginBottom: 8,
									},
								})}
							>
								<CopyButton
									value={
										link?.content?.indexOf("http") > -1
											? link?.content
											: process.env.SITE_URL + link?.content
									}
								>
									{({ copy }) => (
										<Box
											mr={12}
											sx={{ height: 25, width: 25, cursor: "pointer" }}
											onClick={() => {
												copy();
												appAlert({
													type: "success",
													message: "Copy đường dẫn thành công",
												});
											}}
										>
											<Image
												src={shareLink}
												alt="Share"
												width={25}
												height={25}
											/>
										</Box>
									)}
								</CopyButton>
								<Box sx={{ height: 25, width: 25, cursor: "pointer" }}>
									<Link
										href={`https://www.facebook.com/sharer/sharer.php?u=${
											link?.content?.indexOf("http") > -1
												? link?.content
												: process.env.SITE_URL + link?.content
										}`}
										passHref
									>
										<a target={"_blank"} rel="noopener">
											<Image src={shareFb} alt="Share" width={25} height={25} />
										</a>
									</Link>
								</Box>
							</Box>
						</Box>
					</Grid.Col>
				</Grid>
			</Skeleton>
		</Box>
	);
}
