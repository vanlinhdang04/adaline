import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import Video from "@/common/components/Video";
import Container from "@/common/MainLayout/Container";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid, Group, List, Stack, Text, Title } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
// import DetailTitle from "../tin-tuc/components/DetailTitle";
import { useFetchAbout } from "@/api/queryFunctions/about";
import DefaultSEO from "@/common/components/DefaultSEO";
import imgAbout1 from "@/public/images/about1.avif";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { useRouter } from "next/router";
import ListIcon from "public/icons/list-icon.svg";
import AboutTitle from "./components/AboutTitle";

export default function GioiThieu() {
	const { locale, asPath } = useRouter();
    const {data: about} = useFetchAbout();

    console.log("about", about)
	const { data } = useFetchPageInfo("web-about", {
		condition: { ngon_ngu: locale },
	});
	const suMenh = getFieldFromFieldId("su-menh", "id", data?.add_on_4);
	const tamNhin = getFieldFromFieldId("tam-nhin", "id", data?.add_on_4);
	const giaTriCotLoi = getFieldFromFieldId(
		"gia-tri-cot-loi",
		"id",
		data?.add_on_4
	);
	// const targetBg = getFieldFromFieldId(
	// 	"bg-target",
	// 	"picture_id",
	// 	data?.pictures
	// );
	// const target = getFieldFromFieldId("target", "id", data?.add_on_4);
	const leadershipTitle = getFieldFromFieldId(
		"leadership-title",
		"content_id",
		data?.text_field
	);
	const leadership = getFieldFromFieldId(
		"leadership",
		"id",
		data?.add_on_5
	)?.filter((el) => el?.shared);

	const label = {
		vi: {
			title: "Giới thiệu",
			breadcrumbs: [
				{ href: "/", title: "Trang chủ" },
				{ href: "/gioi-thieu", title: "Về Adaline" },
			],
			thanhLap: "Thành lập",
			nguoiDung: "Người dùng",
		},
		en: {
			title: "About",
			breadcrumbs: [
				{ href: "/", title: "Home" },
				{ href: "/gioi-thieu", title: "About Adaline" },
			],
			thanhLap: "Establish",
			nguoiDung: "Users",
		},
	};
	console.log(data?.video_url)

	const seo = {
		title: about?.data?.attributes?.siteSeo?.metaTitle,
		description: about?.data?.attributes?.siteSeo?.metaDescription,
		picture1: appendImageFromAPI(about?.data?.attributes?.siteSeo?.shareImage?.data?.attributes?.url),
		url: asPath,
	};

	return (
		<Box pt={20} sx={{ color: "#001529" }}>
			<DefaultSEO seo={seo} />
			<Container>
				<AppBreadcrumbs
					items={label?.[locale]?.breadcrumbs}
					isLoading={false}
				/>
				{/* <Center
					sx={(theme) => ({
						marginTop: 30,
						marginBottom: 48,
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							marginTop: 16,
							marginBottom: 16,
						},
					})}
				>
					<DetailTitle style={{ maxWidth: 818 }} align="center">
						{sanitizeDOMData(title?.content_editor)}
					</DetailTitle>
				</Center> */}
				<Box
					sx={(theme) => ({
						marginTop: 30,
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							marginTop: 16,
						},
					})}
				>
					<Grid>
						<Grid.Col xs={12} md={7} order={2} orderMd={1}>
							<Box
								sx={(theme) => ({
									maxWidth: 570,
									[`@media (max-width: ${theme.breakpoints.md}px)`]: {
										maxWidth: "auto",
									},
								})}
							>
								<Text
									color={"#001529"}
									weight={400}
									sx={() => ({ fontSize: 16 })}
								>
									{label?.[locale]?.title}
								</Text>
								<Title
									order={1}
									sx={(theme) => ({
										fontWeight: "500",
										fontSize: 34,
										color: theme.colors.neutral[0],
										lineHeight: "44px",
										margin: "6px 0 12px",

										"&:first-letter": {
											textTransform: "capitalize",
										},
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											fontSize: 22,
											margin: "4px 0 8px",
											lineHeight: "35px",
										},
									})}
								>
									Về Adaline
								</Title>
								{/* <AboutTitle>
									{sanitizeDOMData(contentTitle?.content_editor)}
								</AboutTitle> */}
								<Text
									color={"#001529"}
									weight={400}
									sx={() => ({ fontSize: 16 })}
									className="webview"
								>
									{sanitizeDOMData(about?.data?.attributes?.content)}
								</Text>
								<Group mt={32} spacing={48}>
									<Stack spacing={8}>
										<Text
											sx={(theme) => ({
												fontSize: 48,
												color: theme.colors.accent[2],
												fontWeight: 800,
												lineHeight: "1",
											})}
										>
											{about?.data?.attributes?.foundedYear}
										</Text>
										<Text weight={400} size={"xs"} color="#414141">
											{label?.[locale]?.thanhLap}
										</Text>
									</Stack>
									<Stack spacing={8}>
										<Text
											sx={(theme) => ({
												fontSize: 48,
												color: theme.colors.accent[2],
												fontWeight: 800,
												lineHeight: "1",
											})}
										>
											{about?.data?.attributes?.users}
										</Text>
										<Text weight={400} size={"xs"} color="#414141">
											{label?.[locale]?.nguoiDung}
										</Text>
									</Stack>
								</Group>
							</Box>
						</Grid.Col>
						<Grid.Col xs={12} md={5} order={1} orderMd={2}>
							<Box
								sx={{
									margin: "0 auto",
									aspectRatio: "0.9",
									position: "relative",
								}}
							>
								<Video
									video_url={data?.video_url}
									placeholderImageUrl={about?.data?.attributes?.video?.videoThumbnail?.data?.attributes?.url}
								/>
							</Box>
						</Grid.Col>
					</Grid>
				</Box>
			</Container>
			{/* Suwd mệnh - tầm nhìn */}
			<Box
				sx={(theme) => ({
					background: "#EBFFFE",
					marginTop: "73px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						maxWidth: "auto",
						marginTop: "43px",
					},
				})}
			>
				<Grid gutter={0}>
					<Grid.Col xs={12} md={5}>
						<Box
							sx={{
								position: "relative",
								aspectRatio: "1.33",
							}}
						>
							<Image
							src={imgAbout1}
								alt={"about"}
								layout="fill"
								objectFit="cover"
								priority
								quality={100}
							/>
						</Box>
					</Grid.Col>
					<Grid.Col xs={12} md={7}>
						<Box
							sx={(theme) => ({
								padding: "55px 76px",

								margin: "0 auto",

								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									padding: "37px 6%",

									maxWidth: "768px",
								},
								[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
									padding: "37px 26px",
									maxWidth: "428px",
								},
							})}
						>
							<Box
								sx={(theme) => ({
									marginBottom: "53px",
									[`@media (max-width: ${theme.breakpoints.md}px)`]: {
										marginBottom: "18px",
									},
								})}
							>
								<AboutTitle>Sứ mệnh</AboutTitle>
								<List
									icon={
										<Box sx={{ width: 23, height: 23 }}>
											{/* <Image
												src={appendImageUrlFromAPI({
													src: iconList?.picture_url,
													size: "l",
												})}
												alt="vector Top right"
												width={23}
												height={23}
											/> */}
											<Image
												src={ListIcon}
												alt="vector Top right"
												width={23}
												height={23}
											/>
										</Box>
									}
									sx={(theme) => ({
										fontSize: 20,
										color: theme.colors.neutral[0],
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											fontSize: 16,
										},
									})}
									styles={{
										itemWrapper: {
											// alignItems: "center !important",
										},

										itemIcon: {
											marginTop: "4px",
										},
									}}
									mb={16}
								>
									{suMenh?.text_field?.map((item, k) => (
										<List.Item key={k}>{item.content}</List.Item>
									))}
								</List>
							</Box>
							<Box>
								<AboutTitle>Tầm nhìn</AboutTitle>
								{tamNhin?.text_field?.map((item, k) => (
									<Text
										key={k}
										sx={(theme) => ({
											fontSize: 20,
											color: theme.colors.neutral[0],
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												fontSize: 16,
											},
										})}
									>
										{item?.content}
									</Text>
								))}
							</Box>
						</Box>
					</Grid.Col>
				</Grid>
			</Box>
			<Box
				sx={(theme) => ({
					marginTop: "58px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						marginTop: "24px",
					},
				})}
			>
				<Container>
					<AboutTitle align="center">{giaTriCotLoi?.label}</AboutTitle>
					<Box
						sx={(theme) => ({
							marginTop: "30px",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								marginTop: "8px",
							},
						})}
					>
						<Grid justify={"center"} gutter={"xl"}>
							{giaTriCotLoi?.text_field?.map((item, k) => (
								<Grid.Col xs={12} sm={6} md={4} key={k}>
									<Box
										sx={(theme) => ({
											border: "1px solid #6ED7D3",
											borderRadius: "13px",
											boxShadow: "20px 20px 40px rgba(46, 232, 214, 0.2)",
											padding: "40px 0px",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											height: "100%",
											width: "100%",

											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												padding: "38px 0px",
											},
										})}
									>
										<Box>
											<Image
												src={appendImageUrlFromAPI({
													src: giaTriCotLoi?.pictures[k]?.picture_url,
												})}
												alt={item?.content_id}
												width={90}
												height={90}
											/>
										</Box>
										<Text
											weight={500}
											size={24}
											align="center"
											mt={30}
											mb={18}
											sx={(theme) => ({
												margin: "30px auto 18px",
												"&:first-letter": {
													textTransform: "capitalize",
												},
												[`@media (max-width: ${theme.breakpoints.md}px)`]: {
													margin: "25px auto 16px",
												},
											})}
										>
											{item?.label}
										</Text>
										<Text
											weight={400}
											size={18}
											align="center"
											lineClamp={5}
											sx={{ maxWidth: 280 }}
										>
											{item?.content}
										</Text>
									</Box>
								</Grid.Col>
							))}
						</Grid>
					</Box>
				</Container>
			</Box>

			{/* <Box
				sx={(theme) => ({
					background: "#EBFFFE",
					marginTop: "73px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						maxWidth: "auto",
						marginTop: "43px",
					},
				})}
			>
				<Container>
					<Grid gutter={22}>
						<Grid.Col xs={12} md={6}>
							<Box
								sx={() => ({
									position: "relative",
									aspectRatio: "1.14",
									width: "100%",
								})}
							>
								<Image
									src={appendImageUrlFromAPI({
										src: targetBg?.picture_url,
										size: "l",
									})}
									alt={"bg-target"}
									layout="fill"
								/>
							</Box>
						</Grid.Col>
						<Grid.Col xs={12} md={6}>
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
								{target?.text_field?.map((item, k) => {
									if (item.shared)
										return (
											<Group key={k} position="apart">
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
															src: target?.pictures[k]?.picture_url,
															size: "s",
														})}
														alt="icon-target"
														layout="fill"
													/>
												</Box>
												<Box
													sx={(theme) => ({
														width: "calc(100% - 84px)",
														[`@media (max-width: ${theme.breakpoints.md}px)`]: {
															width: "calc(100% - 56px)",
														},
													})}
												>
													<Text
														sx={(theme) => ({
															fontSize: 20,
															lineHeight: "24px",
															[`@media (max-width: ${theme.breakpoints.md}px)`]:
																{
																	fontSize: 16,
																	lineHeight: "20px",
																},
														})}
													>
														{sanitizeDOMData(item.content_editor)}
													</Text>
												</Box>
											</Group>
										);
								})}
							</Stack>
						</Grid.Col>
					</Grid>
				</Container>
			</Box> */}
			<Box
				sx={(theme) => ({
					padding: "74px 0 58px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						padding: "32px 0 44px",
					},
				})}
			>
				{leadership?.length > 0 && (
					<Container>
						<Box
							sx={(theme) => ({
								maxWidth: 818,
								margin: "0 auto 56px",
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									margin: "0 auto 14px",
								},
							})}
						>
							<Text
								align="center"
								weight={400}
								sx={(theme) => ({
									fontSize: 24,
									[`@media (max-width: ${theme.breakpoints.md}px)`]: {
										fontSize: 16,
									},
								})}
							>
								Ban lãnh đạo
							</Text>
							<AboutTitle align="center">{leadershipTitle?.content}</AboutTitle>
						</Box>
						<Grid>
							{leadership?.map((item, k) => {
								if (item.shared)
									return (
										<Grid.Col xs={6} md={3} key={k}>
											<Box
												sx={{
													position: "relative",
													aspectRatio: "1.07",
													width: "100%",
												}}
											>
												<Image
													src={appendImageUrlFromAPI({
														src: item?.pictures?.filter(
															(x) => x.picture_id === "avatar"
														)[0]?.picture_url,
													})}
													alt="avatar"
													layout="fill"
													objectFit="cover"
													style={{ borderRadius: 13 }}
												/>
											</Box>
											<Box
												sx={(theme) => ({
													margin: "20px 0 0",
													[`@media (max-width: ${theme.breakpoints.md}px)`]: {
														margin: "12px 0 0",
													},
												})}
											>
												<Text weight={500} size="lg">
													{
														item?.text_field?.filter(
															(x) => x.content_id === "name"
														)[0]?.content
													}
												</Text>
											</Box>
											<Box>
												<Text sx={{ fontSize: 14 }}>
													{
														item?.text_field?.filter(
															(x) => x.content_id === "position"
														)[0]?.content
													}
												</Text>
											</Box>
										</Grid.Col>
									);
							})}
						</Grid>
					</Container>
				)}
			</Box>
		</Box>
	);
}
export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(pageInfoKeys.detail("web-about"), () =>
		fetchPageInfo("web-about")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	};
};
