import {
  fetchNews,
  fetchNewsList,
  useFetchNews,
} from "@/api/queryFunctions/news";
import Container from "@/common/MainLayout/Container";
import BlogDetails from "@/common/components/Blog/BlogDetails";
import BlogSideBar from "@/common/components/Blog/BlogSideBar";
import DownloadHome from "@/common/components/Home/DownloadHome";
import { Box, Grid } from "@mantine/core";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { newsKeys } from "./../../../../api/queryKeys/newsKeys";

const NewsDetail = () => {
  const {
    query: { slugNews },
  } = useRouter();

  const { data } = useFetchNews(slugNews);

  React.useEffect(() => {
    console.log("onLoad");
  }, []);

  return (
    <Box bg={"#fafafd"} pt={30} className="blog-container">
      <Container>
        <Grid gutter={24} pb={"md"}>
          <Grid.Col sm={12} md={8}>
            <BlogDetails data={data} />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <BlogSideBar data={data} />
          </Grid.Col>
        </Grid>

        <DownloadHome />
      </Container>
    </Box>
  );
};

export async function getStaticPaths() {
  const allPost = await fetchNewsList({
    fields: ["siteSlug"],
    populate: ["loai_tin_tuc"],
  });

  console.log(allPost);

  //   const newsTypes = await fetchNewsTypes();
  //   newsTypes?.data?.map(async (newsType) => {
  //     // console.log("a", newsType?.attributes?.slug);
  //     const posts = await fetchNewsList({
  //       populate: "*",
  //       filters: {
  //         loai_tin_tuc: {
  //           slug: newsType?.attributes?.slug,
  //         },
  //       },
  //     });

  //     (posts?.data || []).map((post) => {
  //       paths.push({
  //         params: {
  //           slug: newsType?.attributes?.slug,
  //           //   slugNews: post?.attributes?.siteSlug,
  //         },
  //       });
  //     });
  //     // console.log("paths", paths);
  //   });

  return {
    paths: allPost?.data?.map((post) => ({
      params: {
        slug: String(post?.attributes?.loai_tin_tuc?.data?.attributes?.slug),
        slugNews: String(post?.attributes?.siteSlug),
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slugNews } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    newsKeys.detail(slugNews),
    () => fetchNews(slugNews),
    {
      enabled: !!slugNews,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
}

export default NewsDetail;
