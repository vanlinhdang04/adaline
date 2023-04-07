import { Stack } from "@mantine/core";
import React from "react";
import BlogToc from "./BlogToc";
import RecentPost from "./RecentPost";

const BlogSideBar = ({ data }) => {
  return (
    <Stack>
      {data?.attributes?.siteBody && <BlogToc />}
      <RecentPost />
    </Stack>
  );
};

export default BlogSideBar;
