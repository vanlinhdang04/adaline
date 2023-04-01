import { useFetchGlobal } from "@/api/queryFunctions/global";
import appendImageFromAPI from "@/utils/appendImageFromAPI";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import qrcode from "public/images/qrcode.png";
import React from "react";
import AppStore from "./Download/AppStore";
import ChPlay from "./Download/ChPlay";
import Windows from "./Download/Windows";
// import QrCode from "./Download/QrCode";

export default function DownloadApp({ banner, isStep = false }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, isLoading } = useFetchGlobal();

  if (banner) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "flex-start",
          gap: 16,
        }}
      >
        <div>
          <AppStore
            width={isStep ? 132 : isMobile ? 178 : 160}
            height={isStep ? 39 : isMobile ? 53 : 47}
          />
        </div>
        <div>
          <ChPlay
            width={isStep ? 132 : isMobile ? 178 : 160}
            height={isStep ? 39 : isMobile ? 53 : 47}
          />
        </div>
        <div>
          <Windows
            width={isStep ? 132 : isMobile ? 178 : 160}
            height={isStep ? 39 : isMobile ? 53 : 47}
          />
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div>
        <div style={{ width: 86, height: 86, marginRight: 8 }}>
          {isLoading && (
            <Image
              src={appendImageFromAPI(
                data?.attributes?.qrcode?.data?.attributes?.url
              )}
              alt="QR Code"
              width={86}
              height={86}
              //placeholder="blur"
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <AppStore width={142} height={42} />
        </div>
        <div style={{ display: "flex" }}>
          <ChPlay width={142} height={42} />
        </div>
        <div style={{ display: "flex" }}>
          <Windows width={142} height={42} />
        </div>
      </div>
    </div>
  );
}
