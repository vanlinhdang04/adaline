import {
  fetchPageInfo,
  useFetchPageInfo,
} from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import BannerTextContent from "@/common/components/BannerTextContent";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DanhMuc from "@/common/components/DanhMuc";
import SectionHeading from "@/common/components/Heading/SectionHeading";
import HomeDownload from "@/common/components/HomeDownload";
import InvestmentInfoCard from "@/common/components/InvestmentInfoCard";
import Line from "@/common/components/Line";
import Video from "@/common/components/Video";
import Container from "@/common/MainLayout/Container";
import compareVietnameseString from "@/utils/compareVietnameseString";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Grid } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

function StartupDetail() {
  const {
    query: { slug },
  } = useRouter();

  const { data: pageContent, isLoading } = useFetchPageInfo(
    `web/san-pham/startups/${slug}`
  );

  const [selected, setSelected] = React.useState(null);

  const bannerPlaceholder = getFieldFromFieldId(
    "banner-placeholder",
    "picture_id",
    pageContent?.pictures
  );
  const SectionHeading2 = getFieldFromFieldId(
    "section-2-title",
    "content_id",
    pageContent?.text_field
  );
  const SectionHeading3 = getFieldFromFieldId(
    "section-3-title",
    "content_id",
    pageContent?.text_field
  );
  const BreadcumbName = getFieldFromFieldId(
    "startup-name",
    "content_id",
    pageContent?.text_field
  );

  const investmentTypes = pageContent?.add_on_4 || [];

  const { text_field: newsArticles } =
    pageContent?.add_on_5?.find((el) => el?.id === "news") || [];

  React.useEffect(() => {
    if (!newsArticles?.length) return;

    setSelected(newsArticles?.[0]?.label);
  }, [newsArticles?.length]);

  return (
    <Container>
      <Box pt={24}>
        <AppBreadcrumbs
          items={[
            { title: "Trang chủ", href: "/" },
            { title: "Sản phẩm", href: "#" },
            { title: "Startups", href: "/san-pham/co-phan-startups" },
            {
              title: BreadcumbName?.content,
              href: `/san-pham/co-phan-startups/${slug}`,
            },
          ]}
          isLoading={false}
        />
      </Box>
      <Box component="section" py={16}>
        <Grid gutter={"xl"}>
          <Grid.Col
            xs={12}
            md={7}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            order={2}
            orderMd={1}
          >
            <BannerTextContent data={pageContent?.text_field || []} />
          </Grid.Col>
          <Grid.Col xs={12} md={5} order={1} orderMd={2}>
            <Box
              sx={{
                aspectRatio: "0.9",
                position: "relative",
              }}
            >
              <Video
                video_url={pageContent?.video_url}
                placeholderImageUrl={bannerPlaceholder?.picture_url}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
      <Line index={0} />

      <Box component="section" pt={14}>
        <SectionHeading>
          {sanitizeDOMData(
            SectionHeading2?.content_editor || SectionHeading2?.content
          )}
        </SectionHeading>

        <Grid gutter="xl" align="stretch">
          {investmentTypes
            .sort((a, b) => +a.stt - +b.stt)
            .map((type, i) => (
              <Grid.Col span={12} md={6} key={i}>
                <InvestmentInfoCard
                  title={
                    type.text_field.find((el) => el.content_id === "title")
                      ?.content
                  }
                  iconUrl={type.pictures?.[0]?.picture_url}
                  list={type?.text_field}
                />
              </Grid.Col>
            ))}
        </Grid>
      </Box>

      <Line index={2} />

      <Box component="section" py={12}>
        <SectionHeading>
          {sanitizeDOMData(
            SectionHeading3?.content_editor || SectionHeading3?.content
          )}
        </SectionHeading>

        <Grid gutter={30}>
          <Grid.Col span={0} md={4}>
            <DanhMuc
              list={newsArticles
                ?.sort((a, b) => a?.stt - b?.stt)
                .map((el) => el.label)}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid.Col>
          <Grid.Col span={12} md={8}>
            <div className="webview">
              {sanitizeDOMData(
                newsArticles?.find((el) =>
                  compareVietnameseString(el.label, selected)
                )?.content_editor
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Box>

      <HomeDownload />
    </Container>
  );
}

export async function getStaticPaths() {
  const { add_on_6 } = await fetchPageInfo("web/san-pham/co-phan-startups");

  const { text_field: listOfStartups } =
    getFieldFromFieldId("list-details", "id", add_on_6) || {};

  const paths = listOfStartups
    .filter((el) => !!el.shared)
    .map((el) => ({
      params: {
        slug: String(el.content),
      },
    }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params = {} }) {
  const slug = params?.slug;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    pageInfoKeys.detail(slug),
    () => fetchPageInfo(slug),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!slug,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export default StartupDetail;
