/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    domains: [
      "localhost",
      "api.flexzen.app",
      "https://admin.zenone.com.vn/",
      "via.placeholder.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
    // next,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: "https://cms.adaline.app",
    SITE_URL: "https://zenone.com.vn",
    referral_url: "https://referral.zenone.com.vn",
    server_url: "https://api.flexzen.app",
    server_url_report: "https://api.flexzen.app",
    // SITE_URL: "http://localhost:300",
    app_url: "",
    app_code: "ZENONE_WEBSITE",
    again_link: "/#/checkout-alert",
    id_app: "60ed6c978237dc54da4c63d6",
    public_token: "flex.public.token",
    trustkey: "APP.FKJSHHHH908KJF",
    GOOGLE_MAPS_APIKEY: "AIzaSyBLwpy2bsM4qFJ6tqFiYuPtrQUnpZkL-14",
    GOOGLE_RECAPTCHA_SITE_KEY: "6Lf25qEUAAAAAFHwh_XZw-YY6HXTdyv2xEp9AHbt",
    google_client_id:
      "936207774867-d5nvdms0bpau4kfqrdnh6mmapkcpd87c.apps.googleusercontent.com",
    google_secret: "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",
    google_api_key: "AIzaSyA-6ApUH1WK7HQl4a8sfPnE9JD7NT7Dhr0",
    // facebook_app_id: "",
    facebook_page_id: "109797561801610",
    app_name: "ZenOne",
    app_name_en: "ZenOne",
    DEFAULT_STALE_TIME: 3600000, // 1 === 1 ms | 1 * 1000 * 60 * 60 === 1 hour
    NEWS_LOADING_LIMIT: 8,
    group_id: "6285ea90c192636c0d85df48",
    currency: "vnd",
    ENABLE_MOCK_USER_SIGNUP: false,
  },
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: "/tin-tuc",
        destination: "/tin-tuc/tin-zenone",
        permanent: true,
      },
      {
        source: "/san-pham",
        destination: "/san-pham/bat-dong-san",
        permanent: true,
      },
    ];
  },
  // async rewrites() {
  //   return [];
  // },
};

module.exports = nextConfig;
