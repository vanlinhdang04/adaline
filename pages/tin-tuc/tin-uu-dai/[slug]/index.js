// import { useFetchNewsArticle } from "@/apis/queryFunctions/ecompagesFunctions";
import {
	fetchNewsArticle,
	fetchNewsArticles,
	useFetchNewsArticle,
} from "@/apis/queryFunctions/news";
import { fetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import { SUB_POSITION } from "@/apis/queryFunctions/subcribePosition";
import { newsKeys } from "@/apis/queryKeys";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import FormSupport from "@/common/components/FormSupport";
import Line from "@/common/components/Line";
import Related from "@/common/components/Related";
import Container, {
	DetailContainer,
	NewsContainer,
} from "@/common/MainLayout/Container";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Skeleton, Stack, Text } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import DetailContent from "../../components/DetailContent";
import DetailTitle from "../../components/DetailTitle";

export default function DetailTinUuDai() {
	const [notFound, setNotFound] = React.useState(null);
	const {
		query: { slug },
		locale,
		asPath,
	} = useRouter();
	const { data: detail, isFetched } = useFetchNewsArticle(slug);

	const label = {
		vi: {
			breadcrumbs: [
				{ href: "/", title: "Trang chủ" },
				{ href: "/tin-tuc/tin-zenone", title: "Ưu đãi & Khuyến mãi" },
				{ href: "", title: detail?.title },
			],
			ngayTruoc: "ngày trước",
			gioTruoc: "giờ trước",
			phutTruoc: "phút trước",
			noNews: "Tin tức không tồn tại",
			titleRelated: "Tin liên quan",
			defaultSeoTitle: "Ưu đãi & khuyến mãi | Đầu tư bất động sản Blockchain",
		},
		en: {
			breadcrumbs: [
				{ href: "/", title: "Home" },
				{ href: "/tin-tuc/tin-zenone", title: "Offers and Promotions" },
				{ href: "", title: detail?.title },
			],
			ngayTruoc: "days before",
			gioTruoc: "hours ago",
			phutTruoc: "minutes ago",
			noNews: "News does not exist",
			titleRelated: "Related news",
			defaultSeoTitle:
				"Offers and Promotions | Blockchain real estate investment",
		},
	};

	const created = dayjs(detail?.date_updated);
	const diff =
		dayjs().diff(created, "d") > 0
			? `${dayjs().diff(created, "d")} ${label?.[locale]?.ngayTruoc}`
			: dayjs().diff(created, "h") > 0
			? `${dayjs().diff(created, "h")} ${label?.[locale]?.gioTruoc}`
			: `${dayjs().diff(created, "m")} ${label?.[locale]?.phutTruoc}`;

	React.useEffect(() => {
		if (isFetched && !detail?.title) {
			setNotFound(
				<DetailTitle align={"center"}>{label?.[locale]?.noNews}</DetailTitle>
			);
		}
	}, [isFetched, detail]);

	if (notFound) {
		return (
			<div>
				<DefaultSEO seo={seo} />

				<Container>
					<Box py={20} style={{ minHeight: "100%" }}>
						{notFound}
					</Box>
				</Container>
			</div>
		);
	}

	const seo = {
		title:
			detail?.seo_title ||
			detail?.title ||
			label?.[locale]?.defaultSeoTitle ||
			"Tin Tức",
		description: detail?.seo_description || "",
		picture1: detail?.picture,
		type: "article",
		url: asPath,
		article: {
			publishedTime: created.toISOString(),
			section: detail?.loai_tin_tuc,
			tags: detail?.seo_tags?.split(",") || [],
		},
	};

	return (
		<Box>
			<DefaultSEO seo={seo} />
			<Container>
				<AppBreadcrumbs
					items={label?.[locale]?.breadcrumbs}
					isLoading={!detail}
				/>
				<NewsContainer>
					<Box py={30}>
						<Skeleton
							visible={!detail}
							sx={(theme) => ({
								marginBottom: 38,
								minHeight: 40,
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									marginBottom: 16,
								},
							})}
						>
							<Stack align={"center"} spacing={8}>
								<DetailTitle>{detail?.title}</DetailTitle>
								<Text size={"xs"}>{diff}</Text>
							</Stack>
						</Skeleton>
						<Skeleton visible={!detail}>
							<Box
								sx={(theme) => ({
									borderRadius: "63px",
									width: "100%",
									aspectRatio: "2.22",
									position: "relative",
									overflow: "hidden",
									[`@media (max-width: ${theme.breakpoints.md}px)`]: {
										borderRadius: "17px",
									},
								})}
							>
								<Image
									src={appendImageUrlFromAPI({ src: detail?.picture })}
									alt={detail?.title}
									layout="fill"
									priority
									objectFit="cover"
								/>
							</Box>
						</Skeleton>
						<DetailContainer>
							<DetailContent isLoading={!detail}>
								{sanitizeDOMData(detail?.content, {})}
							</DetailContent>
							<Box>
								<Text size={"sm"}>
									<b>Tags: </b>
									{detail?.seo_tags}
								</Text>
							</Box>
						</DetailContainer>
					</Box>
				</NewsContainer>
				<Box>
					<FormSupport position={SUB_POSITION.UU_DAI} slug={slug} />
				</Box>
				<NewsContainer>
					<Line index={1} />
					<Related
						title={label?.[locale]?.titleRelated}
						options={{
							limit: 3,
							condition: {
								loai_tin_tuc: {
									$in: [detail?.loai_tin_tuc],
								},
								_id: { $nin: [detail?._id] },
							},
						}}
						pathname={"/tin-tuc/tin-uu-dai"}
					/>
				</NewsContainer>
			</Container>
		</Box>
	);
}

