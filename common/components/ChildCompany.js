import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import {
  Center,
  Grid,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function ChildCompany({ bordered = false }) {
  const { locale } = useRouter();
  const { data } = useFetchPageInfo("web-ecosystem", {
    condition: { ngon_ngu: locale },
  });
  const { add_on_4: companyList } = data || {};
  return (
    <div>
      <Center>
        <Text
          size={20}
          align="center"
          sx={{ marginBottom: 15, padding: "0 8px" }}
        >
          {data?.text_field && data?.text_field[0]?.label}
        </Text>
      </Center>
      {/* <SimpleGrid
        cols={5}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "sm" },
          { maxWidth: 755, cols: 3, spacing: "xs" },
          { maxWidth: 600, cols: 3, spacing: "xs" },
          // { maxWidth: 414, cols: 1, spacing: "sm" },
        ]}
        align="center"
      >
        {(companyList || [])
          .filter((el) => el.shared)
          .map((item, index) => (
            <Link href={`${item.label}`} key={index}>
              <a target="_blank" onClick={() => handleTracking(item?.id)}>
                <Box
                  sx={(theme) => ({
                    height: "100%",
                    width: "100%",
                    maxHeight: 96,
                    maxWidth: 216,
                    margin: "auto",
                    cursor: "pointer",
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
                    alt={item.pictures[0].title}
                    layout="responsive"
                    objectFit="contain"
                    height={96}
                    width={216}
                  ></Image>
                </Box>
              </a>
            </Link>
          ))}
      </SimpleGrid> */}
      <Grid justify={"center"}>
        {(companyList || [])
          .filter((el) => el.shared)
          .map((item, index) => (
            <Grid.Col
              xs={4}
              md={2.4}
              key={index}
              sx={{
                width: 216,
                height: "fit-content",
              }}
            >
              <Link href={`${item.label}`} key={index}>
                <a target="_blank">
                  <Image
                    src={appendImageUrlFromAPI({
                      src: item.pictures[0].picture_url,
                    })}
                    alt={item.pictures[0].title}
                    layout="responsive"
                    objectFit="contain"
                    height={96}
                    width={216}
                  ></Image>
                </a>
              </Link>
            </Grid.Col>
          ))}
      </Grid>
    </div>
  );
}
