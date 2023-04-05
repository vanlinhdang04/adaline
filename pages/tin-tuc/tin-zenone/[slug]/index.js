import {
  fetchNewsArticle,
  fetchNewsArticles,
  useFetchNewsArticle,
} from "@/apis/queryFunctions/news";
import { fetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import { newsKeys } from "@/apis/queryKeys";
import Container, {
  DetailContainer,
  NewsContainer,
} from "@/common/MainLayout/Container";
import AppBreadcrumbs from "@/common/components/Breadcrumbs";
import DefaultSEO from "@/common/components/DefaultSEO";
import Line from "@/common/components/Line";
import Related from "@/common/components/Related";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Skeleton, Stack, Text } from "@mantine/core";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import CommentForm from "../../components/CommentForm";
import CommentView from "../../components/CommentView";
import DetailContent from "../../components/DetailContent";
import DetailTitle from "../../components/DetailTitle";

export default function DetailTinZenone() {
  const [notFound, setNotFound] = React.useState(null);
  const {
    query: { slug },
    locale,
    asPath,
  } = useRouter();
  const { data: detail, isFetched } = useFetchNewsArticle(slug);

  const label = {
    vi: {
      breadcrumbs: [
        { href: "/", title: "Trang chủ" },
        { href: "/tin-tuc/tin-zenone", title: "Tin ZenOne" },
        { href: "", title: detail?.title },
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
        { href: "/tin-tuc/tin-zenone", title: "News ZenOne" },
        { href: "", title: detail?.title },
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

  const created = dayjs(detail?.date_updated);
  const diff =
    dayjs().diff(created, "d") > 0
      ? `${dayjs().diff(created, "d")} ${label?.[locale]?.ngayTruoc}`
      : dayjs().diff(created, "h") > 0
      ? `${dayjs().diff(created, "h")} ${label?.[locale]?.gioTruoc}`
      : `${dayjs().diff(created, "m")} ${label?.[locale]?.phutTruoc}`;

  React.useEffect(() => {
    if (isFetched && !detail?.title) {
      setNotFound(
        <DetailTitle align={"center"}>{label?.[locale]?.noNews}</DetailTitle>
      );
    }
  }, [isFetched, detail]);

  if (notFound) {
    return (
      <div>
        <DefaultSEO seo={seo} />

        <Container>
          <Box py={20} style={{ minHeight: "100%" }}>
            {notFound}
          </Box>
        </Container>
      </div>
    );
  }

  const seo = {
    title:
      detail?.seo_title ||
      detail?.title ||
      label?.[locale]?.defaultSeoTitle ||
      "Tin Tức",
    description: detail?.seo_description || "",
    picture1: detail?.picture,
    type: "article",
    url: asPath,
    article: {
      publishedTime: created.toISOString(),
      section: detail?.loai_tin_tuc,
      tags: detail?.seo_tags?.split(",") || [],
    },
  };

  return (
    <Box>
      <DefaultSEO seo={seo} />
      {/* <Head>
				<title>{detail?.title || "Tin tức ZenOne"}</title>
			</Head> */}
      <Container>
        <AppBreadcrumbs
          items={label?.[locale]?.breadcrumbs}
          isLoading={!detail}
        />
        <NewsContainer>
          <Box py={30}>
            <Skeleton
              visible={!detail}
              sx={(theme) => ({
                marginBottom: 38,
                minHeight: 40,
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  marginBottom: 16,
                },
              })}
            >
              <Stack align={"center"} spacing={8}>
                <DetailTitle>{detail?.title}</DetailTitle>
                <Text size={"xs"}>{diff}</Text>
              </Stack>
            </Skeleton>
            <Skeleton visible={!detail}>
              <Box
                sx={(theme) => ({
                  borderRadius: "63px",
                  width: "100%",
                  aspectRatio: "2.22",
                  position: "relative",
                  overflow: "hidden",
                  margin: "0 auto",
                  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                    borderRadius: "17px",
                  },
                })}
              >
                <Image
                  src={appendImageUrlFromAPI({ src: detail?.picture })}
                  alt={detail?.title}
                  layout="fill"
                  priority
                  quality={100}
                  objectFit="cover"
                  style={{
                    borderRadius: "17px",
                  }}
                />
              </Box>
            </Skeleton>
            <DetailContainer>
              <DetailContent isLoading={!detail}>
                {sanitizeDOMData(detail?.content, {})}
              </DetailContent>
              <Box>
                <Text size={"sm"}>
                  <b>Tags: </b>
                  {detail?.seo_tags}
                </Text>
              </Box>
              <Box
                sx={(theme) => ({
                  marginTop: 56,
                  [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                    marginTop: 24,
                  },
                })}
              >
                <CommentView
                  from={slug}
                  sx={(theme) => ({
                    marginBottom: 40,
                    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                      marginBottom: 24,
                    },
                  })}
                  locale={locale}
                />
                <CommentForm from={slug} locale={locale} />
              </Box>
            </DetailContainer>
            <Line index={1} />
            {detail && (
              <Related
                title={label?.[locale]?.titleRelated}
                options={{
                  limit: 3,
                  condition: {
                    loai_tin_tuc: {
                      $in: [detail?.loai_tin_tuc],
                    },
                    _id: { $nin: [detail?._id] },
                  },
                }}
                pathname={"/tin-tuc/tin-zenone"}
              />
            )}
          </Box>
        </NewsContainer>
      </Container>
    </Box>
  );
}

export async function getStaticPaths({ locales }) {
  let paths = [];
  for (const locale of locales) {
    const dataZenOne = await fetchPageInfo("web-news-zenone", {
      condition: { ngon_ngu: locale },
    });
    const types = getFieldFromFieldId(
      "types",
      "id",
      dataZenOne?.add_on_5,
      true
    );
    const newsType = types?.reduce((arr, curr) => {
      curr?.text_field?.map((item) => {
        if (item?.content_id === "id" && item?.shared) {
          arr.push(item.content);
        }
      });

      return arr;
    }, []);
    const newsArticles = await fetchNewsArticles(
      newsType && {
        page: 1,
        condition: {
          // ngon_ngu: "vi",
          loai_tin_tuc: { $in: [...newsType] },
        },
        limit: 100,
      }
    );
    // console.log("newsArticles", newsArticles);

    (newsArticles || []).map((newsArticle) => {
      paths.push({
        params: { slug: String(newsArticle.slug) },
        locale,
      });
    });
  }
  // const dataZenOne = await fetchPageInfo("web-news-zenone");
  // const types = getFieldFromFieldId("types", "id", dataZenOne?.add_on_5, true);
  // const newsType = types?.reduce((arr, curr) => {
  // 	curr?.text_field?.map((item) => {
  // 		if (item?.content_id === "id" && item?.shared) {
  // 			arr.push(item.content);
  // 		}
  // 	});

  // 	return arr;
  // }, []);

  // const newsArticles = await fetchNewsArticles({
  // 	page: 1,
  // 	condition: {
  // 		// ngon_ngu: "vi",
  // 		loai_tin_tuc: { $in: [...newsType] },
  // 	},
  // 	limit: 100,
  // });

  // paths = (newsArticles || []).map((newsArticle) => ({
  // 	params: { slug: String(newsArticle.slug) },
  // }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params = {} }) {
  const slug = params?.slug;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    newsKeys.detail(slug),
    () => fetchNewsArticle(slug),
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