export async function getStaticPaths({ locales }) {
	let paths = [];
	for (const locale of locales) {
		const dataZenOne = await fetchPageInfo("web-news-gift", {
			condition: { ngon_ngu: locale },
		});
		const types = getFieldFromFieldId(
			"types",
			"id",
			dataZenOne?.add_on_5,
			true
		);
		const newsType = types?.reduce((arr, curr) => {
			curr?.text_field?.map((item) => {
				if (item?.content_id === "id" && item?.shared) {
					arr.push(item.content);
				}
			});

			return arr;
		}, []);
		const newsArticles = await fetchNewsArticles(
			newsType && {
				page: 1,
				condition: {
					// ngon_ngu: "vi",
					loai_tin_tuc: { $in: [...newsType] },
				},
				limit: 100,
			}
		);
		// console.log("newsArticles", newsArticles);

		(newsArticles || []).map((newsArticle) => {
			paths.push({
				params: { slug: String(newsArticle.slug) },
				locale,
			});
		});
	}

	// const dataZenOne = await fetchPageInfo("web-news-gift");
	// const types = getFieldFromFieldId("types", "id", dataZenOne?.add_on_5, true);
	// const newsType = types?.reduce((arr, curr) => {
	// 	curr?.text_field?.map((item) => {
	// 		if (item?.content_id === "id" && item?.shared) {
	// 			arr.push(item.content);
	// 		}
	// 	});

	// 	return arr;
	// }, []);

	// const newsArticles = await fetchNewsArticles({
	// 	page: 1,
	// 	condition: {
	// 		// ngon_ngu: "vi",
	// 		loai_tin_tuc: { $in: [...newsType] },
	// 	},
	// 	limit: 100,
	// });

	// const paths = (newsArticles || []).map((newsArticle) => ({
	// 	params: { slug: String(newsArticle.slug) },
	// }));

	return {
		paths,
		fallback: "blocking",
	};
}

export async function getStaticProps({ params = {} }) {
	const slug = params?.slug;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		newsKeys.detail(slug),
		() => fetchNewsArticle(slug),
		{
			staleTime: 1000 * 60 * 60,
			enabled: !!slug,
		}
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	};
}
