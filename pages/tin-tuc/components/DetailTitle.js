import { Title } from "@mantine/core";
import React from "react";

export default function DetailTitle({ children, ...etc }) {
	return (
		<Title
			order={1}
			sx={(theme) => ({
				fontSize: 36,
				color: theme.colors.neutral[0],
				fontWeight: "700",
				lineHeight: "48px",
				textAlign: "center",
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					fontSize: 22,
					lineHeight: "29px",
				},
			})}
			{...etc}
		>
			{/* <Text
				sx={(theme) => ({
					fontSize: 38,
					color: theme.colors.neutral[0],
					fontWeight: "700",
					lineHeight: "48px",
					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						fontSize: 22,
						lineHeight: "29px",
					},
				})}
				{...etc}
			> */}
			{children}
			{/* </Text> */}
		</Title>
	);
}
