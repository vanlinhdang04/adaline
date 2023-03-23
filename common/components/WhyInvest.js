import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Center, Group, Stack, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import HomeTitle from "./HomeTitle";

export default function WhyInvest({ data }) {
	const list = data?.add_on_4?.filter((x) => x.id === "list")[0];

	return (
		<div>
			<Center>
				<HomeTitle style={{ textAlign: "center" }}>
					{sanitizeDOMData(data?.content)}
				</HomeTitle>
			</Center>
			<Box
				sx={(theme) => ({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						gap: "25px",
					},
				})}
			>
				<Box
					sx={(theme) => ({
						flexBasis: "45%",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							flexBasis: "100%",
						},
					})}
				>
					<Box
						sx={(theme) => ({
							position: "relative",
							aspectRatio: "1.48",
							width: "100%",
							margin: "0 auto 0 0",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								margin: "0 auto",
							},
						})}
					>
						<Image
							src={appendImageUrlFromAPI({ src: data?.picture_1 })}
							alt="Why Invest"
							layout="fill"
							objectFit="cover"
							//placeholder="blur"
							blurDataURL={"https://via.placeholder.com/521x502"}
							priority
						/>
					</Box>
				</Box>
				<Box
					sx={(theme) => ({
						flexBasis: "55%",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							flexBasis: "100%",
						},
					})}
				>
					<Stack
						justify="center"
						sx={(theme) => ({
							height: "100%",
							gap: "36px",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								gap: "18px",
							},
						})}
					>
						{list?.text_field?.map((item, k) => (
							<Box key={k} sx={{ display: "flex", width: "100%" }}>
								<Group
									key={k}
									align="flex-start"
									spacing={24}
									sx={(theme) => ({
										marginLeft: 24,
										gap: "24px",
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											marginLeft: 0,
											gap: "18px",
										},
									})}
								>
									<Box
										sx={(theme) => ({
											position: "relative",
											aspectRatio: "1",
											width: 64,
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												width: 36,
											},
										})}
									>
										<Image
											src={appendImageUrlFromAPI({
												src: list?.pictures[k]?.picture_url,
											})}
											alt="icon"
											layout="fill"
											//placeholder="blur"
											blurDataURL="https://via.placeholder.com/64"
											objectFit="cover"
										/>
									</Box>
									<Box
										sx={(theme) => ({
											width: "calc(100% - 88px)",
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												width: "calc(100% - 54px)",
											},
										})}
									>
										<Text
											size={"lg"}
											weight={400}
											sx={(theme) => ({
												fontSize: 20,
												lineHeight: "24px",
												color: theme.colors.neutral[0],
												[`@media (max-width: ${theme.breakpoints.md}px)`]: {
													fontSize: 16,
													lineHeight: "19px",
												},
											})}
										>
											{sanitizeDOMData(item?.content_editor)}
										</Text>
									</Box>
								</Group>
							</Box>
						))}
						{/* {list?.text_field?.map((item, k) => (
							<Box key={k} sx={{ display: "flex", width: "100%" }}>
								<Box
									sx={(theme) => ({
										position: "relative",
										width: "100%",
										maxWidth: 64,
										aspectRatio: "1",
										margin: "0 24px",
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											margin: "0 18px 0 0",
										},
									})}
								>
									<Image
										src={appendImageUrlFromAPI({
											src: list?.pictures[k]?.picture_url,
										})}
										alt="icon"
										// layout="fill"
										width={64}
										height={64}
										objectFit="cover"
									/>
								</Box>
								<Box>
									<Text
										size={"lg"}
										weight={400}
										align="justify"
										sx={(theme) => ({
											fontSize: 20,
											color: theme.colors.neutral[0],
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												fontSize: 16,
											},
										})}
									>
										{sanitizeDOMData(item?.content_editor)}
									</Text>
								</Box>
							</Box>
						))} */}
					</Stack>
				</Box>
			</Box>
		</div>
	);
}
