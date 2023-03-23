import { Box } from "@mantine/core";
import Image from "next/image";
import arrowLeft from "public/icons/slider_arrowLeft.png";
import arrowRight from "public/icons/slider_arrowRight.png";
import React from "react";

export function SliderArrowLeft({ onClick }) {
	return (
		<Box
			sx={(theme) => ({
				position: "absolute",
				zIndex: 99,
				top: "50%",
				transform: "translateY(-50%)",
				left: "5%",
				cursor: "pointer",
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					top: "50%",
					left: "-5%",
				},
				[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
					top: "30%",
					left: "0px",
				},
			})}
		>
			<Box
				onClick={onClick}
				sx={{
					width: 37,
					height: 37,
					transition: "0.3s",
					"&:hover": {
						transform: "scale(1.1, 1.1)",
					},
				}}
			>
				<Image src={arrowLeft} alt="left" width={37} height={37} />
			</Box>
		</Box>
	);
}
export function SliderArrowRight({ onClick }) {
	return (
		<Box
			sx={(theme) => ({
				position: "absolute",
				zIndex: 99,
				top: "50%",
				transform: "translateY(-50%)",
				right: "5%",
				cursor: "pointer",
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					top: "50%",
					right: "-5%",
				},
				[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
					top: "30%",
					right: "0px",
				},
			})}
		>
			<Box
				onClick={onClick}
				sx={{
					width: 37,
					height: 37,
					transition: "0.3s",
					"&:hover": {
						transform: "scale(1.1, 1.1)",
					},
				}}
			>
				<Image
					src={arrowRight}
					alt="left"
					width={37}
					height={37}
					layout="responsive"
				/>
			</Box>
		</Box>
	);
}
