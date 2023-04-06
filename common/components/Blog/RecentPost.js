import { useFetchNewsList } from "@/api/queryFunctions/news";
import { Box, Stack, Title } from "@mantine/core";
import React from "react";
import RecentPostItem from "./RecentPostItem";

const RecentPost = () => {
  const { data: recentPosts } = useFetchNewsList({
    populate: ["siteName", "siteIcon"],
    sort: ["createdAt"],
    pagination: {
      page: 1,
      pageSize: 3,
    },
  });
  //   console.log("data", data);
  return (
    <Box className="widget-box">
      <Title order={4} mb={30}>
        <Box component="span" className="line"></Box>
        Tin mới nhất
      </Title>

      <Stack>
        {Boolean(recentPosts?.data?.length) &&
          recentPosts?.data?.map((post) => (
            <RecentPostItem key={post.id} data={post} />
          ))}
      </Stack>
    </Box>
  );
};

export default RecentPost;
