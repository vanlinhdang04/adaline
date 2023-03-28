import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box, Group, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FreeProductItem = ({ product }) => {
  return (
    <Box h={"100%"}>
      <Link href={`/product/${product.attributes.slug}_${product.id}`} passHref>
        <a>
          <Group
            noWrap={true}
            spacing="xs"
            mb={"xs"}
            align="flex-start"
            sx={{
              "& h5": {
                transition: "var(--transition)",
              },
              "&:hover": {
                h5: {
                  color: "#8eb943",
                },
              },
            }}
          >
            <Image
              src={appendImageFromAPI(
                product.attributes.favicon.data.attributes.url
              )}
              width={32}
              height={32}
            />
            <Title order={5} color="#646464" size={14}>
              {product.attributes.title}
            </Title>
          </Group>
        </a>
      </Link>
      <Text size={14} color="#767676">
        {product.attributes.description}
      </Text>
    </Box>
  );
};

export default FreeProductItem;
