import { Box, Group, Stack, Text, Title } from "@mantine/core";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import appendImageFromAPI from "./../../../utils/appendImageFromAPI";

const RecentPostItem = ({ data }) => {
  return (
    <Group noWrap className="media" spacing={16}>
      <Box
        sx={{
          position: "relative",
          aspectRatio: "1",
          width: 80,
        }}
      >
        <Image
          src={appendImageFromAPI(
            data?.attributes?.siteIcon?.data?.attributes?.url
          )}
          alt="qgf"
          layout="fill"
        />
      </Box>
      <Stack className="media-body" spacing={8}>
        <Title order={6} color="var(--color-black)" size={14} weight={500}>
          {data?.attributes?.siteName}
        </Title>
        <Group spacing={4}>
          <AiOutlineCalendar size={12} color="var(--color-primary)" />
          <Text size={12} color="var(--color-gray)">
            {dayjs(data?.attributes?.createdAt).format("DD/MM/YYYY").toString()}
          </Text>
        </Group>
      </Stack>
    </Group>
  );
};

export default RecentPostItem;
