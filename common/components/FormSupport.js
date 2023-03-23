import Form from "@/common/MainLayout/Footer/Components/Form";
import BgImgBds from "@/public/images/background_bdsform.png";
import BgImg from "@/public/images/background_form.png";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, Center, createStyles, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import ZengrTower from "public/images/ZengroupTower.jpg";
import React from "react";
const useStyles = createStyles((theme) => ({
  form: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "350px",
    },
    maxWidth: 470,
  },
  formBds: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "324px",
    },
    maxWidth: 414,
  },
}));

function FormSupport({ id = "", slug = "", bds = false, list, position }) {
  const { classes } = useStyles();
  const { locale } = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        borderRadius: isMobile ? 40 : 63,
        overflow: "hidden",
        height: 416,
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
          height: 580,
        },
        backgroundColor: bds ? "#00152A" : "none",
      })}
    >
      {!bds && (
        <Image
          src={BgImg}
          alt="bg"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
        />
      )}

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {bds ? (
          <Grid
            sx={(theme) => ({
              height: "100%",
              padding: "10px 44px 0px",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "20px 27px ",
              },
            })}
          >
            <Grid.Col
              md={6}
              sx={(theme) => ({
                padding: 8,
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  padding: 0,
                },
              })}
            >
              <Center sx={{ height: "100%" }}>
                <Box
                  sx={(theme) => ({
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    maxHeight: 350,
                    maxWidth: 550,
                    minHeight: 180,
                    margin: "auto",
                    alignItems: "center",
                    borderRadius: isMobile ? 14 : 38,
                    overflow: "hidden",
                    aspectRatio: 2,
                  })}
                >
                  {list && (
                    <Image
                      alt="product-detail-image"
                      src={ZengrTower}
                      layout="fill"
                      objectFit="cover"
                      width={470}
                      height={296}
                    />
                  )}
                </Box>
              </Center>
            </Grid.Col>
            <Grid.Col
              md={5.7}
              sx={(theme) => ({
                padding: 8,
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  padding: 0,
                },
              })}
            >
              <Center
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <div style={{ maxWidth: 470 }}>
                  <Form
                    id={id}
                    slug={slug}
                    isFooter={false}
                    styles={classes.formBds}
                    isFullInput={true}
                    placeholderColor={"#414141"}
                    bds={true}
                    position={position}
                    title={
                      locale == "vi"
                        ? "Để lại thông tin nhận tư vấn đầu tư, tích lũy BĐS"
                        : "Leave information to receive investment advice, accumulate real estate"
                    }
                  />
                </div>
              </Center>
            </Grid.Col>
          </Grid>
        ) : (
          <Center sx={{ height: "100%", padding: 8 }}>
            <div style={{ maxWidth: 470 }}>
              {/* <Title
          pb={24}
          weight={700}
          align="center"
          order={2}
          color="#ffffff"
        >
          Nếu bạn quan tâm sản phẩm này, hãy để lại thông tin cho ZenOne
        </Title> */}
              <Form
                id={id}
                slug={slug}
                isFooter={false}
                styles={classes.form}
                showIcon={false}
                position={position}
              />
            </div>
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default FormSupport;
