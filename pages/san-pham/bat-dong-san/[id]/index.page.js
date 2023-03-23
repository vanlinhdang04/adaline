import { fetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import { SUB_POSITION } from "@/apis/queryFunctions/subcribePosition";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import FormSupport from "@/common/components/FormSupport";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
// import { getIdFromSlug } from "@/utils/getIdFromSlug";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
// import slugify from "@/utils/slugifyString";
import { useFetchProject } from "@/apis/queryFunctions/projects";
import DefaultSEO from "@/common/components/DefaultSEO";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import {
	AspectRatio,
	Box,
	Container,
	MediaQuery,
	Text,
	Title,
} from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function BatDongSanDetail() {
	const route = useRouter();
	const { locale, asPath } = route;
	const { id: slug } = route.query;
	const split = slug.split("-");
	const productId = split[split.length - 1];

	// const productId = getIdFromSlug(id);

	const { data: project } = useFetchProject(productId, {
		condition: {
			ma_loai_tin_tuc: "du-an-bat-dong-san",
			ngon_ngu: locale,
		},
	});
	const detail =
		getFieldFromFieldId("detail", "content_id", project?.text_field)
			?.content_editor || "";

	const label = {
		vi: {
			ngayTruoc: "ngày trước",
			gioTruoc: "giờ trước",
			phutTruoc: "phút trước",
			breadcrumb: [
				{ title: "Trang chủ", href: "/" },
				{ title: "Sản phẩm", href: "#" },
				{ title: "Bất động sản", href: "/san-pham/bat-dong-san" },
			],
		},
		en: {
			ngayTruoc: "days before",
			gioTruoc: "hours ago",
			phutTruoc: "minutes ago",
			breadcrumb: [
				{ title: "Home", href: "/" },
				{ title: "Products", href: "#" },
				{ title: "Real estate", href: "/san-pham/bat-dong-san" },
			],
		},
	};

	const date_created = dayjs(project?.date_created);
	const diff =
		dayjs().diff(date_created, "d") > 0
			? `${dayjs().diff(date_created, "d")} ${label?.[locale]?.ngayTruoc}`
			: dayjs().diff(date_created, "h") > 0
			? `${dayjs().diff(date_created, "h")} ${label?.[locale]?.gioTruoc}`
			: `${dayjs().diff(date_created, "m")} ${label?.[locale]?.phutTruoc}`;

	const seo = {
		title: project?.seo_title || project?.title,
		description: project?.seo_description,
		picture1: project?.seo_image_1,
		picture2: project?.seo_image_2,
		type: "article",
		url: asPath,
		article: {
			publishedTime: date_created.toISOString(),
			section: "Bất động sản",
		},
	};

	return (
		<>
			<DefaultSEO seo={seo} />
			<Container>
				<Box pt={10}>
					<AppBreadcrumbs
						items={label?.[locale]?.breadcrumb}
						isLoading={false}
					/>
				</Box>
				<Box py={24}>
					<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
						<Title mb={12} order={1} size="h1" align="center">
							{uppercaseFirstLetter(project?.title)}
						</Title>
					</MediaQuery>

					<MediaQuery largerThan="sm" styles={{ display: "none" }}>
						<Title mb={12} order={1} size="h2" align="center">
							{uppercaseFirstLetter(project?.title)}
						</Title>
					</MediaQuery>

					<Text align="center" size={"xs"}>
						{diff}
					</Text>
				</Box>
				<AspectRatio ratio={1090 / 490}>
					<Box
						sx={{
							position: "relative",
							"@media (max-width: 768px)": {
								borderRadius: 13,
							},
							"@media (min-width: 768px)": {
								borderRadius: 63,
							},
						}}
						py={38}
					>
						<Image
							alt="product-detail-image"
							src={appendImageUrlFromAPI({
								src:
									project?.picture_1 ||
									project?.picture_2 ||
									project?.picture_3,
							})}
							layout="fill"
							objectFit="cover"
						/>
					</Box>
				</AspectRatio>
				<Box
					my={48}
					sx={{
						"@media (max-width: 768px)": {
							padding: 0,
						},
						"@media (min-width: 768px)": {
							padding: "0 63px",
						},
					}}
				>
					<div className="webview">{sanitizeDOMData(detail)}</div>
				</Box>
				<Box pb={48}>
					<FormSupport position={SUB_POSITION.DU_AN} id={productId} />
				</Box>
			</Container>
		</>
	);
}

export async function getStaticPaths({ locales }) {
	const paths = [];
	for (const locale of locales) {
		const data = await fetchPageInfo("web/home/product-hightlight", {
			condition: { ngon_ngu: locale },
		});

		const { add_on_4 } = data || {};
		const path = (add_on_4 || [])
			.filter((item) => !!item?.shared)
			.map((item) => {
				return {
					// params: { id: slugify(item?.label) },
					params: { id: item.id },
					locale,
				};
			});
		paths.push(...path);
	}

	return {
		paths: paths,
		fallback: "blocking",
	};
}

export const getStaticProps = async ({ locale }) => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web/home/product-hightlight", {
			condition: { ngon_ngu: locale },
		}),
		() =>
			fetchPageInfo("web/home/product-hightlight", {
				condition: { ngon_ngu: locale },
			})
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	};
};

export default BatDongSanDetail;
