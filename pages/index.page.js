import { fetchProducts } from "@/api/queryFunctions/products";
import DefaultSEO from "@/common/components/DefaultSEO";
import Advantage from "@/common/components/Home/Advantage";
import BannerHome from "@/common/components/Home/BannerHome";
import Companion from "@/common/components/Home/Companion";
import DownloadHome from "@/common/components/Home/DownloadHome";
import FreeProducts from "@/common/components/Home/FreeProducts";
import Products from "@/common/components/Home/Products";
import QA from "@/common/components/Home/QA";
import SpecialFeatures from "@/common/components/Home/SpecialFeatures";
import Version from "@/common/components/Home/Version";
import VideoHome from "@/common/components/Home/VideoHome";
import Line from "@/common/components/Line";
import Popup from "@/common/components/Popup/Popup";
import Container from "@/common/MainLayout/Container";
import { Box } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchGlobal, useFetchGlobal } from "api/queryFunctions/global";
import { queryKeyDetail } from "api/queryKeys/queryKeys";
import React from "react";
import { fetchFreeProducts } from "./../api/queryFunctions/freeProducts";
import { queryKeyList } from "./../api/queryKeys/queryKeys";

export default function Home() {
  const { scrollIntoView, targetRef } = useScrollIntoView({
    // offset: 60,
    duration: 1000,
  });

  const { data } = useFetchGlobal();

  const defaultSeo = data?.attributes?.defaultSeo;

  return (
    <Box>
      <DefaultSEO
        seo={{
          title: defaultSeo?.metaTitle,
          description: defaultSeo?.metaDescription,
          shareImage: defaultSeo?.shareImage,
        }}
      />

      <Popup />
      <Container>
        <BannerHome
          onClickScroll={() => scrollIntoView({ alignment: "start" })}
        />
        <Box ref={targetRef}>
          <VideoHome />
        </Box>
        <Line index={0} />
        <Companion />
        <Line index={1} />
        <Products />
        <Line index={2} />
        <Advantage />
        <Line index={0} />
        <SpecialFeatures />
        <Line index={1} />
        <QA />
        <Line index={2} />
        <FreeProducts />
        <Line index={0} />
        <DownloadHome />
        <Line index={1} />
        <Version />
      </Container>
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  const queryClient = new QueryClient();

  // PAGE INFO
  await queryClient.prefetchQuery(queryKeyDetail("/global"), () =>
    fetchGlobal()
  );
  await queryClient.prefetchQuery(queryKeyList("/spfrees"), () =>
    fetchFreeProducts()
  );
  await queryClient.prefetchQuery(queryKeyList("/sanphams"), () =>
    fetchProducts()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds
  };
}
