import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import BannerTextContent from "@/common/components/BannerTextContent";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DanhMuc from "@/common/components/DanhMuc";
import DefaultSEO from "@/common/components/DefaultSEO";
import SectionHeading from "@/common/components/Heading/SectionHeading";
import HomeDownload from "@/common/components/HomeDownload";
import InvestmentInfoCard from "@/common/components/InvestmentInfoCard";
import Line from "@/common/components/Line";
import Video from "@/common/components/Video";
import Container from "@/common/MainLayout/Container";
import compareVietnameseString from "@/utils/compareVietnameseString";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

function CoPhanZenOne() {
	const { asPath } = useRouter();
	const { data: pageContent } = useFetchPageInfo("web/san-pham/zenone");
	const [selected, setSelected] = React.useState(null);

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
	const SectionHeading3 = getFieldFromFieldId(
		"section-3-title",
		"content_id",
		pageContent?.text_field
	);

	const investmentTypes = pageContent?.add_on_4 || [];

	const { text_field: newsArticles } =
		pageContent?.add_on_5?.find((el) => el?.id === "news") || [];

	React.useEffect(() => {
		if (!newsArticles?.length) return;

		setSelected(newsArticles?.[0]?.label);
	}, [newsArticles?.length]);

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
						{ title: "Sản phẩm", href: "#" },
						{ title: "Cổ phần ZenOne", href: "/san-pham/co-phan-zenone" },
					]}
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
			<Line index={0} />

			<Box component="section">
				<SectionHeading>
					{sanitizeDOMData(
						SectionHeading2?.content_editor || SectionHeading2?.content
					)}
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

			<Line index={2} />

			<Box component="section" py={12}>
				<SectionHeading>
					{sanitizeDOMData(
						SectionHeading3?.content_editor || SectionHeading3?.content
					)}
				</SectionHeading>

				<Grid gutter={30}>
					<Grid.Col span={0} md={4}>
						<DanhMuc
							list={newsArticles
								?.sort((a, b) => a?.stt - b?.stt)
								.map((el) => el.label)}
							selected={selected}
							setSelected={setSelected}
						/>
					</Grid.Col>
					<Grid.Col span={12} md={8}>
						<div className="webview">
							{sanitizeDOMData(
								newsArticles?.find((el) =>
									compareVietnameseString(el.label, selected)
								)?.content_editor
							)}
						</div>
					</Grid.Col>
				</Grid>
			</Box>

			<HomeDownload />
		</Container>
	);
}

export const getStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web/san-pham/zenone"),
		() => fetchPageInfo("web/san-pham/zenone")
	);
	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web-home-download"),
		() => fetchPageInfo("web-home-download")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	};
};

export default CoPhanZenOne;
