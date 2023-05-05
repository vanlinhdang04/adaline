import Layout from "@/common/MainLayout";
import APIProvider from "@/setup/flexbiz-api-provider";
// import { LocaleProvider } from "@/setup/locale-provider";
import ThemeProvider from "@/setup/mantine-provider";
import ReactQueryProvider from "@/setup/react-query";
import "@/styles/blogview.css";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import Script from "next/script";
import "setimmediate";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "styles/ckeditor5.css";
import "styles/global.css";
import "styles/products.css";
import "styles/reset.css";
import "styles/verifyOtpForm.css";
import "styles/webview.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      {/* <Script id="google-tag-manager" strategy="afterInteractive">
        {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WDCZG99')
    `}
      </Script> */}
      <ReactQueryProvider pageProps={pageProps}>
        <ThemeProvider>
          <APIProvider>
            {/* <LocaleProvider> */}
            <DefaultSeo {...SEO} />
            {getLayout(<Component {...pageProps} />)}
            {/* </LocaleProvider> */}
          </APIProvider>
        </ThemeProvider>
      </ReactQueryProvider>

      <Script
        id="tawk"
        strategy="afterInteractive"
        async
        type="text/javascript"
      >
        {`
					var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
					(function(){
					var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
					s1.async=true;
					s1.src='https://embed.tawk.to/5a5dd6254b401e45400c2076/default';
					s1.charset='UTF-8';
					s1.setAttribute('crossorigin','*');
					s0.parentNode.insertBefore(s1,s0);
					})();
				`}
      </Script>
    </>
  );
}

export default MyApp;
