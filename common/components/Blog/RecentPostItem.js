import { Box, Grid, Group, Stack, Text, Title } from "@mantine/core";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import appendImageFromAPI from "./../../../utils/appendImageFromAPI";

const RecentPostItem = ({ data }) => {
  return (
    <Grid>
      <Grid.Col xs={4}>
        <Box
          sx={{
            position: "relative",
            aspectRatio: "1",
            width: "100%",
          }}
        >
          <Image
            src={appendImageFromAPI(
              data?.attributes?.siteIcon?.data?.attributes?.url
            )}
            alt="qgf"
            layout="fill"
            style={{
              borderRadius: "4px",
            }}
          />
        </Box>
      </Grid.Col>
      <Grid.Col xs={8}>
        <Stack className="media-body" spacing={8}>
          <Link
            href={`/tin-tuc/${data?.attributes?.loai_tin_tuc?.data?.attributes?.slug}/${data?.attributes?.siteSlug}`}
            passHref
          >
            <a>
              <Title
                order={6}
                color="var(--color-black)"
                size={14}
                weight={500}
                lineClamp={2}
                sx={{
                  "&:hover": {
                    color: "var(--color-primary)",
                  },
                }}
              >
                {data?.attributes?.siteName}
              </Title>
            </a>
          </Link>
          <Group spacing={4}>
            <AiOutlineCalendar size={12} color="var(--color-primary)" />
            <Text size={12} color="var(--color-gray)">
              {dayjs(data?.attributes?.createdAt)
                .format("DD/MM/YYYY")
                .toString()}
            </Text>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
    // <Group noWrap className="media" spacing={16}>
    //   {/* <Box
    //     sx={{
    //       position: "relative",
    //       aspectRatio: "1",
    //       // width: 100,
    //     }}
    //   > */}
    //   <Image
    //     src={appendImageFromAPI(
    //       data?.attributes?.siteIcon?.data?.attributes?.url
    //     )}
    //     alt="qgf"
    //     // layout="fill"
    //     width={80}
    //     height={80}
    //   />
    //   {/* </Box> */}
    //   <Stack className="media-body" spacing={8}>
    //     <Link
    //       href={`/tin-tuc/${data?.attributes?.loai_tin_tuc?.data?.attributes?.slug}/${data?.attributes?.siteSlug}`}
    //       passHref
    //     >
    //       <a>
    //         <Title
    //           order={6}
    //           color="var(--color-black)"
    //           size={14}
    //           weight={500}
    //           sx={{
    //             "&:hover": {
    //               color: "var(--color-primary)",
    //             },
    //           }}
    //         >
    //           {data?.attributes?.siteName}
    //         </Title>
    //       </a>
    //     </Link>
    //     <Group spacing={4}>
    //       <AiOutlineCalendar size={12} color="var(--color-primary)" />
    //       <Text size={12} color="var(--color-gray)">
    //         {dayjs(data?.attributes?.createdAt).format("DD/MM/YYYY").toString()}
    //       </Text>
    //     </Group>
    //   </Stack>
    // </Group>
  );
};

export default RecentPostItem;
