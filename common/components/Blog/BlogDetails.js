import { Box, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const BlogDetails = () => {
  return (
    <Box className="blog-details-wrapper">
      <Box className="blog-content" mb={30}>
        <Link href={"#"}>
          <a>
            <Text color="var(--color-primary)" transform="uppercase">
              Business
            </Text>
          </a>
        </Link>
        <Title order={2} size={36} weight={500} my={"md"}>
          Research & development advisor success innovator
        </Title>
      </Box>
    </Box>
  );
};

export default BlogDetails;
