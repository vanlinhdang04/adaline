import {
  useFetchNews,
  useFetchNewsType,
  useFetchNewsTypes,
} from "@/api/queryFunctions/news";
import Container, { NewsContainer } from "@/common/MainLayout/Container";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import DownloadHome from "@/common/components/Home/DownloadHome";
import HomeTitle from "@/common/components/HomeTitle";
import Line from "@/common/components/Line";
import {
  Box,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DetailTitle from "../components/DetailTitle";
import NewsCard from "../components/NewsCard";
import NewsSlider from "../components/NewsSlider";
import NewsTag from "../components/NewsTag";

const NewsTypeDetail = () => {
  const {
    query: { slug, id },
    locale,
    asPath,
  } = useRouter();
  const limit = 9;
  const [page, setPage] = React.useState(1);
  // const { data: newsType, isLoading: newsTypeisLoading } = useFetchNewsType(id);
  const { data: newsTypeList, isLoading: newsTypeisLoading } =
    useFetchNewsTypes({
      populate: "*",
      filters: {
        slug,
      },
    });
  const newsType = newsTypeList?.data?.[0];
  const { data: newsTypes } = useFetchNewsTypes();
  const {
    data: newsHot,
    isLoading,
    isFetching,
  } = useFetchNews(
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
  const { data: news, isFetched } = useFetchNews(
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
  console.log("newsHotLoading", newsType);

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
            isLoading={newsTypeisLoading}
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
            {/* {JSON.stringify(newsHot?.data)} */}
            {/* {Boolean(newsHot?.data?.length) && (
              )} */}
            <NewsSlider
              data={newsHot?.data}
              isLoading={isLoading}
              pathname={`/tin-tuc/${newsType?.attributes?.slug}`}
            />
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
                  {Boolean(news?.data?.length)
                    ? news?.data?.map((item, k) => (
                        <Grid.Col xs={6} sm={6} md={4} key={k}>
                          <NewsCard
                            data={item}
                            pathname={`/tin-tuc/${newsType?.attributes?.slug}`}
                          />
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
              {isFetched && !Boolean(news?.data?.length) ? (
                <Box>{label?.[locale]?.noNews}</Box>
              ) : (
                <Pagination
                  page={page}
                  total={news?.meta?.pagination?.total}
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

export default NewsTypeDetail;
