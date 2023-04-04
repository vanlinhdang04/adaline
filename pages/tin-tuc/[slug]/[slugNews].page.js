import Container from "@/common/MainLayout/Container";
import BlogDetails from "@/common/components/Blog/BlogDetails";
import { Box, Grid } from "@mantine/core";
import React from "react";

const NewsDetail = () => {
  return (
    <Box bg={"#fafafd"} pt={30}>
      <Container>
        <Grid>
          <Grid.Col sm={12} lg={8}>
            <BlogDetails />
          </Grid.Col>
          <Grid.Col sm={12} lg={4}></Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsDetail;
