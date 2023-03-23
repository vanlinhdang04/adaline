import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import TextSSR from "./TextSSR";

export default function WhereProfit({ data }) {
	const title = data?.text_field?.filter((x) => x.content_id === "title")[0]
		?.content_editor;
	const content = data?.text_field?.filter((x) => x.content_id === "content")[0]
		?.content_editor;
	const mainPicture = data?.pictures?.filter(
		(x) => x.picture_id === "main-picture"
	)[0]?.picture_url;

	return (
		<Box px={14}>
			<Grid align={"center"} gutter={12}>
				<Grid.Col xs={12} md={5}>
					<TextSSR
						type="title"
						order={2}
						size="h2"
						align="center"
						containerProps={{
							mb: 16,
							px: 14,
						}}
						xs={{
							text: {
								lineBreak: "auto",
							},
						}}
						md={{
							text: {
								fontSize: 36,
								textAlign: "left",
							},
							container: {
								marginBottom: 28,
								paddingLeft: 0,
								paddingRight: 0,
							},
						}}
					>
						{sanitizeDOMData(title)}
					</TextSSR>
					<Text
						weight={400}
						sx={(theme) => ({
							textAlign: "left",
							fontSize: 20,
							lineHeight: "26px",
							color: theme.colors.neutral[0],
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								textAlign: "center",
							},
						})}
					>
						{sanitizeDOMData(content)}
					</Text>
				</Grid.Col>
				<Grid.Col xs={12} md={7}>
					<Box
						sx={(theme) => ({
							position: "relative",
							aspectRatio: "1.248",
							width: "100%",
							maxWidth: 642,
							margin: "0 0 0 auto",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								margin: "0 auto",
							},
						})}
					>
						<Image
							src={appendImageUrlFromAPI({ src: mainPicture, size: "l" })}
							alt="profit"
							layout="fill"
							objectFit="contain"
							objectPosition={"100% 100%"}
							//placeholder="blur"
							blurDataURL={"https://via.placeholder.com/521x502"}
							quality={100}
						/>
					</Box>
				</Grid.Col>
			</Grid>
		</Box>
	);
}
