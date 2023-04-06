import { Box, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const BlogTags = ({ data }) => {
  return (
    <Box className="blog-container">
      <Stack spacing={"sm"}>
        <Title order={5}>Tags</Title>
        <Group spacing={0} className="tag-list">
          {Boolean(data.length) &&
            data?.map((tag) => (
              <Link key={tag?.id} href={tag?.tagLink} passHref>
                <a>
                  <Text className="tag">{tag?.tagName}</Text>
                </a>
              </Link>
            ))}
        </Group>
      </Stack>
    </Box>
  );
};

export default BlogTags;
