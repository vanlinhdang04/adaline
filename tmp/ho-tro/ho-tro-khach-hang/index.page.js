import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";

import Container from "@/common/MainLayout/Container";
import { Grid, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import hotro from "public/images/hotrokhachhang.png";
import React from "react";
import FormSP from "./components/FormSP";

const BrCrumb = {
	vi: [
		{ href: "/", title: "Trang chủ" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/ho-tro-khach-hang", title: "Hỗ trợ khách hàng" },
	],
	en: [
		{ href: "/", title: "Home" },
		// { href: "/ho-tro", title: "Hỗ trợ" },
		{ href: "/ho-tro/huong-dan-su-dung", title: "Customer support" },
	],
};
export default function HoTroKhachHang() {
	const { locale, asPath } = useRouter();
	React.useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const seo = {
		title: "Hỗ trợ khách hàng ZenOne",
		description: "",
		url: asPath,
		// picture1: data?.seo_image_1,
		// picture2: data?.seo_image_2,
	};

	return (
		<Container>
			<DefaultSEO seo={seo} />
			<AppBreadcrumbs items={BrCrumb[locale]} isLoading={false} />
			<Grid sx={{ marginBottom: 20 }}>
				<Grid.Col md={6} sx={{ margin: "auto" }} order={2} orderMd={1}>
					<Title
						order={1}
						size={24}
						weight={700}
						color={"#1C655E"}
						sx={{ paddingBottom: 20 }}
					>
						{" "}
						{locale == "vi"
							? "Liên hệ với chúng tôi ngay bây giờ, và chúng tôi sẵn sàng tư vấn cho bạn"
							: "Contact us now, and we are ready to advise you"}
					</Title>
					<FormSP></FormSP>
				</Grid.Col>
				<Grid.Col md={6} order={1} orderMd={2}>
					<div style={{ width: "100%" }}>
						<Image src={hotro} alt="hotro" layout="responsive"></Image>
					</div>
				</Grid.Col>
			</Grid>
		</Container>
	);
}
