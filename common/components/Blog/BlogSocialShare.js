import { Box, Group, Stack, Title } from "@mantine/core";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import Link from "next/link";
import React from "react";

const BlogSocialShare = ({ data }) => {
  return (
    <Box className="blog-container" h={"100%"}>
      <Stack spacing={"sm"}>
        <Title
          order={5}
          sx={(theme) => ({
            textAlign: "left",
            [theme.fn.largerThan("sm")]: {
              textAlign: "right",
            },
          })}
        >
          Chia sẻ
        </Title>
        <Group
          spacing={15}
          className="social-icons"
          position="right"
          sx={(theme) => ({
            justifyContent: "flex-start",
            [theme.fn.largerThan("sm")]: {
              justifyContent: "flex-end",
            },
          })}
        >
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
              window.location.href
            )}`}
            passHref
          >
            <a target="_blank" rel="noopener">
              <FaFacebookF size={20} />
            </a>
          </Link>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURI(
              window.location.href
            )}&title=${data?.attributes?.siteName || ""}`}
            passHref
          >
            <a target="_blank" rel="noopener">
              <FaLinkedinIn size={20} />
            </a>
          </Link>
          <Link
            href={`http://twitter.com/share?text=${
              data?.attributes?.siteName || ""
            }&url=${encodeURI(window.location.href)}`}
            passHref
          >
            <a target="_blank" rel="noopener">
              <FaTwitter size={20} />
            </a>
          </Link>
        </Group>
      </Stack>
    </Box>
  );
};

export default BlogSocialShare;
