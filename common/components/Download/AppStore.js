import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import imgAppStore from "public/images/appstore.png";
import React from "react";

export default function AppStore({ width, height }) {
  const { locale } = useRouter();
  const { data } = useFetchPageInfo("web-home-download", {
    condition: { ngon_ngu: locale },
  });

  const imgQrCode = data?.pictures?.filter(
    (x) => x.picture_id === "qrcode-app-store"
  )[0]?.picture_url;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box style={{ display: "flex" }}>
        <Image
          src={appendImageUrlFromAPI({ src: imgQrCode, size: "m" })}
          alt="QR Download on AppStore"
          width={width}
          height={width}
          layout="intrinsic"
        />
      </Box>
      <Link href={"https://apps.apple.com/vn/app/zenone/id1610451612"}>
        <a target={"_blank"} style={{ lineHeight: "0px", display: "block" }}>
          <Image
            src={imgAppStore}
            alt="AppStore"
            width={width}
            height={height}
            //placeholder="blur"
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
}
