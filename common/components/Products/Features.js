import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box, Button, Grid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const Features = () => {
  //   const isSM = useMediaQuery("(max-width: 768px)");
  const isMD = useMediaQuery("(max-width: 992px)");
  const isLG = useMediaQuery("(max-width: 1200px)");
  const iconLink =
    "/uploads/62a1655f3695ad1986da8d33_1664271377142_69060c0d0d2f467decb4720c133c8a89_2af8eb51c7.avif";

  const settingDots = {
    slidesToShow: isLG ? 4 : 5,
    slidesToScroll: 1,
    infinite: false,
    dotsClass: "slick-dots slick-thumb",
    dots: false,
    arrows: true,
  };

  const settings = {
    appendDots: (dots) => (
      <Box className="features-dots">
        <Slider {...settingDots}>{dots}</Slider>
      </Box>
    ),
    customPaging: function (i) {
      return (
        <Box h={80} px={30} py={15}>
          <Grid justify="center" align="center" grow gutter={0}>
            <Grid.Col sm={4} h={24} w={24}>
              <Image
                src={appendImageFromAPI(iconLink)}
                width={24}
                height={24}
              />
            </Grid.Col>
            <Grid.Col sm={8}>
              <Text size={16}>Business Consultancy {i}</Text>
            </Grid.Col>
          </Grid>
        </Box>
      );
    },
    dots: isMD ? false : true,
    dotsClass: "slick-dots slick-thumb features-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <Slider {...settings} className="features-sliders">
        <Box>
          <Grid justify="center" align="center">
            <Grid.Col sm={12} md={6}>
              <Box
                h={"100%"}
                sx={{
                  position: "relative",
                  aspectRatio: "1",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              >
                <Image src={appendImageFromAPI(iconLink)} layout="fill" />
              </Box>
            </Grid.Col>
            <Grid.Col sm={12} md={6}>
              <Box className="features-content">
                <Title order={2} size={32} weight={400}>
                  <b>Market Analyser</b> for grow your business
                </Title>
                <Text component="p">
                  Duis et metus et massa tempus lacinia. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos.
                </Text>
                <Text component="p">
                  Duis et metus et massa tempus lacinia. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Maecenas ultricies, orci molestie blandit interdum.
                  ipsum ante pellentesque nisl, eget mollis turpis quam nec
                  eros. ultricies, orci molestie blandit interdum.
                </Text>
                <Button
                  size="md"
                  sx={{
                    background: "var(--color-primary)",
                    borderRadius: "0.25rem",
                  }}
                >
                  <Text weight={400} size={14}>
                    Get Started
                  </Text>
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
        <Box>
          <Grid justify="center" align="center">
            <Grid.Col sm={12} md={6}>
              <Box
                h={"100%"}
                sx={{
                  position: "relative",
                  aspectRatio: "1",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              >
                <Image src={appendImageFromAPI(iconLink)} layout="fill" />
              </Box>
            </Grid.Col>
            <Grid.Col sm={12} md={6}>
              <Box className="features-content">
                <Title order={2} size={32} weight={400}>
                  <b>Market Analyser</b> for grow your business
                </Title>
                <Text component="p">
                  Duis et metus et massa tempus lacinia. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos.
                </Text>
                <Text component="p">
                  Duis et metus et massa tempus lacinia. Class aptent taciti
                  sociosqu ad litora torquent per conubia nostra, per inceptos
                  himenaeos. Maecenas ultricies, orci molestie blandit interdum.
                  ipsum ante pellentesque nisl, eget mollis turpis quam nec
                  eros. ultricies, orci molestie blandit interdum.
                </Text>
                <Button
                  size="md"
                  sx={{
                    background: "var(--color-primary)",
                    borderRadius: "0.25rem",
                  }}
                >
                  <Text weight={400} size={14}>
                    Get Started
                  </Text>
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </Slider>
    </Box>
  );
};

export default Features;
