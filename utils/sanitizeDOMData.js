import { Box } from "@mantine/core";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
// import Image from "next/future/image";
import appendImageFromAPI from "./appendImageFromAPI";
import strapiAssetsLoader from "./strapiAssetsLoader";

const parseOptions = {
  replace: ({ attribs, name }) => {
    if (!attribs) {
      return;
    }
    if (name === "img") {
      return (
        <Box
          sx={{
            position: "relative",
            aspectRatio: attribs["data-ratio"] || "1",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Image
            src={appendImageFromAPI(attribs?.src)}
            // loader={strapiAssetsLoader}
            alt={attribs?.alt || "strapi"}
            layout="fill"
            // unoptimized={true}
          />
        </Box>
      );
    }
    // if (name === "figure") {
    //   return (
    //     <Box
    //       sx={{
    //         position: "relative",
    //         aspectRatio: attribs["data-ratio"] || "1",
    //       }}
    //       // style={attribs.style}
    //     >
    //       {domToReact(children)}
    //     </Box>
    //   );
    // }
    // if (attribs.dir === "ltr") {
    //   return <div>{domToReact(children)}</div>;
    // }
  },
};

export default function sanitizeDOMData(
  htmlString,
  options = { replace: parseOptions.replace }
) {
  const cleanString = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  const html = parse(cleanString, {
    replace: parseOptions.replace,
    ...options,
  });
  return html;
}
