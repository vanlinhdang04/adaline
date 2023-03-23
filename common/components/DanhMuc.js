import NewsTag from "@/pages/tin-tuc/components/NewsTag";
import { uppercaseFirstLetter } from "@/utils/uppercaseFirstLetter";
import { Box, Group, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
// import imgBurger2 from "public/icons/burder_filter.png";
import imgBurger1 from "public/icons/burger_category.png";
import React from "react";

export default function DanhMuc({
  list,
  selected,
  setSelected,
  title = "Danh mục",
  icon = imgBurger1,
  isHDSD = false,
}) {
  const { locale } = useRouter();
  if (title == "Danh mục" && locale == "en") {
    title = "Menu";
  }
  
  return (
    <Box
      p={16}
      sx={(theme) => ({
        background: theme.colors.neutral[9],
        border: `1px solid ${theme.colors.accent[2]}`,
        borderRadius: "16px",
      })}
    >
      <Group align={"center"} mb={17}>
        <Box sx={{ width: 39, height: 39, position: "relative" }}>
          <Image src={icon} alt="burger" layout="fill" />
        </Box>
        <Box>
          <Text size={"md"} weight={500}>
            {title}
          </Text>
        </Box>
      </Group>
      <Group align={"center"} noWrap={false} spacing={6}>
        {list?.map((item, k) => (
          <NewsTag
            key={k}
            active={item === selected}
            onClick={() => {
              setSelected(item);
            }}
          >
            {uppercaseFirstLetter(item)}
          </NewsTag>
        ))}
      </Group>
    </Box>
  );
}
