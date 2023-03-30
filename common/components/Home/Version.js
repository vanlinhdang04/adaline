import { Box, Grid, Text, Title } from "@mantine/core";
import { FiArrowLeft } from "@react-icons/all-files/fi/FiArrowLeft";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import React from "react";
import Slider from "react-slick";
import ClientReview from "../ClientReview";

const Version = () => {
  const sliderRef = React.useRef();

  const settings = {
    // fade: true,
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    // prevArrow: <SliderArrowLeft />,
    // nextArrow: <SliderArrowRight />,
    // variableWidth: true,
    // dotsClass: "slick-dots-custom",
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <Box pb={70}>
      <Grid>
        <Grid.Col xs={12} md={6}>
          <Box
            sx={(theme) => ({
              maxWidth: "100%",
              marginBottom: 20,
              [theme.fn.largerThan("md")]: {
                maxWidth: "475px",
                marginBottom: 0,
              },
            })}
          >
            <Box
              component="span"
              pl={"3.75rem"}
              mb="0.5rem"
              pos={"relative"}
              sx={{
                color: "#50c594",
                fontSize: "1rem",
                fontWeight: 500,
                ["&::after"]: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  background: "#50c594",
                  height: "1px",
                  margin: "auto 0",
                },
              }}
            >
              Phiên bản phần mềm
            </Box>
            <Title
              order={3}
              color="var(--color-black)"
              size={"1.75rem"}
              weight={400}
              mb={30}
            >
              Bán hàng & nhà hàng
            </Title>
            <Box mb={16}>
              <Text color="var(--color-gray)" size={"1rem"}>
                Quản lý cửa hàng tạp hoá, Quản lý mỹ phẩm, Quản lý cửa hàng sơn,
                Quản lý vật liệu xây dựng, Quản lý nhôm kính, Quản lý nhôm thép,
                Quản lý cửa hàng mắt kính, Quản lý cửa hàng điện thoại,
              </Text>
              <br />
              <Text color="var(--color-gray)" size={"1rem"}>
                Quản lý nhà hàng, Quản lý quán Cafe, Quản lý quán Bida, Quản lý
                quán trà sữa, Quản lý khách sạn
              </Text>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 16,
              }}
            >
              <FiArrowLeft
                onClick={previous}
                size={28}
                color="var(--color-gray)"
                cursor={"pointer"}
              />
              <FiArrowRight
                onClick={next}
                size={28}
                color="var(--color-gray)"
                cursor={"pointer"}
              />
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <Box
          // sx={(theme) => ({
          //   width: "100%",
          //   display: "flex",
          //   justifyContent: "center",
          //   [theme.fn.largerThan("md")]: {
          //     justifyContent: "right",
          //   },
          // })}
          >
            <Slider {...settings} ref={sliderRef}>
              <ClientReview key={1} />
              <ClientReview key={2} />
              <ClientReview key={3} />
            </Slider>
          </Box>
          {/* <Slider>
            <ClientReview key={1} />
            <ClientReview key={2} />
            <ClientReview key={3} />
          </Slider> */}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Version;
