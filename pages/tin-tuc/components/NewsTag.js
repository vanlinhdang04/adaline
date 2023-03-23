import { Box } from "@mantine/core";
import React from "react";

export default function NewsTag({ active = false, children, ...etc }) {
	return (
		<Box
			sx={{
				background: active ? "#001529" : "#FFFFFF",
				color: active ? "#A8EFEB" : "#414141",
				border: active ? "1px solid #001529" : "1px solid #ADB4BB",
				fontSize: 16,
				fontWeight: 500,
				padding: "8px 9px",
				borderRadius: 7,
				cursor: "pointer",
			}}
			{...etc}
		>
			{children}
		</Box>
	);
}
