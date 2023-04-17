import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box, Skeleton, Text } from "@mantine/core";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewsCard({ data, isLoading = false }) {
  return (
    <Link
      href={`${data?.attributes?.loai_tin_tuc?.data?.attributes?.slug}/${data?.attributes?.siteSlug}`}
    >
      <Box
        pb={"xs"}
        sx={{
          cursor: "pointer",
          transition: "0.3s",
          borderRadius: 15,
          height: "100%",
          overflow: "hidden",

          // [`&:hover`]: {
          // 	transform: "translateY(-18px)",
          // 	boxShadow: `20px 20px 40px rgba(43, 223, 206, 0.3)`,
          // },
        }}
      >
        <Skeleton visible={isLoading} radius={15}>
          <div
            style={{
              overflow: "hidden",
              width: "100%",
              aspectRatio: "1",
              position: "relative",
            }}
          >
            <Image
              src={appendImageFromAPI(
                data?.attributes?.siteIcon?.data?.attributes?.url
              )}
              alt="newscard img"
              // width={564}
              // height={544}
              layout="fill"
              //placeholder="blur"
              blurDataURL={"https://via.placeholder.com/521x502"}
              objectFit="cover"
            />
          </div>
        </Skeleton>
        <Box my={12}>
          <Skeleton visible={isLoading}>
            <Text
              size="xs"
              color={"#001529"}
              weight={400}
              transform="uppercase"
            >
              {dayjs(data?.attributes?.updatedAt).format("MMM DD, YYYY")}
            </Text>
          </Skeleton>
        </Box>
        <Box>
          <Skeleton visible={isLoading}>
            <Text size={"md"} weight={500} color="#001529" lineClamp={3}>
              {data?.attributes?.siteName || "title bai viet"}
              {/* {data?.title} */}
            </Text>
          </Skeleton>
        </Box>
      </Box>
    </Link>
  );
}
