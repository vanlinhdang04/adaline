import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid, Group, Text, Title } from "@mantine/core";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import BlogSocialShare from "./BlogSocialShare";
import BlogTags from "./BlogTags";
const BlogDetails = ({ data }) => {
  return (
    <Box className="blog-details-wrapper">
      <Box className="blog-content ck-content" mb={30}>
        <Link href={"#"}>
          <a>
            <Text color="var(--color-primary)" transform="uppercase">
              {data?.attributes?.loai_tin_tuc?.data?.attributes?.title}
            </Text>
          </a>
        </Link>
        <Title
          order={2}
          size={"calc(1.325rem + .9vw)"}
          weight={500}
          my={"md"}
          color="var(--text-heading)"
        >
          {data?.attributes?.siteName}
        </Title>
        <Group spacing={"md"} mb={15}>
          <Group spacing={4}>
            <AiOutlineCalendar size={14} color="var(--color-primary)" />
            <Text size={14} color="#2A345F">
              {dayjs(data?.attributes?.createdAt)
                .format("DD/MM/YYYY")
                .toString()}
            </Text>
          </Group>
          <Group spacing={4}>
            <AiOutlineEye size={14} color="var(--color-primary)" />
            <Text size={14} color="#2A345F">
              {data?.attributes?.countView || 0} Lượt xem
            </Text>
          </Group>
        </Group>
        <Box className="blog-container">
          {/* ------ body ------- */}
          <Box className="blog-body">
            {sanitizeDOMData(data?.attributes?.siteBody)}
          </Box>

          <Grid justify="space-between">
            <Grid.Col xs={12} sm={6}>
              {Boolean(data?.attributes?.siteTag?.length) && (
                <BlogTags data={data?.attributes?.siteTag} />
              )}
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
              {Boolean(data?.attributes?.siteBody) && (
                <BlogSocialShare data={data} />
              )}
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetails;
