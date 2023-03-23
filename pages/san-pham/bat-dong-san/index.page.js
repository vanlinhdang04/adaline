import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import {} from "@/apis/queryFunctions/productType";
import { useFetchProjectList } from "@/apis/queryFunctions/projects";
import { SUB_POSITION } from "@/apis/queryFunctions/subcribePosition";
import BannerTextContent from "@/common/components/BannerTextContent";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import BtnShowMore from "@/common/components/Button/BtnShowMore";
import DefaultSEO from "@/common/components/DefaultSEO";
import FormSupport from "@/common/components/FormSupport";
import SectionHeading from "@/common/components/Heading/SectionHeading";
import HomeDownload from "@/common/components/HomeDownload";
import InvestmentInfoCard from "@/common/components/InvestmentInfoCard";
import Line from "@/common/components/Line";

import Video from "@/common/components/Video";
import Container from "@/common/MainLayout/Container";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Center, Grid } from "@mantine/core";
// import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import ProductTitle from "./components/ProductTitle";
import ProductType from "./components/ProductType";

function BatDongSan() {
	const { locale, asPath } = useRouter();
	const [listProduct, setListProduct] = React.useState([]);
	const { data: pageContent } = useFetchPageInfo("web/san-pham/bat-dong-san", {
		condition: { ngon_ngu: locale },
	});
	// const { data: projectsContent, isFetching } = useFetchPageInfo(
	// 	"web/home/product-hightlight",
	// 	{
	// 		condition: { ngon_ngu: locale },
	// 	}
	// );

	const { data: projectList } = useFetchProjectList({
		limit: 999,
		condition: {
			ma_loai_tin_tuc: "du-an-bat-dong-san",
			ngon_ngu: locale,
		},
		sort: {
			summary: 1,
		},
	});

	const listProductType =
		getFieldFromFieldId("ma-loai", "id", pageContent?.add_on_5)?.text_field ||
		[];

	const [active, setActive] = useState([]);
	const [activeWithButon, setActiveWithButon] = useState([]);

	const bannerPlaceholder = getFieldFromFieldId(
		"banner-placeholder",
		"picture_id",
		pageContent?.pictures
	);

	const SectionHeading2 = getFieldFromFieldId(
		"section-2-title",
		"content_id",
		pageContent?.text_field
	);

	const investmentTypes = pageContent?.add_on_4 || [];

	// const { data: listProductType, isFetching } = useFetchProductType({
	// 	condition: {
	// 		ma_loai: "Bất động sản",
	// 	},
	// });
	// const { data: listProduct, isFetching: isFetchingProduct } =
	// 	useFetchRealEstateProducts({
	// 		page: 1,
	// 		condition: {
	// 			ma_nhom: { $in: activeWithButon || [] },
	// 			ma_loai: "Bất động sản",
	// 		},
	// 		sort: {
	// 			stt: 1,
	// 		},
	// 	});
	// console.log("projects", projects);

	const label = {
		vi: {
			breadcrumbs: [
				{ title: "Trang chủ", href: "/" },
				{ title: "Sản phẩm", href: "#" },
				{ title: "Bất động sản", href: "/san-pham/bat-dong-san" },
			],
		},
		en: {
			breadcrumbs: [
				{ title: "Home", href: "/" },
				{ title: "Products", href: "#" },
				{ title: "Real estate", href: "/san-pham/bat-dong-san" },
			],
		},
	};

	useEffect(() => {
		if (listProductType?.length && !active?.length) {
			setActive([listProductType[0]?.label]);
			setActiveWithButon(
				listProductType[0]?.label === "Tất cả"
					? listProductType?.reduce((arr, curr) => {
							arr.push(curr?.label);
							return arr;
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }, [])
					: [...(listProductType[0]?.label || [])]
			);
		}
	}, [listProductType]);

	useEffect(() => {
		if (activeWithButon?.length && projectList?.length) {
			// console.log(
			// 	projects?.filter((el) => {
			// 		const category =
			// 			getFieldFromFieldId("category", "content_id", el?.text_field)
			// 				?.label || "";
			// 		const tenNhom =
			// 			getFieldFromFieldId("ten-nhom", "content_id", el?.text_field)
			// 				?.label || "";
			// 		return (
			// 			category === "Bất động sản" && activeWithButon?.includes(tenNhom)
			// 		);
			// 	})
			// );
			setListProduct(
				projectList?.filter((el) => {
					// const category =
					// 	getFieldFromFieldId("category", "content_id", el?.text_field)
					// 		?.label || "";
					// const tenNhom =
					// 	getFieldFromFieldId("ten-nhom", "content_id", el?.text_field)
					// 		?.label || "";
					return (
						el?.text_1 === "Bất động sản" &&
						activeWithButon?.includes(el?.text_2)
					);
				})
			);
		}
	}, [activeWithButon, projectList]);

	const seo = {
		title: pageContent?.seo_title,
		description: pageContent?.seo_description,
		picture1: pageContent?.seo_image_1,
		picture2: pageContent?.seo_image_2,
		url: asPath,
	};

	return (
		<Container>
			<DefaultSEO seo={seo} />
			<Box pt={24}>
				<AppBreadcrumbs
					items={label?.[locale]?.breadcrumbs}
					isLoading={false}
				/>
			</Box>
			<Box component="section" py={16}>
				<Grid gutter={"xl"}>
					<Grid.Col
						xs={12}
						md={6}
						sx={{
							display: "flex",
							alignItems: "center",
						}}
						order={2}
						orderMd={1}
					>
						<BannerTextContent data={pageContent?.text_field || []} />
					</Grid.Col>
					<Grid.Col
						xs={12}
						md={6}
						order={1}
						orderMd={2}
						justify="center"
						align="center"
					>
						<Box
							sx={{
								aspectRatio: "0.9",
								position: "relative",
								maxWidth: 425,
							}}
						>
							<Video
								video_url={pageContent?.video_url}
								placeholderImageUrl={bannerPlaceholder?.picture_url}
							/>
						</Box>
					</Grid.Col>
				</Grid>
			</Box>
			<FormSupport position={SUB_POSITION.BDS} bds={true} list={listProduct} />
			<Line index={0} />

			<Box component="section">
				<SectionHeading>
					{sanitizeDOMData(
						SectionHeading2?.content_editor || SectionHeading2?.content
					)}
				</SectionHeading>

				<Grid gutter="xl">
					{investmentTypes
						?.filter((el) => el?.shared)
						?.sort((a, b) => +a?.stt - +b?.stt)
						?.map((type, i) => (
							<Grid.Col span={12} md={6} lg={4} key={i}>
								<InvestmentInfoCard
									title={
										type?.text_field?.find((el) => el?.content_id === "title")
											?.content
									}
									iconUrl={type?.pictures?.[0]?.picture_url}
									list={type?.text_field}
								/>
							</Grid.Col>
						))}
				</Grid>
				<Center
					sx={(theme) => ({
						marginTop: 38,
						[`@media max-width(${theme.breakpoints.md}px)`]: {
							marginTop: 10,
						},
					})}
				>
					<BtnShowMore
						href={
							"/chinh-sach-dau-tu-hop-tac?keyword=chinh-sach-dau-tu-bat-dong-san"
						}
					/>
				</Center>
			</Box>

			<ProductTitle />
			<Grid cols={4}>
				<ProductType
					listProductType={listProductType}
					// isFetching={isFetching}
					active={active}
					setActive={setActive}
					setActiveWithButon={setActiveWithButon}
				/>
				<ProductItem listProduct={listProduct} />
			</Grid>
			<HomeDownload />
		</Container>
	);
}

export default BatDongSan;
