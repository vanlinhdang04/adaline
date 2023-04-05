import { Box, Group, Text, Title } from "@mantine/core";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogDetails = ({ data }) => {
  console.log(data);
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
        <Title
          order={2}
          size={36}
          weight={500}
          my={"md"}
          color="var(--text-heading)"
        >
          Research & development advisor success innovator
        </Title>
        <Group spacing={"md"} mb={15}>
          <Group spacing={4}>
            <AiOutlineCalendar size={14} color="var(--color-primary)" />
            <Text size={14} color="#2A345F">
              23rd May 2020
            </Text>
          </Group>
          <Group spacing={4}>
            <AiOutlineEye size={14} color="var(--color-primary)" />
            <Text size={14} color="#2A345F">
              By 223 Views
            </Text>
          </Group>
        </Group>
        <Box className="blog-container">
          <Box
            dangerouslySetInnerHTML={{ __html: data?.attributes?.siteBody }}
          ></Box>
          <div dangerouslySetInnerHTML={{ __html: "<p>dhbfjwnfkn</p>" }}></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore.
          </p>

          <h3>We Develop A New Features</h3>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetails;
