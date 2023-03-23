import { fetchAPI } from "@/apis/api";
import { fetchAppInfo } from "@/apis/queryFunctions/appInfo";
import {
  fetchPageInfos,
  useFetchPageInfos,
} from "@/apis/queryFunctions/pageInfo";
// import { fetchHighlightedProducts } from "@/apis/queryFunctions/productType";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import Ecosystems from "@/common/components/Ecosystems";
import FAQ from "@/common/components/FAQ";
import ListCartProduct from "@/common/components/Home/ListCartProduct";
import ProjectHightLight from "@/common/components/Home/ProjectHightLight";
import HomeBanner from "@/common/components/HomeBanner";
import HomeDownload from "@/common/components/HomeDownload";
import HomeVideo from "@/common/components/HomeVideo";
import Line from "@/common/components/Line";
import Popup from "@/common/components/Popup/Popup";
import Step from "@/common/components/Step";
import WhereProfit from "@/common/components/WhereProfit";
import WhyInvest from "@/common/components/WhyInvest";
import Container from "@/common/MainLayout/Container";
import { Box } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { title } from "next-seo.config";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const { locale } = useRouter();
  const list = [
    "web-home-banner",
    "web-home-video",
    "web-home-why-invest",
    "web-home-where-profit",
    "web-home-download",
    "web/home/product-type",
    "web/home/product-hightlight",
    "web-3-buoc",
    "web-hoi-dap",
  ];

  const { data } = useFetchPageInfos(list, { condition: { ngon_ngu: locale } });

  const { scrollIntoView, targetRef } = useScrollIntoView({
    // offset: 60,
    duration: 1000,
  });

  React.useEffect(() => {
    const fetch = async () => {
      const a = await fetchAPI("/articles");
      console.log("a", a);
    };
    fetch();
  }, []);
  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          {/* <meta name="description" content="Website đầu tư ZenOne" /> */}
        </Head>

        <Popup />
        <Container>
          <HomeBanner
            data={data?.filter((x) => x.ma_trang === "web-home-banner")[0]}
            onClickScroll={() => scrollIntoView({ alignment: "start" })}
          />
          <div ref={targetRef}>
            <HomeVideo
              data={data?.filter((x) => x.ma_trang === "web-home-video")[0]}
            />
          </div>
          <Line index={0} />
          <WhyInvest
            data={data?.filter((x) => x.ma_trang === "web-home-why-invest")[0]}
          />
          <Line index={2} />

          <ListCartProduct
            data={
              data?.filter((x) => x.ma_trang === "web/home/product-type")[0]
            }
          />
        </Container>
        <Box component="section" my={48}>
          <ProjectHightLight
            data={
              data?.filter(
                (x) => x.ma_trang === "web/home/product-hightlight"
              )[0]
            }
          />
        </Box>

        <Box component="section" my={48}>
          <Container>
            <WhereProfit
              data={
                data?.filter((x) => x.ma_trang === "web-home-where-profit")[0]
              }
            />
          </Container>
        </Box>
        <Box
          component="section"
          sx={(theme) => ({
            marginBottom: 80,
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              marginBottom: 40,
            },
          })}
        >
          <Container>
            <Step
              data={data?.filter((x) => x.ma_trang === "web-3-buoc")[0]}
            ></Step>
          </Container>
        </Box>

        <Box
          component="section"
          // sx={(theme) => ({
          //   marginBottom: 40,
          //   [`@media (max-width: ${theme.breakpoints.md}px)`]: {
          //     marginBottom: 0,
          //   },
          // })}
        >
          <Ecosystems></Ecosystems>
        </Box>
        <Container>
          <FAQ
            data={data?.filter((x) => x.ma_trang === "web-hoi-dap")[0]}
          ></FAQ>

          <HomeDownload
            data={data?.filter((x) => x.ma_trang === "web-home-download")[0]}
          />
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const queryClient = new QueryClient();

  const list = [
    "web-home-banner",
    "web-home-video",
    "web-home-why-invest",
    "web-home-where-profit",
    "web-home-download",
    "web/home/product-type",
    "web/home/product-hightlight",
    "web-3-buoc",
    "web-hoi-dap",
  ];

  // PAGE INFO
  await queryClient.prefetchQuery(
    pageInfoKeys.list(list, { condition: { ngon_ngu: locale } }),
    () => fetchPageInfos(list, { condition: { ngon_ngu: locale } })
  );
  await queryClient.prefetchQuery(["appInfo"], () => fetchAppInfo());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds
  };
}
