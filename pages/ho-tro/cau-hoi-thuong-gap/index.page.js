import {
	fetchPageInfo,
	useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import FAQ from "@/common/components/FAQ";
import Container from "@/common/MainLayout/Container";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
const BrCrumb = {
	vi: [
		{ href: "/", title: "Trang chủ" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/cau-hoi-thuong-gap", title: "Câu hỏi thường gặp" },
	],
	en: [
		{ href: "/", title: "Home" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/cau-hoi-thuong-gap", title: "Frequently asked questions" },
	],
};
export default function FAQPage() {
	const { locale, asPath } = useRouter();
	const { data } = useFetchPageInfo("web-hoi-dap", {
		condition: { ngon_ngu: locale },
	});
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

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
			<FAQ isPage={true} data={data}></FAQ>
		</Container>
	);
}
export async function getStaticProps() {
	const queryClient = new QueryClient();

	// PAGE INFO
	await queryClient.prefetchQuery(pageInfoKeys.detail("web-hoi-dap"), () =>
		fetchPageInfo("web-hoi-dap")
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60, // In seconds
	};
}
