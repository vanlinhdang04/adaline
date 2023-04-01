import { useFetchGlobal } from "@/api/queryFunctions/global";
import placeholderGIF from "@/public/images/placeholder.gif";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import imgAppStore from "public/images/appstore.png";
import React from "react";

export default function AppStore({ width, height }) {
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
            data?.attributes?.qrcode?.data?.attributes?.url
          )}
          alt="QR Download on AppStore"
          width={width * 0.9}
          height={width * 0.9}
          layout="intrinsic"
          placeholder="blur"
          blurDataURL={placeholderGIF}
        />
      </Box>
      <Link href={data?.attributes?.download?.appStoreURL || "#"}>
        <a target={"_blank"} style={{ lineHeight: "0px", display: "block" }}>
          <Box
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={imgAppStore}
              alt="AppStore"
              width={width}
              height={height}
              layout="intrinsic"
              placeholder="blur"
              blurDataURL="placeholderGIF"
              objectFit="contain"
            />
          </Box>
        </a>
      </Link>
    </Box>
  );
}
