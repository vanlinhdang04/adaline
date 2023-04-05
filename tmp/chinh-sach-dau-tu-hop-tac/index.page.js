import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DanhMuc from "@/common/components/DanhMuc";
import DefaultSEO from "@/common/components/DefaultSEO";
import Container from "@/common/MainLayout/Container";

import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Grid, Title } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
const BrCrumb = {
	vi: [
		{ href: "/", title: "Trang chủ" },
		{
			href: "/chinh-sach-dau-tu-hop-tac",
			title: "Chính sách đầu tư/hợp tác",
		},
	],
	en: [
		{ href: "/", title: "Home" },
		{
			href: "/chinh-sach-dau-tu-hop-tac",
			title: "Investment/cooperation policy",
		},
	],
};
export default function ChinhSach() {
	const [list, setList] = React.useState(null);
	const { locale, asPath } = useRouter();
	const router = useRouter();

	const [selected, setSelected] = React.useState(
		"chính sách đầu tư bất động sản"
	);
	const { data } = useFetchPageInfo("web-chinh-sach", {
		condition: { ngon_ngu: locale },
	});
	// console.log(data);
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		router.query.keyword &&
			data &&
			data.add_on_4
				?.filter((el) => el.shared)
				.sort((a, b) => a?.stt - b?.stt)
				.map((item) => {
					if (item.label == router.query.keyword) {
						setSelected(item.id);
					}
				});
	}, [router.query, data]);

	const [option, setOption] = React.useState(null);
	React.useEffect(() => {
		let arr = [];
		data &&
			data.add_on_4
				?.filter((el) => el.shared)
				.sort((a, b) => a?.stt - b?.stt)
				.map((item) => {
					arr.push(item.id);
				});
		setOption(arr);
	}, [data]);
	React.useEffect(() => {
		data &&
			data.add_on_4
				?.filter((el) => el.shared)
				.sort((a, b) => a?.stt - b?.stt)
				.map((item) => {
					if (item.id == selected.toLowerCase()) {
						setList(item);
					}
				});
	}, [data, selected]);

	const seo = {
		title: data?.seo_title,
		description: data?.seo_description,
		picture1: data?.seo_image_1,
		picture2: data?.seo_image_2,
		url: asPath,
	};

	return (
		<Container>
			<DefaultSEO seo={seo} />
			<AppBreadcrumbs items={BrCrumb[locale]} isLoading={false} />
			<Grid>
				<Grid.Col md={3}></Grid.Col>
				<Grid.Col md={9}>
					<Title
						order={1}
						align="center"
						sx={(theme) => ({
							fontSize: 36,
							// marginBottom: 40,
							fontWeight: "700",
							margin: "30px 0",
							"&:first-letter": {
								textTransform: "capitalize",
							},
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								textAlign: "center",
								fontSize: 24,
								marginBottom: 16,
							},
						})}
					>
						{selected}
						<span style={{ color: "#3CAEA4" }}> ZenOne</span>
					</Title>
				</Grid.Col>
			</Grid>

			<Grid
				sx={(theme) => ({
					paddingBottom: 55,
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						paddingBottom: 30,
					},
				})}
			>
				<Grid.Col md={3}>
					<DanhMuc
						list={option}
						selected={selected}
						setSelected={setSelected}
					></DanhMuc>
				</Grid.Col>
				<Grid.Col md={9}>
					{/* <div className="webview">{list && list?.text_field[0]?.content}</div> */}
					<div className="webview">
						{list && sanitizeDOMData(list?.text_field[0]?.content_editor)}
					</div>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
export async function getStaticProps() {
	const queryClient = new QueryClient();

	// PAGE INFO
	await queryClient.prefetchQuery(pageInfoKeys.detail("web-chinh-sach"), () =>
		fetchPageInfo("web-chinh-sach")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60, // In seconds
	};
}
