import { Text } from "@mantine/core";
import React from "react";

export default function AboutTitle({ children, ...etc }) {
	return (
		<Text
			sx={(theme) => ({
				fontWeight: "500",
				fontSize: 34,
				color: theme.colors.neutral[0],
				lineHeight: "44px",
				margin: "6px 0 12px",

				"&:first-letter": {
					textTransform: "capitalize",
				},
				[`@media (max-width: ${theme.breakpoints.md}px)`]: {
					fontSize: 22,
					margin: "4px 0 8px",
					lineHeight: "35px",
				},
			})}
			{...etc}
		>
			{children}
		</Text>
	);
}
