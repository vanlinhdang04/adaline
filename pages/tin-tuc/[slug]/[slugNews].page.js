import { useFetchNews } from "@/api/queryFunctions/news";
import Container from "@/common/MainLayout/Container";
import BlogDetails from "@/common/components/Blog/BlogDetails";
import { Box, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const NewsDetail = () => {
  const {
    query: { slugNews },
  } = useRouter();

  const { data } = useFetchNews(slugNews);
  console.log("data", data);

  return (
    <Box bg={"#fafafd"} pt={30}>
      <Container>
        <Grid>
          <Grid.Col sm={12} lg={8}>
            <BlogDetails data={data} />
          </Grid.Col>
          <Grid.Col sm={12} lg={4}></Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsDetail;
