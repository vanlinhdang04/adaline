import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { isEmpty } from "@/utils/lodash";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

function DefaultSEO({ seo }) {
  const { locale } = useRouter();
  if (!seo || isEmpty(seo)) return null;

  const images = [];
  if (seo.shareImage) {
    images.push({
      url: process.env.NEXT_PUBLIC_STRAPI_API_URL + seo?.shareImage,
      width: 1200,
      height: 630,
      alt: "Đầu tư cùng ZenOne",
      type: "image/*",
    });
  }
  if (seo.picture2) {
    images.push({
      url: appendImageUrlFromAPI({ src: seo.picture2, size: "xl" }),
      width: 1200,
      height: 1200,
      alt: "ZenOne logo",
      type: "image/*",
    });
  }

  return (
    <NextSeo
      title={seo?.title}
      description={seo?.description}
      openGraph={{
        url: seo?.url
          ? `${process.env.SITE_URL}${seo.url}`
          : process.env.SITE_URL,
        title: seo.title,
        description: seo.description,
        images,
        locale,
        type: seo.type || "website",
        siteName: "ZenOne",
        article: {
          ...(seo?.article || {}),
        },
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
}

export default DefaultSEO;
