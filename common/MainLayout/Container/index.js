import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
	root: {
		padding: "0 6%",
		// minWidth: "1200px",
		maxWidth: 1440,
		margin: "0 auto",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			// padding: "0 26px",
			maxWidth: "768px",
		},
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: "0 26px",
			maxWidth: "428px",
		},
	},
	newsContainer: {
		maxWidth: "923px",
		margin: "0 auto",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			maxWidth: "768px",
		},
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: "auto",
		},
	},
	detailContainer: {
		maxWidth: "606px",
		margin: "0 auto",

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			maxWidth: "auto",
		},
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: "auto",
		},
	},
}));

export default function Container({ children, ...style }) {
	const { classes } = useStyles();
	return (
		<div
			// size={"100%"}
			// px={0}
			// mx={99}
			className={classes.root}
			{...style}
		>
			{children}
		</div>
	);
}

export function NewsContainer({ children, ...style }) {
	const { classes } = useStyles();
	return (
		<div
			// size={"100%"}
			// px={0}
			// mx={99}
			className={classes.newsContainer}
			{...style}
		>
			{children}
		</div>
	);
}
export function DetailContainer({ children, ...style }) {
	const { classes } = useStyles();
	return (
		<div
			// size={"100%"}
			// px={0}
			// mx={99}
			className={classes.detailContainer}
			{...style}
		>
			{children}
		</div>
	);
}
