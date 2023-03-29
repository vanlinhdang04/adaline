import { Box, Grid, Text, Title } from "@mantine/core";
import React from "react";
import ClientReview from "../ClientReview";

const Version = () => {
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
            <Box>
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
          </Box>
        </Grid.Col>
        <Grid.Col xs={12} md={6}>
          <Box
            sx={(theme) => ({
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              [theme.fn.largerThan("md")]: {
                justifyContent: "right",
              },
            })}
          >
            <ClientReview />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Version;
