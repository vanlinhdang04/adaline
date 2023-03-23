/* eslint-disable no-mixed-spaces-and-tabs */
import { useFetchNewsArticles } from "@/apis/queryFunctions/news";
import NewsCard from "@/pages/tin-tuc/components/NewsCard";
import { Carousel } from "@mantine/carousel";
import { Box, Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

export default function Related({ title, options, pathname }) {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const { data } = useFetchNewsArticles(options);
	return (
		data?.length > 0 && (
			<Box>
				<Text
					align="center"
					sx={(theme) => ({
						fontSize: 36,
						color: theme.colors.neutral[0],
						fontWeight: "400",
						lineHeight: "56px",
						marginBottom: 24,
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							fontSize: 24,
							lineHeight: "29px",
							marginBottom: 16,
						},
					})}
				>
					{title}
				</Text>
				{isMobile ? (
					<Carousel
						sx={{ width: "100%" }}
						slideSize={"80%"}
						slideGap={30}
						withControls={false}
						align="start"
					>
						{data
							? data.map((item, k) => (
									<Carousel.Slide key={k}>
										<Box sx={{ width: "100%" }}>
											<NewsCard data={item} pathname={pathname} />
										</Box>
									</Carousel.Slide>
							  ))
							: Array(3)
									.fill(undefined)
									.map((item, k) => (
										<Carousel.Slide key={k}>
											<Box sx={{ width: "100%" }}>
												<NewsCard data={item} isLoading={true} />
											</Box>
										</Carousel.Slide>
									))}
					</Carousel>
				) : (
					<Grid>
						{data
							? data.map((item, k) => (
									<Grid.Col key={k} xs={12} sm={4}>
										<NewsCard data={item} pathname={pathname} />
									</Grid.Col>
							  ))
							: Array(3)
									.fill(undefined)
									.map((item, k) => (
										<Grid.Col key={k} xs={12} sm={4}>
											<NewsCard data={item} isLoading={true} />
										</Grid.Col>
									))}
					</Grid>
				)}
			</Box>
		)
	);
}
