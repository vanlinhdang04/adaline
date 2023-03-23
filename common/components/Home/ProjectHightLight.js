import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import useEmblaCarousel from "embla-carousel-react";
// import slugify from "@/utils/slugifyString";
import { useFetchProjectList } from "@/apis/queryFunctions/projects";
import slugify from "@/utils/slugifyString";
import { Center, createStyles, Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CardWithImage } from "../CardWithImage";
import HomeTitle from "../HomeTitle";

const useStyles = createStyles((theme) => ({
	title: {
		color: theme.primaryColor,
	},
	category: {
		color: theme.colors.neutral[0],
		backgroundColor: theme.colors.main[5],
		padding: "4px 8px",
		borderRadius: theme.radius.xs,
		width: "fit-content",
		fontSize: 16,
		fontWeight: 500,
		cursor: "pointer",
	},
	categorySecond: {
		color: theme.colors.main[5],
		backgroundColor: theme.colors.neutral[0],
	},
	titleHighLight: {
		color: theme.colors.main[1],
		fontWeight: 700,
	},
}));

const SectionTitle = ({ data, locale }) => {
	const { classes } = useStyles();
	const label = {
		vi: {
			bds: "Bất động sản",
			startups: "Startups",
		},
		en: {
			bds: "Real estate",
			startups: "Startups",
		},
	};

	return (
		<Center
			mt={15}
			mb={10}
			sx={(theme) => ({
				flexDirection: "column",
				[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
					paddingLeft: 7,
					paddingRight: 7,
				},
			})}
		>
			<HomeTitle>{sanitizeDOMData(data)}</HomeTitle>

			<Group mb={24}>
				<Link href="/san-pham/bat-dong-san" passHref>
					<Text component="a" className={classes.category}>
						{label?.[locale]?.bds}
					</Text>
				</Link>
				{/* <Link href="/san-pham/co-phan-zenone" passHref> */}
				<Link href="#/" passHref>
					<Text
						component="a"
						className={[classes.category, classes.categorySecond]}
					>
						{label?.[locale]?.startups}
					</Text>
				</Link>
			</Group>
		</Center>
	);
};

const ProjectHightLight = ({ data }) => {
	const { locale } = useRouter();
	const { text_field } = data || {};
	const { content_editor } =
		text_field?.find((el) => el.content_id === "title") || {};

	const { data: projectList } = useFetchProjectList({
		limit: 999,
		condition: {
			ma_loai_tin_tuc: "du-an-bat-dong-san",
			ngon_ngu: locale,
		},
		sort: {
			summary: 1,
		},
	});

	const a = projectList?.filter((el) => {
		const show =
			(getFieldFromFieldId("hien-trang-chu", "content_id", el.text_field)
				?.label || "false") === "true";
		return show;
	});
	// console.log("list ", a);

	//------------------------------------------------------------------
	const [sliderRef, sliderAPI] = useEmblaCarousel({
		align: "start",
		dragFree: false,
		draggable: true,
		active: true,
		breakpoints: {
			"(min-width: 992px)": { active: false },
		},
	});

	React.useEffect(() => {
		if (!sliderAPI) return;

		sliderAPI.reInit();
	}, [sliderAPI]);

	//------------------------------------------------------------------

	return (
		<>
			<SectionTitle data={content_editor} locale={locale} />

			<div className="embla-slider">
				<div className="embla-slider__viewport" ref={sliderRef}>
					<div className="embla-slider__container">
						{a
							// ?.sort((a, b) => a?.summary - b?.summary)
							?.slice(0, 4)
							?.map((item, index) => {
								const { text_field, title, ma_trang: productId } = item || {};

								const isRunning =
									(getFieldFromFieldId("running", "content_id", text_field)
										?.label || "false") === "true";

								const list = getFieldFromFieldId(
									"list-item",
									"content_id",
									text_field
								);

								let href = "";
								if (
									item?.text_1.toLowerCase() === "Bất động sản".toLowerCase() ||
									item?.text_1.toLowerCase() === "Real estate".toLowerCase()
								) {
									href = `/san-pham/bat-dong-san/${slugify(
										title + " " + productId
									)}`;
								}

								if (!isRunning) {
									href = "/#/";
								}

								return (
									<div key={String(index)} className="embla-slider__slide">
										<CardWithImage
											key={String(index)}
											categoryName={item?.text_1}
											productName={title}
											tenNhom={item?.text_2}
											content={list}
											image={
												item?.picture_1 || item?.picture_2 || item?.picture_3
											}
											href={href}
											onPress
											isRunning={isRunning}
											locale={locale}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</div>

			<style jsx>{`
				.embla-slider {
					position: relative;
					display: flex;
					justify-content: center;
				}
				.embla-slider__viewport {
					overflow: hidden;
					/* max-width: 428px; */
					padding: 0px 26px;
				}
				.embla-slider__container {
					user-select: none;
					-webkit-touch-callout: none;
					-khtml-user-select: none;
					-webkit-tap-highlight-color: transparent;
					display: grid;
					grid-auto-flow: column;
					grid-auto-columns: 85%;
					grid-gap: 30px;
				}

				@media (min-width: 768px) {
					.embla-slider__viewport {
						max-width: 768px;
						padding: 0 6%;
					}
					.embla-slider__container {
						grid-auto-columns: 44%;
					}
				}
				@media (min-width: 992px) {
					.embla-slider__container {
						grid-template-columns: 1fr 1fr 1fr 1fr;
					}
					.embla-slider__viewport {
						max-width: 1440px;
					}
				}
			`}</style>
		</>
	);
};

export default ProjectHightLight;
