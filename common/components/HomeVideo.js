import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Center, Modal } from "@mantine/core";
import Image from "next/image";
import React from "react";
import HomeTitle from "./HomeTitle";

export default function HomeVideo({ data }) {
	const title = data?.text_field?.filter((x) => x.content_id === "title")[0]
		?.content_editor;
	const thumbnail = data?.pictures?.filter(
		(x) => x.picture_id === "thumbnail"
	)[0]?.picture_url;

	const [opened, setOpened] = React.useState(false);

	return (
		<div>
			<Center
				sx={(theme) => ({
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						marginBottom: 20,
					},
				})}
			>
				<HomeTitle style={{ textAlign: "center", maxWidth: 606 }}>
					{sanitizeDOMData(title)}
				</HomeTitle>
			</Center>
			<Box
				sx={(theme) => ({
					width: "100%",
					height: "105%",
					aspectRatio: "2.14",
					position: "relative",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						marginBottom: 54,
					},
				})}
				// style={{
				// 	width: "100%",
				// 	height: "105%",
				// 	aspectRatio: "2.14",
				// 	position: "relative",
				// }}
			>
				<Box
					sx={(theme) => ({
						width: "95%",
						aspectRatio: "2.28",
						border: `3px solid ${theme.colors.main[0]}`,
						borderRadius: "56px",
						position: "absolute",
						bottom: "0px",
						right: "0px",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							borderRadius: "16px",
						},
					})}
				></Box>

				<Box
					sx={(theme) => ({
						boxShadow: "20px 20px 40px rgba(93, 190, 236, 0.4)",
						width: "95%",

						position: "relative",
						aspectRatio: "2.28",
						borderRadius: "56px",
						overflow: "hidden",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							borderRadius: "16px",
						},
					})}
				>
					<Image
						src={appendImageUrlFromAPI({ src: thumbnail, size: "xl" })}
						alt="Video"
						layout="fill"
						priority
						//placeholder="blur"
						blurDataURL={"https://via.placeholder.com/521x502"}
						objectFit="cover"
						quality={100}
					/>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							zIndex: 10,
						}}
					>
						<Box
							sx={(theme) => ({
								width: 104,
								height: 104,
								background: theme.colors.accent[19],
								borderRadius: "50%",
								position: "relative",
								cursor: "pointer",

								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									width: 53,
									height: 53,
								},
							})}
							onClick={() => {
								setOpened(true);
							}}
						>
							<Box
								sx={(theme) => ({
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",

									width: 0,
									height: 0,
									borderTop: "15px solid transparent",
									borderBottom: "15px solid transparent",
									borderLeft: `28px solid ${theme.colors.main[0]}`,
									borderRadius: "4px",
									[`@media (max-width: ${theme.breakpoints.md}px)`]: {
										borderTop: "8px solid transparent",
										borderBottom: "8px solid transparent",
										borderLeft: `14px solid ${theme.colors.main[0]}`,
									},
								})}
							></Box>
						</Box>
					</div>
				</Box>
			</Box>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				padding={0}
				size="78%"
				styles={(theme) => ({
					header: {
						display: "none",
					},
					body: {
						display: "flex",
						aspectRatio: "1.77",
						width: "100%",
					},
					modal: {
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							width: "100%",
						},
					},
				})}
			>
				<iframe
					width="100%"
					height="100%"
					// src="https://www.youtube.com/embed/YAwzP0abbUQ?rel=0&amp;autoplay=1"
					src={
						data?.summary ||
						"https://www.youtube.com/embed/YAwzP0abbUQ?rel=0&amp;autoplay=1"
					}
					frameBorder="0"
					title=""
					allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Modal>
		</div>
	);
}
