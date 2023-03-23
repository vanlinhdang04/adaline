import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import {
	AspectRatio,
	Badge,
	Box,
	Card,
	createStyles,
	List,
	Text,
} from "@mantine/core";
import Image from "next/image";
import ListIcon from "public/icons/list-icon-straight-arrow-primary.svg";
import ZenOneLogo from "public/images/logo.png";
import BtnShowMore from "./Button/BtnShowMore";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
	badge: {
		color: theme.colors.neutral[0],
		backgroundColor: theme.colors.main[5],
		// width: "fit-content",
		width: 110,
		borderRadius: 9,
		padding: "6px 0px",
		fontSize: 16,
		textAlign: "center",
		fontWeight: 500,
		display: "inline",
	},
	startupBadge: {
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
		transition: "background-color 400ms ease",
		"&:hover": {
			backgroundColor: theme.fn.darken(theme.colors.accent[2], 0.05),
			borderColor: "transparent",
			color: theme.white,
		},
	},
	paddingCard: {
		marginRight: 0,
	},
}));

export function CardWithImage({
	image,
	categoryName,
	content,
	onPress = undefined,
	productName,
	tenNhom,
	href = "/#/",
	isRunning,
	locale = "vi",
}) {
	const { classes, cx } = useStyles();

	const isRealEstate =
		categoryName.toLowerCase() === "Bất động sản".toLowerCase() ||
		categoryName.toLowerCase() === "Real estate".toLowerCase();

	const label = {
		vi: {
			comming: "Sắp ra mắt",
		},
		en: {
			comming: "Comming soon",
		},
	};

	return (
		<Card
			p={0}
			sx={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<Card.Section mb="sm">
				<AspectRatio ratio={272 / 282}>
					<Box
						sx={(theme) => ({
							borderRadius: 16,
							overflow: "hidden",
							transition: "0.5s",
							"& img": {
								transition: "0.5s",
							},
							"& img:hover": {
								transform: "matrix(1.5, 0, 0, 1.5, -50, -50)",
							},

							[theme.fn.smallerThan("md")]: {
								"& img:hover": {
									transform: "none",
								},
							},
						})}
					>
						<Image
							src={
								image
									? appendImageUrlFromAPI({
											src: image,
											size: "l",
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  })
									: ZenOneLogo
							}
							alt={""}
							layout="fill"
							objectFit={image ? "cover" : "contain"}
							priority
						/>
					</Box>
				</AspectRatio>
			</Card.Section>

			{categoryName && (
				<Box mt={4} sx={{ display: "flex", alignItems: "center" }}>
					<Text
						component="span"
						className={cx(classes.badge, {
							[classes.startupBadge]: !isRealEstate,
						})}
					>
						{categoryName}
					</Text>
					{!isRunning && (
						<Badge
							component="span"
							ml={8}
							sx={{ color: "#ffffff", minHeight: 24 }}
						>
							{label?.[locale]?.comming}
						</Badge>
					)}
				</Box>
			)}
			{/* {tenNhom && (
			)} */}
			<Text lineClamp={1} mt={6} size="sm" sx={{ minHeight: 25 }}>
				{tenNhom}
			</Text>
			{productName && (
				<Box mt={4} mb={12}>
					<Text
						component="span"
						lineClamp={2}
						size={20}
						weight={500}
						my="sm"
						sx={{ minHeight: 62, display: "inline" }}
					>
						{productName}
					</Text>
				</Box>
			)}

			<List>
				{content &&
					content.map(({ content, label }, index) => (
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
										width={14}
										height={14}
										layout="responsive"
									/>
								</Box>
							}
						>
							<Text size="sm">
								{String(label || content)
									.charAt(0)
									.toUpperCase() + String(label || content).slice(1)}
							</Text>
						</List.Item>
					))}
			</List>

			{onPress && (
				<Box sx={{ marginTop: "auto" }}>
					<BtnShowMore href={href} />
				</Box>
			)}
		</Card>
	);
}
