import {
	fetchNewsArticles,
	fetchNewsArticlesCount,
	useFetchNewsArticles,
	useFetchNewsArticlesCount,
} from "@/apis/queryFunctions/news";
import {
	fetchPageInfo,
	fetchPageInfos,
	useFetchPageInfos,
} from "@/apis/queryFunctions/pageInfo";
import { newsKeys } from "@/apis/queryKeys";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import HomeDownload from "@/common/components/HomeDownload";
import HomeTitle from "@/common/components/HomeTitle";
import Line from "@/common/components/Line";
import Container, { NewsContainer } from "@/common/MainLayout/Container";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid, Group, Pagination, Stack } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import NewsCard from "../components/NewsCard";
import NewsSlider from "../components/NewsSlider";
import NewsTag from "../components/NewsTag";

export default function TinUuDai({ activeTypeDefault = null }) {
	const { locale, asPath } = useRouter();
	const limit = 9;
	const list = ["web-news-gift", "web-home-download"];
	const [page, setPage] = React.useState(1);
	const [activeType, setActiveType] = React.useState(
		// JSON.parse(activeTypeDefault) || null
		null
	);

	const { data: news, isFetched } = useFetchNewsArticles(
		activeType && {
			page: page,
			limit: limit,
			condition: {
				loai_tin_tuc: { $in: [...activeType] },
				status: true,
			},
		}
	);
	const { data: newsCount } = useFetchNewsArticlesCount(
		activeType && {
			page: page,
			condition: {
				loai_tin_tuc: { $in: [...activeType] },
				status: true,
			},
		}
	);
	const { data } = useFetchPageInfos(list, { condition: { ngon_ngu: locale } });
	const dataGift = data?.filter((x) => x.ma_trang === "web-news-gift")[0];
	const title =
		getFieldFromFieldId("title", "content_id", dataGift?.text_field, true)
			?.content_editor || "";
	const types =
		getFieldFromFieldId("types", "id", dataGift?.add_on_5, true) || [];

	const newsType = types?.reduce((arr, curr) => {
		const id = curr?.text_field?.reduce((ar, cur) => {
			if (cur?.content_id === "id") {
				ar.push(cur.content);
			}
			return ar;
		}, []);
		const title =
			getFieldFromFieldId("title", "content_id", curr?.text_field)?.content ||
			"";
		arr?.push({
			id: [...id],
			title: title,
		});
		return arr;
	}, []);

	React.useEffect(() => {
		if (activeType || !newsType || newsType?.length === 0) return undefined;
		setActiveType(newsType[0]?.id);
		// setActiveType(newsType[0]?.id);
	}, [activeType, newsType]);

	React.useEffect(() => {
		if (!newsType || newsType?.length === 0) return undefined;
		setActiveType(newsType[0]?.id);
		// setActiveType(newsType[0]?.id);
	}, [locale]);

	const label = {
		vi: {
			breadcrumbs: [
				{ href: "/", title: "Trang chủ" },
				{ href: "/tin-tuc/tin-zenone", title: "Tin tức" },
				{ href: "/tin-tuc/tin-zenone", title: "Tin ZenOne" },
			],
			noNews: "Hiện tại không có tin tức",
		},
		en: {
			breadcrumbs: [
				{ href: "/", title: "Home" },
				{ href: "/tin-tuc/tin-zenone", title: "News" },
				{ href: "/tin-tuc/tin-zenone", title: "News ZenOne" },
			],
			noNews: "No news at the moment",
		},
	};

	const seo = {
		title:
			dataGift?.seo_title ||
			"Ưu đãi, khuyến mãi | Đầu tư bất động sản Blockchain",
		description: dataGift?.seo_description || "",
		picture1: dataGift?.seo_image_1 || null,
		picture2: dataGift?.seo_image_2 || null,
		url: asPath,
	};

	return (
		<>
			<DefaultSEO seo={seo} />
			<div>
				<Container>
					<Box pt={20}>
						<AppBreadcrumbs
							items={label?.[locale]?.breadcrumbs}
							isLoading={false}
						/>
						<Box
							sx={(theme) => ({
								width: "100%",
								padding: "30px 0 0",
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									padding: "30px 0 0",
									minWidth: "auto",
								},
							})}
						>
							<NewsSlider data={dataGift} isLoading={!data} />
						</Box>
						<NewsContainer>
							<Line index={0} />
							<Stack align={"center"}>
								<Box>
									<HomeTitle>{sanitizeDOMData(title)}</HomeTitle>
								</Box>
								<Box>
									<Group spacing={6} position="center">
										{newsType?.map((item, k) => (
											<NewsTag
												active={
													JSON.stringify(item.id) === JSON.stringify(activeType)
												}
												key={k}
												onClick={() => setActiveType(item.id)}
											>
												{item.title}
											</NewsTag>
										))}
									</Group>
								</Box>
								<Box sx={{ width: "100%" }} my={15}>
									<Grid>
										{isFetched && news
											? news?.map((item, k) => (
													<Grid.Col xs={6} sm={6} md={4} key={k}>
														<NewsCard
															data={item}
															pathname={"/tin-tuc/tin-uu-dai"}
														/>
													</Grid.Col>
													// eslint-disable-next-line no-mixed-spaces-and-tabs
											  ))
											: Array(limit)
													.fill(undefined)
													.map((item, k) => (
														<Grid.Col xs={6} md={4} key={k}>
															<NewsCard data={item} isLoading={true} />
														</Grid.Col>
													))}
									</Grid>
								</Box>
								{newsCount ? (
									<Pagination
										page={page}
										total={Math.ceil(newsCount / limit)}
										onChange={setPage}
									/>
								) : (
									<Box>{label?.[locale]?.noNews}</Box>
								)}
							</Stack>
						</NewsContainer>
						<HomeDownload
							data={data?.filter((x) => x.ma_trang === "web-home-download")[0]}
						/>
					</Box>
				</Container>
			</div>
		</>
	);
}

