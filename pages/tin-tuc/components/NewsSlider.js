import {
	SliderArrowLeft,
	SliderArrowRight,
} from "@/common/components/Button/SliderArrow";
import { Box } from "@mantine/core";
import React from "react";
import Slider from "react-slick";
import NewsBanner from "./NewsBanner";

export default function NewsSlider({ data, isLoading = false }) {
	const settings = {
		fade: true,
		dots: true,
		// infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		// adaptiveHeight: true,
		prevArrow: <SliderArrowLeft />,
		nextArrow: <SliderArrowRight />,
		// variableWidth: true,
		// dotsClass: "slick-dots-custom",
	};

	return (
		<Box
			id={"news-slider"}
			// sx={{ boxShadow: "0px 20px 20px rgba(46, 232, 214, 0.2)" }}
		>
			<Slider {...settings}>
				{isLoading ? (
					<NewsBanner isLoading={isLoading} />
				) : (
					data?.add_on_4
						?.filter((el) => el.shared)
						?.sort((a, b) => a?.stt - b?.stt)
						?.map((item, k) => <NewsBanner key={k} data={item} />)
				)}
				{/* {data?.add_on_4?.map((item, k) => (
					<NewsBanner key={k} data={item} />
				))} */}
				{/* <NewsBanner /> */}
			</Slider>
		</Box>
	);
}
