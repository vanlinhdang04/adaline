import { Box, Center, Grid } from "@mantine/core";
import Image from "next/image";
import React from "react";
import HomeTitle from "../HomeTitle";
import AppDownload from "./../AppDownload";

const DownloadHome = () => {
  return (
    <Box pb={"lg"}>
      <Center>
        <HomeTitle style={{ maxWidth: 546, textAlign: "center" }}>
          Tải miễn phí và trải nghiệm ngay
        </HomeTitle>
      </Center>

      <Grid align={"center"}>
        <Grid.Col xs={12} md={6}>
          <AppDownload />
        </Grid.Col>
        <Grid.Col
          xs={12}
          md={6}
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              marginTop: 59,
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "flex-end",

              [theme.fn.smallerThan("md")]: {
                justifyContent: "center",
              },
            })}
          >
            <iframe
              name="f239a7bb460ea84"
              width="450px"
              height="315px"
              data-testid="fb:page Facebook Social Plugin"
              title="fb:page Facebook Social Plugin"
              allowFullScreen={true}
              allow="encrypted-media"
              src="https://web.facebook.com/v2.7/plugins/page.php?adapt_container_width=true&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df15ae1a87aa446%26domain%3Dvzsoft.net%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fvzsoft.net%252Ff2c0408a00053a4%26relation%3Dparent.parent&amp;container_width=460&amp;height=315&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fadalinejsc%2F&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false&amp;tabs=timeline&amp;width=560"
              // style="border: none; visibility: visible; width: 460px; height: 315px;"
              style={{
                borderRadius: 8,
              }}
            ></iframe>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DownloadHome;
