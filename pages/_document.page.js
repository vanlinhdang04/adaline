/* eslint-disable react/no-unknown-property */
import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          {/* {process.env.NODE_ENV === "production" && (
            <Script
              id="facebook-chat"
              strategy="lazyOnload"
              onError={(e) => {
                console.error(
                  "FACEBOOK chat messenger Script failed to load",
                  e
                );
              }}
              dangerouslySetInnerHTML={{
                __html: `
                      window.fbAsyncInit = function () {
                        FB.init({
                          xfbml: true,
                          version: "v14.0",
                        });
                      };
                      (function (d, s, id) {
                        var js,
                          fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
                        fjs.parentNode.insertBefore(js, fjs);
                      })(document, "script", "facebook-jssdk");
                    `,
              }}
            />
          )} */}
          {process.env.NODE_ENV === "production" && (
            <meta
              name="google-site-verification"
              content="57MFGSUq0Mz9RIjSZBfoqbYmOxegVNiHeiJeSVH6eFs"
            />
          )}

          {/* <!-- Google tag (gtag.js) --> */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-32405637-2"
            strategy="afterInteractive"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
						window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-32405637-2');
						`}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="fb-root"></div>

          <div
            id="fb-customer-chat"
            className="fb-customerchat"
            attribution="biz_inbox"
            page_id={process.env.facebook_page_id}
            greeting_dialog_display="fade"
            greeting_dialog_delay="1"
          />

          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WDCZG99" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
