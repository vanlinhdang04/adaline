import { Stack } from "@mantine/core";
import React from "react";
import RecentPost from "./RecentPost";

const BlogSideBar = ({ data }) => {
  return (
    <Stack>
      <RecentPost />
    </Stack>
  );
};

export default BlogSideBar;
