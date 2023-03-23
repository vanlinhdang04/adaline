import {
	addtrackingEvent,
	TRACKING_NAMES,
	TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import qrcode from "public/images/qrcode.png";
import React from "react";
import AppStore from "./Download/AppStore";
import ChPlay from "./Download/ChPlay";
// import QrCode from "./Download/QrCode";

export default function DownloadApp({ banner, isStep = false }) {
	const isMobile = useMediaQuery("(max-width: 768px)");

	if (banner) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: isMobile ? "space-between" : "flex-start",
				}}
			>
				<div
					style={{ marginRight: 16 }}
					onClick={() => {
						addtrackingEvent({
							vi_tri: TRACKING_VI_TRI["TRANG-CHU"],
							field_id: TRACKING_NAMES["TRANG_CHU_Taiungdung_appstore"],
						});
					}}
				>
					<AppStore
						width={isStep ? 132 : isMobile ? 178 : 160}
						height={isStep ? 39 : isMobile ? 53 : 47}
					/>
				</div>
				<div
					onClick={() => {
						addtrackingEvent({
							vi_tri: TRACKING_VI_TRI["TRANG-CHU"],
							field_id: TRACKING_NAMES["TRANG_CHU_Taiungdung_android"],
						});
					}}
				>
					<ChPlay
						width={isStep ? 132 : isMobile ? 178 : 160}
						height={isStep ? 39 : isMobile ? 53 : 47}
					/>
				</div>
			</div>
		);
	}
	return (
		<div style={{ display: "flex", width: "100%" }}>
			<div>
				<div style={{ width: 86, height: 86, marginRight: 8 }}>
					<Image
						src={qrcode}
						alt="QR Code"
						width={86}
						height={86}
						//placeholder="blur"
					/>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div
					onClick={() => {
						addtrackingEvent({
							vi_tri: TRACKING_VI_TRI.MENU,
							field_id: TRACKING_NAMES["MENU_Taiungdung_appstore"],
						});
					}}
					style={{ display: "flex" }}
				>
					<AppStore width={142} height={42} />
				</div>
				<div
					onClick={() => {
						addtrackingEvent({
							vi_tri: TRACKING_VI_TRI.MENU,
							field_id: TRACKING_NAMES["MENU_Taiungdung_android"],
						});
					}}
					style={{ display: "flex" }}
				>
					<ChPlay width={142} height={42} />
				</div>
			</div>
		</div>
	);
}
