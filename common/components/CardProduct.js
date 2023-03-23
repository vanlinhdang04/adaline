import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import {
	AspectRatio,
	BackgroundImage,
	Badge,
	Box,
	Card,
	createStyles,
	List,
	Text,
	useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import ListIcon from "public/icons/list-icon-straight-arrow-primary.svg";
import StarIcon from "public/icons/star.png";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		marginRight: 31,
	},

	title: {
		color: theme.colors.neutral[0],
		fontSize: 20,
		fontWeight: 600,
	},

	footer: {
		padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
		marginTop: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	realEstates: {
		color: theme.colors.main[5],
		backgroundColor: theme.colors.neutral[0],
	},
	button: {
		height: 42,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 13,
		borderColor: `${theme.colors.neutral[3]}`,
		borderWidth: 1,
		borderStyle: "solid",
		color: theme.colors.neutral[3],
		fontSize: 14,
		fontWeight: 600,
		"&:hover": {
			backgroundColor: theme.fn.darken(theme.colors.accent[2], 0.05),
			borderWidth: 0,
			color: theme.white,
		},
	},
	paddingCard: {
		marginRight: 0,
	},
	badge: {
		flexDirection: "row",
		bottom: 10,
		left: 10,
		position: "absolute",
		display: "flex",
		alignItems: "center",
		gap: 6,
		backgroundColor: theme.colors.accent[21],
		borderRadius: theme.radius.xs,
		// height: 25,
		padding: "2px 9px",
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			padding: "0 7px",
			gap: 3,
		},
	},
	comming: {
		flexDirection: "row",
		bottom: 10,
		right: 10,
		position: "absolute",
	},
}));

export function CardProduct({ data }) {
	const { classes } = useStyles();
	const theme = useMantineTheme();
	const { locale } = useRouter();
	const { text_field } = data || {};

	// const projectName =
	// 	getFieldFromFieldId("title", "content_id", text_field)?.label || "";
	const title =
		getFieldFromFieldId("ten-nhom", "content_id", text_field)?.label || "";
	const projectName =
		getFieldFromFieldId("title", "content_id", text_field)?.label || "";
	const list = getFieldFromFieldId("list-item", "content_id", text_field);
	const isHot =
		(getFieldFromFieldId("hot", "content_id", text_field)?.label || "false") ===
		"true";
	const isRunning =
		(getFieldFromFieldId("running", "content_id", text_field)?.label ||
			"false") === "true";

	const label = {
		vi: {
			hot: "Dự án hot",
			comming: "Sắp ra mắt",
		},
		en: {
			hot: "Trending",
			comming: "Sắp ra mắt",
		},
	};

	return (
		<Card p={0}>
			<Card.Section mb="sm">
				<AspectRatio ratio={272 / 282}>
					<BackgroundImage
						src={
							data?.picture_1
								? appendImageUrlFromAPI({
										src: data?.picture_1 || data?.picture_2 || data?.picture_3,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  })
								: "https://via.placeholder.com/272x282"
						}
						alt={title}
						radius={13}
					>
						{isHot && (
							<Box className={classes.badge}>
								{/* <AiFillStar size={14} color="#fff" /> */}
								<Box
									sx={(theme) => ({
										position: "relative",
										width: 16,
										height: 16,

										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											width: 10,
											height: 10,
										},
									})}
								>
									<Image src={StarIcon} alt="star icon" layout="fill" />
								</Box>
								<Text
									size={14}
									weight={800}
									color={theme.white}
									sx={(theme) => ({
										fontSize: 14,
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											fontSize: 10,
										},
									})}
								>
									{label?.[locale]?.hot}
								</Text>
							</Box>
						)}
						{!isRunning && (
							<Box className={classes.comming}>
								<Badge
									component="span"
									ml={8}
									sx={{ color: "#ffffff", minHeight: 24 }}
								>
									{label?.[locale]?.comming}
								</Badge>
							</Box>
						)}
					</BackgroundImage>
				</AspectRatio>
			</Card.Section>
			{title && <Text lineClamp={1}>{title}</Text>}
			{(data?.title || projectName) && (
				<Text
					lineClamp={3}
					size={18}
					weight={500}
					mt={8}
					mb={4}
					sx={{ minHeight: 56 }}
				>
					{data?.title || projectName}
				</Text>
			)}
			<List>
				{list &&
					list.map(({ label, content_editor }, index) => (
						<List.Item
							mb={2}
							key={index}
							icon={
								<Box
									sx={{
										width: 14,
										height: 14,
										position: "relative",
										marginTop: 6,
									}}
								>
									<Image
										src={ListIcon}
										alt="vector Top right"
										// width={14}
										// height={14}
										layout="fill"
									/>
								</Box>
							}
						>
							<Text size="sm">
								{String(content_editor || label)
									.charAt(0)
									.toUpperCase() + String(content_editor || label).slice(1)}
							</Text>
						</List.Item>
					))}
			</List>
		</Card>
	);
}
