import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import {
	Box,
	Center,
	Grid,
	Group,
	List,
	MediaQuery,
	Skeleton,
	Text,
	Title
} from "@mantine/core";
import Image from "next/image";
import ListIcon from "public/icons/list-icon.svg";
import React from "react";
import DefaultSEO from "./DefaultSEO";
import DownloadApp from "./DownloadApp";

export default function HomeBanner({ data, onClickScroll }) {
	const ref = React.useRef(null);
	const [lottie, setLottie] = React.useState(null);
	// const mainPicture = data?.pictures?.reduce((rs, cur) => {
	// 	if (cur.picture_id === "1") return cur;
	// }, {});
	const title = data?.text_field?.filter((x) => x.content_id === "title")[0]
		?.content_editor;
	const subsTitle = data?.text_field?.filter(
		(x) => x.content_id === "subs-title"
	)[0]?.content;
	const listItem = data?.text_field?.filter(
		(x) => x.content_id === "list-item"
	);
	const banner = getFieldFromFieldId(
		"banner-position",
		"content_id",
		data?.text_field
	);

	React.useEffect(() => {
		import("lottie-web").then((Lottie) => setLottie(Lottie.default));
	}, []);

	React.useEffect(() => {
		if (lottie && ref.current) {
			const animation = lottie.loadAnimation({
				container: ref.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				// path to your animation file, place it inside public folder
				path: appendImageUrlFromAPI({ src: data[`${banner?.label}`] }),
				rendererSettings: {
					className: "home-banner-animation",
				},
			});

			return () => animation.destroy();
		}
	}, [lottie]);

	const seo = {
		title: data?.seo_title,
		description: data?.seo_description,
		picture1: data?.seo_image_1,
		picture2: data?.seo_image_2,
	};

	return data ? (
		<Box sx={{ position: "relative" }}>
			<DefaultSEO seo={seo} />
			<Box
				sx={(theme) => ({
					position: "absolute",
					top: "55%",
					left: "40%",

					border: "1px solid #17A49C",
					borderRadius: "50%",
					width: "60px",
					aspectRatio: "1",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						display: "none",
					},
				})}
			></Box>
			<Box
				sx={(theme) => ({
					position: "absolute",
					top: "10%",
					left: "50%",

					border: "1px solid #17A49C",
					borderRadius: "50%",
					width: "30px",
					aspectRatio: "1",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						display: "none",
					},
				})}
			></Box>
			<Grid align={"center"} gutter={0}>
				<Grid.Col xs={12} md={6} order={2} orderMd={1}>
					<Box
						sx={(theme) => ({
							color: theme.colors.neutral[0],
							minHeight: 270,
						})}
					>
						<Title
							order={1}
							sx={(theme) => ({
								fontSize: 40,
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									fontSize: 32,
								},
							})}
						>
							{/* {sanitizeDOMData(title)} */}
							<p>
								Đầu tư vượt trội cùng{" "}
								<span className="company-name">Adaline</span>
							</p>
						</Title>
						<Text
							weight={600}
							mb={8}
							sx={(theme) => ({
								fontSize: 22,
								paddingTop: 6,
								// minInlineSize: "max-content",
								lineHeight: "30px",
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									fontSize: 20,
									minInlineSize: "auto",
									// minInlineSize: "max-content",
								},
							})}
						>
							{subsTitle}
							{/* Nền tảng đầu tư bất động sản bằng công nghệ blockchain */}
						</Text>
						<List
							icon={
								<Box sx={{ width: 23, height: 23 }}>
									<Image
										src={ListIcon}
										alt="vector Top right"
										width={23}
										height={23}
										layout="responsive"
									/>
								</Box>
							}
							sx={(theme) => ({
								fontSize: 20,
								color: theme.colors.neutral[0],
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									fontSize: 20,
								},
							})}
							styles={{
								itemIcon: {
									marginTop: "4px",
								},
							}}
							mb={16}
						>
							<List.Item>Đơn giản, dẽ dùng</List.Item>
							<List.Item>Phù hợp cho từng ngành hàng</List.Item>
							<List.Item>Tiết kiệm chi phí nhất</List.Item>
							{/* {listItem
								?.sort((a, b) => a?.stt - b?.stt)
								?.map((item, k) => (
									<List.Item key={k}>{item.content}</List.Item>
								))} */}
						</List>
						<DownloadApp banner={true} />
					</Box>
				</Grid.Col>
				<Grid.Col my={14} xs={12} md={6} order={1} orderMd={2}>
					<MediaQuery
						smallerThan={"md"}
						styles={{
							width: "80% !important",
							// margin: "0 auto 36px !important",
						}}
					>
						<div
							style={{
								position: "relative",
								aspectRatio: "1.22",
								maxWidth: "605px",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								margin: "0 auto",
							}}
						>
							{banner?.content === "json" ? (
								<div
									ref={ref}
									style={{
										position: "relative",
										aspectRatio: "1.22",
										maxWidth: "605px",
										display: "flex",
										justifyContent: "center",
										margin: "0 auto",
									}}
								/>
							) : banner?.content === "video" ? (
								<video
									style={{
										width: "100%",
										height: "100%",
										backgroundColor: "#fff",
										aspectRatio: "1.22",
									}}
									muted
									loop
									autoPlay
								>
									<source
										src={appendImageUrlFromAPI({
											src: data[`${banner?.label}`],
										})}
										type="video/mp4"
									/>
									<source
										src={appendImageUrlFromAPI({
											src: data[`${banner?.label}`],
										})}
										type="video/ogg"
									/>
									<source
										src={appendImageUrlFromAPI({
											src: data[`${banner?.label}`],
										})}
										type="video/webm"
									/>
								</video>
							) : (
								<div
									style={{
										position: "relative",
										aspectRatio: "1.22",
										width: "100%",
										display: "flex",
										justifyContent: "center",
										margin: "0 auto",
									}}
								>
									<Image
										src={appendImageUrlFromAPI({
											src: data[`${banner?.label}`],
											size: "m",
										})}
										alt="Banner"
										layout="fill"
										objectFit="cover"
										priority
										quality={100}
									/>
								</div>
							)}
						</div>
					</MediaQuery>
				</Grid.Col>
			</Grid>
			<Center>
				<Box sx={{ cursor: "pointer" }} onClick={onClickScroll}>
					<Image
						src={appendImageUrlFromAPI({ src: data?.picture_3 })}
						alt="Scroll down arrows"
						width={56}
						height={56}
						objectFit="cover"
						objectPosition={"50% 100%"}
						//placeholder="blur"
						blurDataURL="https://via.placeholder.com/64"
					/>
				</Box>
			</Center>
		</Box>
	) : (
		<Box>
			<Grid align={"center"}>
				<Grid.Col xs={12} md={6} order={2} orderMd={1}>
					{/* <Skeleton>
						<p>
							Đầu tư vượt trội cùng{" "}
							<span style={{ color: "#3CAEA4" }}>ZenOne</span>
						</p>
					</Skeleton> */}
					<Skeleton height={40} radius="xl" mb={8} />
					<Skeleton height={30} radius="xl" mb={8} />
					<Skeleton height={20} radius="xl" mb={8} />
					<Skeleton height={20} radius="xl" mb={8} />
					<Skeleton height={20} radius="xl" mb={8} />
					<Skeleton height={20} radius="xl" mb={8} />

					<Group>
						<Skeleton width={136} height={40} radius="xl" mr={8} />
						<Skeleton width={136} height={40} radius="xl" />
					</Group>
				</Grid.Col>
				<Grid.Col xs={12} md={6} order={1} orderMd={2}>
					{/* <MediaQuery
						smallerThan={"md"}
						styles={{
							width: "80% !important",
							// margin: "0 auto 36px !important",
						}}
					></MediaQuery> */}
					<Skeleton>
						<div
							style={{
								position: "relative",
								aspectRatio: "1.22",
								width: "605px",
								display: "flex",
								justifyContent: "center",
								margin: "0 auto",
							}}
						>
							{/* <Image
								src={appendImageUrlFromAPI({
									src: data?.picture_1,
									size: "m",
								})}
								alt="Banner"
								layout="fill"
								priority
							/> */}
						</div>
					</Skeleton>
				</Grid.Col>
			</Grid>
		</Box>
	);
}
