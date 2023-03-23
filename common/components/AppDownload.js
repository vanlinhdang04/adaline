import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, SimpleGrid, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import imgArrow from "public/icons/backarrow.png";
import imgLogo from "public/images/logo.png";
import React from "react";
import AppStore from "./Download/AppStore";
import ChPlay from "./Download/ChPlay";

function AppDownload() {
	const { locale } = useRouter();
	const { data } = useFetchPageInfo("web-home-download");
	const imgQrCode = data?.pictures?.filter((x) => x.picture_id === "qr-code")[0]
		?.picture_url;

	const label = {
		vi: {
			text: "Quét mã tải App",
		},
		en: {
			text: "Scan QR Code",
		},
	};

	return (
		<div style={{ maxWidth: 465 }}>
			{/* <Box
				sx={(theme) => ({
					border: `1px solid ${theme.colors.accent[2]}`,
					borderRadius: 6,
					padding: "30px 40px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						padding: "24px 30px",
					},
				})}
			>
				<SimpleGrid cols={2}>
					<SimpleGrid cols={1}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<div>
								<Image
									src={imgLogo}
									alt="Logo"
									width={189}
									height={84}
									objectFit="cover"
									layout="responsive"
								/>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginTop: 20,
								}}
							>
								<Text size={"md"} weight={600}>
									{label?.[locale]?.text}
								</Text>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<Image
										src={imgArrow}
										alt="arrow"
										width={43}
										height={37}
										layout="intrinsic"
									/>
								</Box>
							</div>
						</Box>
					</SimpleGrid>
					<SimpleGrid cols={1}>
						<Image
							src={appendImageUrlFromAPI({ src: imgQrCode })}
							alt="QrCode"
							width={163}
							height={163}
							layout="responsive"
							blurDataURL="https://via.placeholder.com/185"
							objectFit="contain"
						/>
					</SimpleGrid>
				</SimpleGrid>
			</Box> */}
			<div style={{ marginTop: 13 }}>
				<SimpleGrid cols={2}>
					<AppStore width={226} height={66} />
					<ChPlay width={226} height={66} />
				</SimpleGrid>
			</div>
		</div>
	);
}

export default AppDownload;
