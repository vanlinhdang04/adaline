import IMG from "@/public/images/author.jpg";
import { Box, Group, Rating, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";

const ClientReview = () => {
  return (
    <Box
      // bg={"#fafafd"}
      p={"40px 30px 50px"}
      m={"0 0 10px 10px"}
      maw={500}
      sx={{
        borderRadius: 50,
        boxShadow: "0 8px 10px 0 rgba(0,0,0,.07)",
      }}
    >
      <Title
        order={3}
        size={"1.5rem"}
        color="var(--color-black)"
        weight={400}
        align="center"
        pb={25}
        mb={25}
        sx={{
          borderBottom: "1px solid #e1e8ec",
        }}
      >
        “Bán hàng, mua hàng, tồn kho, thu chi, công nợ”
      </Title>
      <Group position="apart">
        <Group>
          <Box
            w={70}
            h={70}
            sx={{
              position: "relative",
              borderRadius: "100%",
              overflow: "hidden",
            }}
          >
            <Image src={IMG} alt="customer" layout="fill" />
          </Box>
          <Stack justify="center" spacing={0}>
            <Title
              order={5}
              color="var(--color-black)"
              size={"1rem"}
              weight={500}
              align="center"
            >
              Bán hàng
            </Title>
            <Text color="#a7a7bf" size={"1rem"} align="center">
              Quản lý
            </Text>
          </Stack>
        </Group>
        <Box>
          <Rating readOnly value={5} />
          <Text align="center" color="var(--color-gray)" size={"1rem"}>
            (7 Reviews)
          </Text>
        </Box>
      </Group>
    </Box>
  );
};

export default ClientReview;
