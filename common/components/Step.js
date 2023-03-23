import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, Center, SimpleGrid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";

import React from "react";
import DownloadApp from "./DownloadApp";
export default function Step({ bordered = false, data }) {
  // const { data } = useFetchPageInfo("web-3-buoc");

  const { add_on_4: stepList } = data || {};
  const isMobile = useMediaQuery("(max-width: 768px)");
  // console.log(data);

  return (
    <div>
      <Center>
        <Title
          color="#001529"
          sx={(theme) => ({
            fontSize: 36,
            marginBottom: 40,
            fontWeight: "400",

            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              textAlign: "center",
              fontSize: 24,
              marginBottom: 16,
            },
          })}
        >
          {data?.text_field[0].content}
          {""}

          <span style={{ color: "#3CAEA4", fontWeight: "700" }}>
            {data?.text_field[1]?.content}{" "}
          </span>
        </Title>
      </Center>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 770, cols: 1, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
          // { maxWidth: 414, cols: 1, spacing: "sm" },
        ]}
        spacing={80}
      >
        {(stepList || [])
          .filter((el) => el.shared)
          .map((item, index) => (
            <Box
              key={index}
              sx={(theme) => ({
                height: "100%",
                width: "100%",
                //   maxHeight: 360,
                //   maxWidth: 360,
                margin: "auto",
                // cursor: "pointer",
                border: `1px solid ${
                  bordered ? theme.colors.main[2] : "transparent"
                }`,
                borderRadius: 7,
              })}
            >
              <Image
                src={appendImageUrlFromAPI({
                  src: item.pictures[0].picture_url,
                })}
                alt={`Bước đầu tư ${index + 1}`}
                layout="responsive"
                objectFit="contain"
                height={360}
                width={360}
              ></Image>
              <Center sx={{ marginTop: 30 }}>
                <Text size={20}>
                  <span style={{ color: "#3CAEA4", fontWeight: "700" }}>
                    {item?.text_field[0]?.content}
                  </span>
                </Text>
                {/* <Text>{item?.text_field[1]?.content}</Text> */}
              </Center>
              <Center>
                {/* <Text>{item?.text_field[0]?.content}</Text> */}
                <Text
                  align="center"
                  size={20}
                  sx={{
                    color: "#001529",
                    maxWidth: isMobile ? index == 1 && 273 : index == 1 && 261,
                  }}
                >
                  {item?.text_field[1]?.content}
                </Text>
              </Center>
              {index == 0 && (
                <Center sx={{ marginTop: 12 }}>
                  <DownloadApp isStep={true} banner={true} />
                </Center>
              )}
            </Box>
          ))}
      </SimpleGrid>
    </div>
  );
}
