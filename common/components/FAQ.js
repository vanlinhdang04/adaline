import {
  fetchPageInfo,
  useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import {
  addtrackingEvent,
  TRACKING_NAMES,
  TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import sanitizeDOMData from "@/utils/sanitizeDOMData";

import { Accordion, Center, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import Image from "next/image";
import down from "public/icons/arrow-down-right.png";

import React from "react";
import BtnShowMore from "./Button/BtnShowMore";

export default function FAQ({ isPage = false, isHelp = false, data }) {
  const { text_field: Info } = data || {};
  const { add_on_4: faq } = data || {};
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      style={{
        paddingTop: isHelp ? 0 : 40,
      }}
    >
      {!isHelp && (
        <Center>
          <Title
            order={1}
            color="#001529"
            align="center"
            sx={(theme) => ({
              fontSize: 36,
              marginBottom: 40,
              fontWeight: isPage ? "700" : "400",

              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                textAlign: "center",
                fontSize: 24,
                marginBottom: 16,
              },
            })}
          >
            {Info && (isPage ? Info[1]?.content : Info[0]?.content)}
          </Title>
        </Center>
      )}

      {faq && (
        <Accordion
          chevron={
            <div
              style={{
                height: "100%",
                width: "100%",
                maxHeight: isMobile ? 14 : 20,
                maxWidth: isMobile ? 14 : 20,

                float: "right",
              }}
            >
              <Image
                src={down}
                alt="ss"
                layout="responsive"
                // height={20}
                // width={20}
              ></Image>
            </div>
          }
          styles={(theme) => ({
            item: {
              // styles added to all items
              borderRadius: 13,
              border: "1px solid #3caea4",

              transition: "0.3s",
              margin: "0px 0px 16px",
              cursor: "pointer",
              "&:hover": {
                background: "#F1FFFE",
              },
              // styles added to expanded item
              "&[data-active]": {
                // backgroundColor: "#ccc",
              },
            },
            control: {
              transition: "0.3s",
              padding: "15px 30px",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "15px 22px 15px 8px",
                fontSize: 16,
              },
              borderRadius: 13,
              "&:hover": {
                background: "#F1FFFE",
              },
            },
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(-90deg)",
              },
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                maxHeight: 14,
                maxWidth: 14,
              },
            },
            label: { fontWeight: 600, color: "#001529" },
            content: {
              padding: "0 30px 15px ",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "0 22px 15px 8px ",
              },
              fontSize: 15,
              color: "#001529",
            },
          })}
        >
          {faq &&
            faq
              .sort((a, b) => +a.stt - +b.stt)
              .map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={item?.text_field[0]?.content || "Câu hỏi"}
                >
                  <Accordion.Control sx={{ fontWeight: 700 }}>
                    {sanitizeDOMData(item?.text_field[0]?.content)}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {sanitizeDOMData(item?.text_field[1]?.content)}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
        </Accordion>
      )}
      {!isPage && (
        <Center
          sx={(theme) => ({
            marginTop: 40,
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              marginTop: 13,
            },
          })}
        >
          <div
            onClick={() => {
              console.log("aaaaaaaaaa");
              addtrackingEvent({
                vi_tri: TRACKING_VI_TRI["TRANG-CHU"],
                field_id: TRACKING_NAMES["TRANG_CHU_Hoi-dap"],
              });
            }}
          >
            <BtnShowMore href={"/ho-tro/cau-hoi-thuong-gap"} />
          </div>
        </Center>
      )}
    </div>
  );
}
