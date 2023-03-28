import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IMG from "public/images/windows.png";
import React from "react";

const Windows = ({ width, height }) => {
  const { locale } = useRouter();
  const { data } = useFetchPageInfo("web-home-download", {
    condition: { ngon_ngu: locale },
  });

  const imgQrCode = data?.pictures?.filter(
    (x) => x.picture_id === "qrcode-ch-play"
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
      <Link
        href={"https://play.google.com/store/apps/details?id=app.zenone"}
        passHref
      >
        <a
          target={"_blank"}
          style={{
            lineHeight: "0px",
            border: "1px solid var(--color-primary)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Image
            src={IMG}
            alt="AppStore"
            width={width - 2}
            height={height - 2}
            layout="intrinsic"
            // blurDataURL="https://via.placeholder.com/226x66"
            // objectFit="contain"
            style={{
              border: "1px solid var(--color-primary)",
            }}
          />
        </a>
      </Link>
    </Box>
  );
};

export default Windows;
