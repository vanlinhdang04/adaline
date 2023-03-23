import { Box, Skeleton } from "@mantine/core";
import React from "react";

export default function DetailContent({ children, isLoading }) {
	if (isLoading)
		return (
			<Box>
				{Array(3)
					.fill(undefined)
					.map((item, k) => (
						<Box key={k} mb={24} pt={23}>
							<Skeleton height={40} width={"70%"} mb={24} />
							<Skeleton height={24} width="100%" mb={10} />
							<Skeleton height={24} width="100%" mb={10} />
							<Skeleton height={24} width="100%" mb={10} />
							<Skeleton height={24} width="100%" mb={10} />
							<Skeleton height={24} width="100%" mb={10} />
						</Box>
					))}
			</Box>
		);
	return (
		<Box
		// sx={(theme) => ({
		// 	padding: "38px 0 0",
		// 	[`@media (max-width: ${theme.breakpoints.md}px)`]: {
		// 		padding: "23px 0 0",
		// 	},
		// })}
		>
			<Box className="webview">
				<Box className="guide">{children}</Box>
			</Box>
		</Box>
	);
}
