import {
  fetchNewsType,
  fetchNewsTypes,
  useFetchNewsList,
  useFetchNewsType,
  useFetchNewsTypes,
} from "@/api/queryFunctions/news";
import { newsTypeKeys } from "@/api/queryKeys/newsTypeKeys";
import Container, { NewsContainer } from "@/common/MainLayout/Container";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import DownloadHome from "@/common/components/Home/DownloadHome";
import HomeTitle from "@/common/components/HomeTitle";
import Line from "@/common/components/Line";
import { Box, Grid, Group, Pagination, Stack } from "@mantine/core";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import NewsCard from "../components/NewsCard";
import NewsSlider from "../components/NewsSlider";
import NewsTag from "../components/NewsTag";

const NewsTypeDetail = () => {
  const {
    query: { slug },
    locale,
  } = useRouter();
  const limit = 9;
  const [page, setPage] = React.useState(1);

  const { data: newsType, isLoading: newsTypeLoading } = useFetchNewsType(slug);
  // console.log("newsType", newsType);
  const { data: newsTypes } = useFetchNewsTypes();
  const { data: newsHot, isLoading } = useFetchNewsList(
    slug && {
      populate: "*",
      filters: {
        loai_tin_tuc: {
          slug: slug,
        },
        hot: true,
      },
    }
  );
  const { data: news, isFetched } = useFetchNewsList(
    slug && {
      populate: "*",
      filters: {
        loai_tin_tuc: {
          slug: slug,
        },
      },
      pagination: {
        page: page,
        pageSize: limit,
      },
    }
  );

  const label = {
    vi: {
      breadcrumbs: [
        { href: "/", title: "Trang chủ" },
        { href: "/tin-tuc", title: "Tin tức" },
        { href: "", title: newsType?.attributes?.title },
      ],
      ngayTruoc: "ngày trước",
      gioTruoc: "giờ trước",
      phutTruoc: "phút trước",
      noComment: "Hãy trở thành người đầu tiên bình luận cho bài viết này",
      noNews: "Tin tức không tồn tại",
      titleRelated: "Tin liên quan",
      defaultSeoTitle: "Tin ZenOne | Đầu tư bất động sản Blockchain",
    },
    en: {
      breadcrumbs: [
        { href: "/", title: "Home" },
        { href: "/tin-tuc", title: "News" },
        { href: "", title: newsType?.attributes?.title },
      ],
      ngayTruoc: "days before",
      gioTruoc: "hours ago",
      phutTruoc: "minutes ago",
      noComment: "Be the first to comment on this post",
      noNews: "News does not exist",
      titleRelated: "Related news",
      defaultSeoTitle: "News ZenOne | Blockchain real estate investment",
    },
  };

  return (
    <Box>
      <DefaultSEO />

      <Container>
        <Box pt={20}>
          <AppBreadcrumbs
            items={label?.[locale]?.breadcrumbs}
            isLoading={newsTypeLoading}
          />
          <Box
            sx={(theme) => ({
              width: "100%",
              padding: "30px 0 0",
              [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                padding: "30px 0 0",
                minWidth: "auto",
              },
            })}
          >
            <NewsSlider data={newsHot?.data} isLoading={isLoading} />
          </Box>

          <NewsContainer>
            <Line index={0} />
            <Stack align={"center"}>
              <Box>
                <HomeTitle>
                  Tin tức <span className="company-name">ADALINE</span>
                </HomeTitle>
              </Box>
              <Box>
                <Group spacing={6} position="center">
                  {newsTypes?.data?.map((item, k) => (
                    <Link
                      key={k}
                      href={`/tin-tuc/${item?.attributes?.slug}`}
                      passHref
                    >
                      <a>
                        <NewsTag
                          active={item?.attributes?.slug === slug}
                          key={k}
                        >
                          {item?.attributes?.title}
                        </NewsTag>
                      </a>
                    </Link>
                  ))}
                </Group>
              </Box>
              <Box sx={{ width: "100%" }} my={15}>
                <Grid>
                  {news?.data?.length
                    ? news?.data?.map((item, k) => (
                        <Grid.Col xs={6} sm={6} md={4} key={k}>
                          <NewsCard data={item} />
                        </Grid.Col>
                        // eslint-disable-next-line no-mixed-spaces-and-tabs
                      ))
                    : Array(limit)
                        .fill(undefined)
                        .map((item, k) => (
                          <Grid.Col xs={6} md={4} key={k}>
                            <NewsCard data={item} isLoading={true} />
                          </Grid.Col>
                        ))}
                </Grid>
              </Box>
              {isFetched && !news?.data?.length ? (
                <Box>{label?.[locale]?.noNews}</Box>
              ) : (
                <Pagination
                  page={page}
                  total={news?.meta?.pagination?.pageCount}
                  onChange={setPage}
                />
              )}
            </Stack>
          </NewsContainer>

          <Line index={1} />
          <DownloadHome />
        </Box>
      </Container>
    </Box>
  );
};

export async function getStaticPaths() {
  let paths = [];

  const newsTypes = await fetchNewsTypes();

  (newsTypes?.data || []).map((type) => {
    paths.push({
      params: { slug: type?.attributes?.slug },
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(newsTypeKeys.detail(slug), () =>
    fetchNewsType(slug)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
}

export default NewsTypeDetail;
