import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Center } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Container from "../MainLayout/Container";
import ChildCompany from "./ChildCompany";
import CompanyList from "./CompanyList";
import HomeTitle from "./HomeTitle";

export default function Ecosystems() {
  // const { data } = useFetchPageInfo("web-ecosystem");
  const { locale } = useRouter();
  return (
    <div
      style={{
        background: "#F1FFFE",
        paddingTop: 40,
        paddingBottom: 50,
      }}
    >
      <Container>
        <Center>
          {locale == "vi" ? (
            <HomeTitle style={{ marginBottom: 25 }}>
              Hệ sinh thái <b style={{ color: "#3CAEA4" }}>ZenGroup</b>
            </HomeTitle>
          ) : (
            <HomeTitle style={{ marginBottom: 25 }}>
              <b style={{ color: "#3CAEA4" }}>ZenGroup</b> Ecosystem
            </HomeTitle>
          )}

          {/* <Image
            src={appendImageUrlFromAPI({
              src: data?.picture_1,
            })}
            alt={data?.title}
            layout="responsive"
            height={400}
            width={800}
          ></Image> */}
        </Center>
        <ChildCompany></ChildCompany>
      </Container>
    </div>
  );
}
