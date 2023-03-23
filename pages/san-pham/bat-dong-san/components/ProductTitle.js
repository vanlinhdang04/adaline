import HomeTitle from "@/common/components/HomeTitle";
import Line from "@/common/components/Line";
import { Box, createStyles } from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	titleHighLight: {
		color: theme.colors.main[1],
		fontWeight: 600,
		// paddingLeft: 5,
	},
}));

function ProductTitle() {
	const { locale } = useRouter();
	const { classes } = useStyles();

	const label = {
		vi: {
			title: "Danh sách các bất động sản đầu tư cùng ",
		},
		en: {
			title: "List of properties to invest with ",
		},
	};
	return (
		<Box component="section" py={12}>
			<Line index={2} />
			<HomeTitle align="center">
				{label?.[locale]?.title}
				<span className={classes.titleHighLight}>ZenOne</span>
			</HomeTitle>
		</Box>
	);
}

export default ProductTitle;
