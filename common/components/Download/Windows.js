import { useFetchGlobal } from "@/api/queryFunctions/global";
import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IMG from "public/images/windows.png";
import React from "react";

const Windows = ({ width, height }) => {
  const { data } = useFetchGlobal();

  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Image
          src={appendImageFromAPI(
            data?.data?.attributes?.qrcode?.data?.attributes?.url
          )}
          alt="QR Download on AppStore"
          width={width * 0.9}
          height={width * 0.9}
          layout="intrinsic"
        />
      </Box>
      <Link href={data?.attributes?.download?.windowsURL || "#"} passHref>
        <a target={"_blank"} style={{ lineHeight: "0px" }}>
          <Image
            src={IMG}
            alt="AppStore"
            width={width}
            height={height}
            layout="intrinsic"
            blurDataURL="https://via.placeholder.com/226x66"
            objectFit="contain"
            style={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          />
        </a>
      </Link>
    </Box>
  );
};

export default Windows;
