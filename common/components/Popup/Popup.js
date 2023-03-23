import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, Divider, Modal, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import iconClose from "public/icons/close_icon.png";
import React from "react";
import AppStore from "../Download/AppStore";
import ChPlay from "../Download/ChPlay";

export default function Popup() {
	const { locale } = useRouter();
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [open, setOpen] = React.useState(false);
	const { data } = useFetchPageInfo("web-home-download");
	const imgQrCode = data?.pictures?.filter((x) => x.picture_id === "qr-code")[0]
		?.picture_url;
	// const ttl = 900000;
	// const now = dayjs().valueOf();
	const label = {
		vi: {
			title: "Tải App tại đây",
			subTitle: "Hoặc Scan QR Code",
		},
		en: {
			title: "Download the App here",
			subTitle: "Or Scan QR Code",
		},
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		// window.localStorage.setItem("popup_expiry", now + ttl);
		sessionStorage.setItem("popup_expiry", "close");
		setOpen(false);
	};

	React.useEffect(() => {
		if (typeof window === "undefined") return undefined;
		// const popup_expiry = window.localStorage.getItem("popup_expiry") || 0;
		const popup_expiry = sessionStorage.getItem("popup_expiry") || "open";
		// if (now > popup_expiry) {
		// 	handleOpen();
		// }
		if (popup_expiry === "open") {
			handleOpen();
		}
	}, []);

	return (
		<Modal
			opened={open}
			onClose={handleClose}
			size={878}
			styles={{
				header: {
					marginBottom: 0,
					display: "none",
				},
				modal: {
					marginTop: 75,
					padding: "0px !important",
				},
			}}
			// centered
		>
			<Box>
				<Box
					sx={(theme) => ({
						padding: "20px 28px",

						display: "flex",
						justifyContent: "flex-end",
						[theme.fn.smallerThan("md")]: {
							padding: "18px",
						},
					})}
				>
					<Box
						sx={(theme) => ({
							position: "relative",
							width: 25,
							height: 25,
							cursor: "pointer",

							[theme.fn.smallerThan("md")]: {
								width: 17,
								height: 17,
							},
						})}
						onClick={handleClose}
					>
						<Image
							src={iconClose}
							alt="close"
							layout="fill"
							style={{ cursor: "pointer" }}
						/>
					</Box>
				</Box>
				<Stack
					align={"center"}
					justify="center"
					spacing={20}
					sx={(theme) => ({
						padding: "0 138px 81px",

						[theme.fn.smallerThan("md")]: {
							padding: "0 42px 58px",
						},
					})}
				>
					<Text
						weight={400}
						align="center"
						color={"#001529"}
						sx={(theme) => ({
							fontSize: 36,

							[theme.fn.smallerThan("md")]: {
								fontSize: 20,
							},
						})}
					>
						{label?.[locale]?.title}
					</Text>
					<div
						style={{
							display: "flex",
							justifyContent: isMobile ? "space-between" : "flex-start",
						}}
					>
						<div style={{ marginRight: 16 }}>
							<AppStore
								width={isMobile ? 141 : 291}
								height={isMobile ? 42 : 86}
							/>
						</div>
						<div>
							<ChPlay
								width={isMobile ? 141 : 291}
								height={isMobile ? 42 : 86}
							/>
						</div>
					</div>
					{/* <Divider color={"dark"} sx={{ maxWidth: 284, width: "100%" }} />
					<Text
						weight={400}
						align="center"
						color={"#001529"}
						sx={(theme) => ({
							fontSize: 36,

							[theme.fn.smallerThan("md")]: {
								fontSize: 20,
							},
						})}
					>
						{label?.[locale]?.subTitle}
					</Text>
					<Box
						sx={(theme) => ({
							width: 185,
							height: 185,
							position: "relative",
							[theme.fn.smallerThan("md")]: {
								width: 105,
								height: 105,
							},
						})}
					>
						<Image
							src={appendImageUrlFromAPI({ src: imgQrCode, size: "s" })}
							alt="QR Code"
							layout="fill"
							quality={70}
							priority
							//placeholder="blur"
							// blurDataURL="https://via.placeholder.com/185"
						/>
					</Box> */}
				</Stack>
			</Box>
		</Modal>
	);
}
