import { Stack } from "@mantine/core";
import React from "react";
import BlogToc from "./BlogToc";
import RecentPost from "./RecentPost";

const BlogSideBar = ({ data }) => {
  return (
    <Stack align="stretch" h={"100%"}>
      {data?.attributes?.siteBody && <BlogToc />}
      {/* <RecentPost /> */}
    </Stack>
  );
};

export default BlogSideBar;
