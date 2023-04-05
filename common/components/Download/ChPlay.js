import { useFetchGlobal } from "@/api/queryFunctions/global";
import placeholderGIF from "@/public/images/placeholder.gif";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import imgChPlay from "public/images/chplay.png";
import React from "react";

export default function ChPlay({ width, height }) {
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
          placeholder="blur"
          blurDataURL={placeholderGIF.src}
        />
      </Box>
      <Link href={data?.attributes?.download?.googlePlayURL || "#"} passHref>
        <a target={"_blank"} style={{ lineHeight: "0px" }}>
          <Box
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Image
              src={imgChPlay}
              alt="AppStore"
              width={width}
              height={height}
              layout="intrinsic"
              placeholder="blur"
              blurDataURL={placeholderGIF.src}
              objectFit="contain"
            />
          </Box>
        </a>
      </Link>
    </Box>
  );
}
