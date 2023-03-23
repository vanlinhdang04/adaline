import { Box, Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import imgLine1 from "public/icons/line_1.png";
import imgLine2 from "public/icons/line_2.png";
import imgLine3 from "public/icons/line_3.png";
import React from "react";

export default function Line({ index = 0 }) {
	const isMobile = useMediaQuery("(max-width: 992px)");
	const list = [
		{
			src: imgLine1,
			width: 388,
			height: 38,
			mWidth: 184,
			mHeight: 31,
		},
		{
			src: imgLine2,
			width: 388,
			height: 38,
			mWidth: 184,
			mHeight: 31,
		},
		{
			src: imgLine3,
			width: 388,
			height: 65,
			mWidth: 184,
			mHeight: 31,
		},
	];
	return (
		<Center
			sx={(theme) => ({
				margin: "60px auto 30px",
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					margin: "24px auto",
				},
			})}
		>
			<Box
				sx={(theme) => ({
					// display: "flex",
					// justifyContent: "center",
					// alignItems: "center",
					position: "relative",

					width: list[index].width,
					height: list[index].height,
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						width: list[index].mWidth,
						height: list[index].mHeight,
					},
				})}
			>
				<Image
					src={list[index].src}
					alt="line"
					width={isMobile ? list[index].mWidth : list[index].width}
					height={isMobile ? list[index].mHeight : list[index].height}
					// layout="fill"
					objectFit="fill"
					//placeholder="blur"
					// blurDataURL={`https://via.placeholder.com/${list[index].width}x${list[index].height}`}
				/>
			</Box>
		</Center>
	);
}
