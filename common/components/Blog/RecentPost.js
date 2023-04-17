import { useFetchNewsList } from "@/api/queryFunctions/news";
import HomeTitle from "@/common/components/HomeTitle";
import NewsCard from "@/pages/tin-tuc/components/NewsCard";
import { Box, Grid } from "@mantine/core";
import React from "react";

const RecentPost = () => {
  const { data: recentPosts, isLoading } = useFetchNewsList({
    populate: ["siteName", "siteIcon", "loai_tin_tuc"],
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 4,
    },
  });

  return (
    <Box className="widget-box">
      <HomeTitle>
        {/* <Box component="span" className="line"></Box> */}
        Tin mới nhất
      </HomeTitle>

      {/* <Stack>
        {(recentPosts?.data || []).map((post) => (
          <RecentPostItem key={post.id} data={post} />
        ))}
      </Stack> */}
      <Grid gutter={"lg"}>
        {recentPosts?.data?.map((post) => (
          <Grid.Col xs={12} sm={6} md={3} key={post?.id}>
            <NewsCard data={post} isLoading={isLoading} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentPost;
