import { useFetchNews } from "@/api/queryFunctions/news";
import Container from "@/common/MainLayout/Container";
import BlogDetails from "@/common/components/Blog/BlogDetails";
import BlogSideBar from "@/common/components/Blog/BlogSideBar";
import DownloadHome from "@/common/components/Home/DownloadHome";
import { Box, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const NewsDetail = () => {
  const {
    query: { slugNews },
  } = useRouter();

  const { data } = useFetchNews(slugNews);

  React.useEffect(() => {
    console.log("onLoad");
  }, []);

  return (
    <Box bg={"#fafafd"} pt={30} className="blog-container">
      <Container>
        <Grid gutter={24} pb={"md"}>
          <Grid.Col sm={12} md={8}>
            <BlogDetails data={data} />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <BlogSideBar data={data} />
          </Grid.Col>
        </Grid>

        <DownloadHome />
      </Container>
    </Box>
  );
};

export default NewsDetail;
