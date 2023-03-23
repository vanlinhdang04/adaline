import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import imgChPlay from "public/images/chplay.png";
import React from "react";

export default function ChPlay({ width, height }) {
	const { locale } = useRouter();
	const { data } = useFetchPageInfo("web-home-download", {
		condition: { ngon_ngu: locale },
	});

	const imgQrCode = data?.pictures?.filter(
		(x) => x.picture_id === "qrcode-ch-play"
	)[0]?.picture_url;

	return (
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box style={{ display: "flex" }}>
				<Image
					src={appendImageUrlFromAPI({ src: imgQrCode, size: "m" })}
					alt="QR Download on AppStore"
					width={width}
					height={width}
					layout="intrinsic"
				/>
			</Box>
			<Link
				href={"https://play.google.com/store/apps/details?id=app.zenone"}
				passHref
			>
				<a target={"_blank"} style={{ lineHeight: "0px" }}>
					<Image
						src={imgChPlay}
						alt="AppStore"
						width={width}
						height={height}
						layout="intrinsic"
						blurDataURL="https://via.placeholder.com/226x66"
						objectFit="contain"
					/>
				</a>
			</Link>
		</Box>
	);
}
