import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import BannerTextContent from "@/common/components/BannerTextContent";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
// import CompanyList from "@/common/components/CompanyList";
import DefaultSEO from "@/common/components/DefaultSEO";
import BannerHeading from "@/common/components/Heading/BannerHeading";
import SectionHeading from "@/common/components/Heading/SectionHeading";
import HomeDownload from "@/common/components/HomeDownload";

import InvestmentInfoCard from "@/common/components/InvestmentInfoCard";
import Line from "@/common/components/Line";
import TextSSR from "@/common/components/TextSSR";
import Video from "@/common/components/Video";
import Container from "@/common/MainLayout/Container";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import DownArrorGif from "public/icons/down_arrows.gif";
import React from "react";

function CoPhanStartups() {
	const { asPath } = useRouter();
	const { data: pageContent } = useFetchPageInfo(
		"web/san-pham/co-phan-startups"
	);

	const bannerPlaceholder = getFieldFromFieldId(
		"banner-placeholder",
		"picture_id",
		pageContent?.pictures
	);

	const investmentTypes = pageContent?.add_on_4 || [];
	const { text_field: topSectionContent } = pageContent?.add_on_5?.[0] || {};
	const title = topSectionContent?.find((el) => el.content_id === "title");
	const subTitle = topSectionContent?.find(
		(el) => el.content_id === "sub-title"
	);

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
					items={[
						{ title: "Trang chủ", href: "/" },
						{ title: "Sản phẩm", href: "/" },
						{ title: "Cổ phần Startups", href: "/san-pham/co-phan-startups" },
					]}
					isLoading={false}
				/>
			</Box>
			<Box component="section" pt={68}>
				<Box mx={-12}>
					<BannerHeading align="center">
						{sanitizeDOMData(title?.content_editor || title?.content)}
					</BannerHeading>
				</Box>
				<TextSSR
					type="text"
					size="sm"
					align="center"
					mt={8}
					md={{
						text: {
							fontSize: 20,
							marginTop: 14,
						},
					}}
				>
					{sanitizeDOMData(subTitle?.content_editor || subTitle?.content)}
				</TextSSR>

				<Box sx={{ cursor: "pointer", textAlign: "center" }} my={14}>
					<Image
						src={DownArrorGif}
						alt="Scroll down arrows"
						width={56}
						height={56}
					/>
				</Box>
				{/* <CompanyList bordered /> */}
			</Box>
			<Line index={0} />

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

			<Line index={2} />

			<Box component="section" py={12}>
				<SectionHeading>
					Các gói đầu tư cổ phầm <b style={{ color: "#3CAEA4" }}>Startups</b>
				</SectionHeading>

				<Grid gutter="xl" align="stretch">
					{investmentTypes
						.sort((a, b) => +a.stt - +b.stt)
						.map((type, i) => (
							<Grid.Col span={12} md={6} key={i}>
								<InvestmentInfoCard
									title={
										type.text_field.find((el) => el.content_id === "title")
											?.content
									}
									iconUrl={type.pictures?.[0]?.picture_url}
									list={type?.text_field}
								/>
							</Grid.Col>
						))}
				</Grid>
			</Box>

			<HomeDownload />
		</Container>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web/san-pham/co-phan-startups"),
		() => fetchPageInfo("web/san-pham/co-phan-startups")
	);
	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web-home-download"),
		() => fetchPageInfo("web-home-download")
	);
	await queryClient.prefetchQuery(pageInfoKeys.detail("web-ecosystem"), () =>
		fetchPageInfo("web-ecosystem")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	};
};

export default CoPhanStartups;
