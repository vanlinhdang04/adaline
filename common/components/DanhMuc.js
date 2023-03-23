import {
  addtrackingEvent,
  TRACKING_NAMES,
  TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
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
  const handleTracking = (link) => {
    switch (link) {
      case "hướng dẫn đăng ký":
        return addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.HDSD,
          field_id: TRACKING_NAMES.HDSD_Danhmuc_HDDK,
        });
      case "hướng dẫn nạp rút tiền":
        return addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.HDSD,
          field_id: TRACKING_NAMES.HDSD_Danhmuc_HDNRT,
        });
      case "hướng dẫn đầu tư":
        return addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.HDSD,
          field_id: TRACKING_NAMES.HDSD_Danhmuc_HDĐT,
        });
      case "hướng dẫn giao dịch sàn thứ cấp":
        return addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.HDSD,
          field_id: TRACKING_NAMES.HDSD_Danhmuc_HDGDSTC,
        });
      case "hỏi đáp thường gặp":
        return addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.HDSD,
          field_id: TRACKING_NAMES.HDSD_Danhmuc_Hoidap,
        });
      default:
        return;
    }
  };
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
              isHDSD && handleTracking(item);
            }}
          >
            {uppercaseFirstLetter(item)}
          </NewsTag>
        ))}
      </Group>
    </Box>
  );
}
