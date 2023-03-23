import { asyncGetList } from "@/apis/fetch";
import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DanhMuc from "@/common/components/DanhMuc";
import DefaultSEO from "@/common/components/DefaultSEO";
import HomeTitle from "@/common/components/HomeTitle";
import Container from "@/common/MainLayout/Container";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import { Center, Grid, Title } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
const BrCrumb = {
	vi: [
		{ href: "/", title: "Trang chủ" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/dieu-khoan-su-dung", title: "Điều khoản sử dụng" },
	],
	en: [
		{ href: "/", title: "Home" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/dieu-khoan-su-dung", title: "Terms of use" },
	],
};
export default function DieuKhoan() {
	const [list, setList] = React.useState(null);
	// const router = useRouter();
	// console.log(router.query.keyword);
	const [selected, setSelected] = React.useState("điều khoản sử dụng");
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	const { locale, asPath } = useRouter();
	const { data } = useFetchPageInfo("web-dieu-khoan", {
		condition: { ngon_ngu: locale },
	});
	const [option, setOption] = React.useState(null);
	React.useEffect(() => {
		let arr = [];

		data &&
			data.add_on_4
				?.filter((el) => el.shared)
				.sort((a, b) => a?.stt - b?.stt)
				.map((item) => {
					arr.push(item.id);
					if (item.label == "dieu-khoan-su-dung-1") {
						setSelected(item.id);
					}
				});
		setOption(arr);
	}, [data]);
	React.useEffect(() => {
		data &&
			data.add_on_4?.map((item) => {
				if (item.id == selected) {
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
						{selected} <span style={{ color: "#3CAEA4" }}>App ZenOne</span>
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
	await queryClient.prefetchQuery(pageInfoKeys.detail("web-dieu-khoan"), () =>
		fetchPageInfo("web-dieu-khoan")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60, // In seconds
	};
}
