import FilterIcon from "@/public/icons/filter-type.png";
import { Box, createStyles, Grid, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const useStyles = createStyles((theme) => ({
	boxType: {
		borderColor: theme.colors.main,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 16,
		padding: 18,
		height: "fit-content",
	},
	flexRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	titleProductType: {
		borderColor: theme.colors.neutral[3],
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: theme.radius.xs,
		padding: 5,
		color: theme.colors.neutral[2],
		fontSize: 16,
		fontWeight: 500,
	},
	activeProductTitleProductType: {
		borderColor: theme.colors.neutral[3],
		color: theme.colors.main,
		backgroundColor: theme.colors.neutral[0],
	},
	buttonFilter: {
		borderColor: theme.colors.neutral[3],
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: theme.radius.xs,
		color: theme.colors.neutral[2],
		fontSize: 16,
		fontWeight: 500,
		width: "100%",
		backgroundColor: theme.colors.neutral[0],
		"&:hover": {
			backgroundColor: theme.colors.main[5],
		},
	},
	titleButton: {
		color: theme.colors.main[5],
		fontSize: 16,
		fontWeight: 500,
		textAlign: "center",
		width: "100%",
		padding: 5,
		"&:hover": {
			color: theme.colors.neutral[0],
		},
	},
}));

function ProductType({
	listProductType,
	active,
	setActive,
	setActiveWithButon,
}) {
	// console.log("active", active);
	const { classes, cx } = useStyles();
	const { locale } = useRouter();

	const label = {
		vi: {
			title: "Bộ lọc",
			btn: "Tìm kiếm",
		},
		en: {
			title: "Filter",
			btn: "Search",
		},
	};

	return (
		<Grid.Col xs={12} lg={3}>
			{/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
			<Box className={classes.boxType}>
				<Box className={classes.flexRow}>
					<Image src={FilterIcon} alt="ProductTypeIcon" />
					<Text>{label?.[locale]?.title}</Text>
				</Box>
				<Grid grow sx={{ gap: 10 }} m={0} my={10}>
					{listProductType
						?.filter((item) => item?.ma_loai !== "Cổ phần")
						?.map((item, index) => (
							<UnstyledButton
								className={cx(classes.titleProductType, {
									[classes.activeProductTitleProductType]:
										active?.indexOf(item?.label) >= 0,
								})}
								key={index}
								onClick={() =>
									setActive((prev) =>
										prev?.indexOf("Tất cả") >= 0
											? item?.label === "Tất cả"
												? [...prev]
												: [item?.label]
											: item?.label === "Tất cả"
											? [item?.label]
											: prev?.indexOf(item?.label) >= 0
											? prev?.length <= 1
												? [...prev]
												: [
														...(prev?.filter((el) => el !== item?.label) || []),
														// eslint-disable-next-line no-mixed-spaces-and-tabs
												  ]
											: [...prev, item?.label]
									)
								}
							>
								<Text>{item.content}</Text>
							</UnstyledButton>
						))}
				</Grid>
				<UnstyledButton
					className={classes.buttonFilter}
					onClick={() =>
						setActiveWithButon(
							active?.indexOf("Tất cả") >= 0
								? listProductType?.reduce((arr, curr) => {
										arr.push(curr?.label);
										return arr;
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }, [])
								: active
						)
					}
				>
					<Text className={classes.titleButton}>{label?.[locale]?.btn}</Text>
				</UnstyledButton>
			</Box>
		</Grid.Col>
	);
}

export default ProductType;
