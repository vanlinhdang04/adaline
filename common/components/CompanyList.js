import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CompanyList({ bordered = false }) {
  const { data } = useFetchPageInfo("web-ecosystem");
  const { add_on_4: companyList } = data || {};

  return (
    <SimpleGrid
      cols={5}
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 3, spacing: "sm" },
        { maxWidth: 600, cols: 2, spacing: "sm" },
        // { maxWidth: 414, cols: 1, spacing: "sm" },
      ]}
    >
      {(companyList || [])
        .filter((el) => el.shared)
        .map((item, index) => (
          <Link
            href={`/san-pham/co-phan-startups/${item.label}`}
            key={index}
            passHref
          >
            <a>
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
                  // "&:hover": {
                  //   border: `1px solid ${theme.colors.main[2]}`,
                  // },
                })}
              >
                <Image
                  src={appendImageUrlFromAPI({
                    src: item.pictures[0].picture_url,
                  })}
                  alt={item.pictures[0].title}
                  layout="responsive"
                  height={96}
                  width={216}
                ></Image>
              </Box>
            </a>
          </Link>
        ))}
    </SimpleGrid>
  );
}
