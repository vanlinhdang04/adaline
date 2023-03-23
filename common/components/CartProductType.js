import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import {
	AspectRatio,
	Badge,
	Box,
	Card,
	createStyles,
	Grid,
	List,
	Text,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";

import ListIcon from "public/icons/list-icon-straight-arrow-primary.svg";
const useStyles = createStyles((theme) => ({
	card: {
		position: "relative",
		cursor: "pointer",
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		transition: ["all 0.4s"],
		[`&:hover`]: {
			transform: "translateY(-18px)",
			boxShadow: `20px 20px 40px rgba(43, 223, 206, 0.3)`,
		},
	},

	rating: {
		position: "absolute",
		top: theme.spacing.xs,
		right: theme.spacing.xs + 2,
		pointerEvents: "none",
	},

	title: {
		display: "block",
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.xs / 2,
	},

	action: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},

	footer: {
		marginTop: theme.spacing.md,
	},
	itemDescription: {
		flexDirection: "row",
		display: "flex",
		flex: 1,
		alignItems: "center",
	},
}));

export function CartHome({
	className,
	imageUrl,
	title,
	listItems,
	isRunning,
	...others
}) {
	const { locale } = useRouter();
	const { classes, cx } = useStyles();

	const label = {
		vi: "Sắp ra mắt",
		en: "Coming soon",
	};

	// const linkProps = {
	//   href: link,
	//   target: "_blank",
	//   rel: "noopener noreferrer",
	// };

	return (
		<Card
			withBorder
			radius={13}
			className={cx(classes.card, className)}
			spacing="md"
			p={38}
			// component="a"
			sx={{
				height: "100%",
			}}
			{...others}
		>
			<Card.Section>
				<AspectRatio ratio={382 / 168}>
					<Image
						src={appendImageUrlFromAPI({ src: imageUrl, size: "m" })}
						alt={title}
						layout="fill"
						objectFit="cover"
						priority
					/>
				</AspectRatio>
			</Card.Section>
			<Grid py={15} m={0} align="center">
				<Text weight={500}>{uppercaseFirstLetter(title)}</Text>
				{!isRunning && (
					<Badge ml={5} sx={{ color: "#ffffff" }}>
						{label?.[locale]}
					</Badge>
				)}
			</Grid>

			<List>
				{listItems?.map((text, index) =>
					index === 0 ? (
						<Text size="sm" mb={6} key={index}>
							{String(text).charAt(0).toUpperCase() + String(text).slice(1)}
						</Text>
					) : (
						<List.Item
							mb={6}
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
										// width={14}
										// height={14}
										src={ListIcon}
										alt="vector Top right"
										layout="fill"
									/>
								</Box>
							}
						>
							<Text size="sm">
								{String(text).charAt(0).toUpperCase() + String(text).slice(1)}
							</Text>
						</List.Item>
					)
				)}
				{/* {listItems.map((text, index) => (
					<List.Item
						mb={6}
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
									layout="fill"
								/>
							</Box>
						}
					>
						<Text size="sm">
							{String(text).charAt(0).toUpperCase() + String(text).slice(1)}
						</Text>
					</List.Item>
				))} */}
			</List>
		</Card>
	);
}