export async function getStaticProps({ locale }) {
	const queryClient = new QueryClient();

	const list = ["web-news-gift", "web-home-download"];

	// PAGE INFO
	await queryClient.prefetchQuery(
		pageInfoKeys.list(list, { condition: { ngon_ngu: locale } }),
		() => fetchPageInfos(list, { condition: { ngon_ngu: locale } })
	);

	const dataZenOne = await fetchPageInfo("web-news-gift", {
		condition: { ngon_ngu: locale },
	});
	const types = getFieldFromFieldId("types", "id", dataZenOne?.add_on_5, true);
	const newsType = types?.reduce((arr, curr) => {
		const id = curr?.text_field?.reduce((ar, cur) => {
			if (cur?.content_id === "id" && cur?.shared) {
				ar.push(cur.content);
			}
			return ar;
		}, []);
		const title = getFieldFromFieldId(
			"title",
			"content_id",
			curr?.text_field
		)?.content;
		arr?.push({
			id: [...id],
			title: title,
		});
		return arr;
	}, []);

	if (newsType?.length > 0) {
		await queryClient.prefetchQuery(
			newsKeys.list({
				page: 1,
				limit: 9,
				condition: {
					loai_tin_tuc: { $in: [...(newsType[0]?.id || {})] },
					status: true,
				},
			}),
			() =>
				fetchNewsArticles(
					newsType && {
						page: 1,
						limit: 9,
						condition: {
							loai_tin_tuc: { $in: [...(newsType[0]?.id || {})] },
							status: true,
						},
					}
				)
		);

		await queryClient.prefetchQuery(
			// newsKeys.count(options?.condition || {})
			newsKeys.count({
				loai_tin_tuc: { $in: [...(newsType[0]?.id || {})] },
				status: true,
			}),
			() =>
				fetchNewsArticlesCount(
					newsType && {
						page: 1,
						limit: 9,
						condition: {
							loai_tin_tuc: { $in: [...(newsType[0]?.id || {})] },
							status: true,
						},
					}
				)
		);
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			activeTypeDefault: JSON.stringify(newsType[0]?.id || []),
		},
		revalidate: 60,
	};
}
