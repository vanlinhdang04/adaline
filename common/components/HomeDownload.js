import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Center, Grid } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import AppDownload from "./AppDownload";
import HomeTitle from "./HomeTitle";
import Line from "./Line";

export default function HomeDownload({ data: _data, style }) {
	const { locale } = useRouter();
	const { data } = useFetchPageInfo(
		"web-home-download",
		{ condition: { ngon_ngu: locale } },
		_data
	);

	const title = data?.text_field?.filter((x) => x.content_id === "title")[0]
		?.content_editor;
	const imgAppView = data?.pictures?.filter(
		(x) => x.picture_id === "app-view"
	)[0]?.picture_url;
	const imgBg = data?.pictures?.filter(
		(x) => x.picture_id === "app-view-background"
	)[0]?.picture_url;

	return (
		<Box
			sx={(theme) => ({
				width: "100%",
				paddingBottom: 80,
				...style,
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					paddingBottom: 40,
					...style?.[`@media (max-width: ${theme.breakpoints.md}px)`],
				},
			})}
		>
			<Line index={1} />
			<Center>
				<HomeTitle style={{ maxWidth: 546, textAlign: "center" }}>
					{sanitizeDOMData(title)}
				</HomeTitle>
			</Center>
			<Grid
				gutter={0}
				align={"center"}
				// sx={(theme) => ({
				// 	[`@media (max-width: ${theme.breakpoints.md}px)`]: {
				// 		gap: "59px",
				// 	},
				// })}
			>
				<Grid.Col xs={12} md={6}>
					<AppDownload />
				</Grid.Col>
				<Grid.Col
					xs={12}
					md={6}
					sx={(theme) => ({
						[theme.fn.smallerThan("md")]: {
							marginTop: 59,
						},
					})}
				>
					<div style={{ width: "100%", height: "100%", position: "relative" }}>
						<Image
							src={appendImageUrlFromAPI({ src: imgBg })}
							layout="fill"
							alt="bg"
							objectFit="contain"
							//placeholder="blur"
							blurDataURL="https://via.placeholder.com/521x502"
						/>
						<Box
							sx={{
								transition: "0.6s",
								textAlign: "center",

								"&:hover": {
									// animation: "slideUpDown ease-in-out 2s infinite",
									transform: "translateY(-40px)",
								},
							}}
						>
							<Image
								src={appendImageUrlFromAPI({
									src: imgAppView,
									size: "xl",
								})}
								alt="app"
								width={521}
								height={502}
								objectFit="contain"
								quality={100}
								layout="intrinsic"
								//placeholder="blur"
								blurDataURL="https://via.placeholder.com/521x502"
								style={{
									transform: "scale(0.9)",
								}}
							/>
						</Box>
					</div>
				</Grid.Col>
			</Grid>
		</Box>
	);
}
