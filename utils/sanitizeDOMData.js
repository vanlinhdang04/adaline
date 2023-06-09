import { Box } from "@mantine/core";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
// import Image from "next/future/image";
import placeholderGIF from "@/public/images/placeholder.gif";
// import { uid } from "uid";
import appendImageFromAPI from "./appendImageFromAPI";
import slugify from "./slugifyString";
// import strapiAssetsLoader from "./strapiAssetsLoader";

const parseOptions = {
  replace: ({ attribs, name, children }) => {
    if (!attribs) {
      return;
    }
    if (name === "img") {
      attribs.srcSet = attribs?.srcSet?.replace(
        /\/uploads/g,
        process.env.NEXT_PUBLIC_STRAPI_API_URL + "/uploads"
      );
      attribs.src = appendImageFromAPI(attribs?.src);
      // return (
      //   <Box
      //     sx={{
      //       position: "relative",
      //       aspectRatio: attribs["data-ratio"] || "1",
      //       width: "100%",
      //       alignSelf: "center",
      //     }}
      //   >
      //     <Image
      //       src={appendImageFromAPI(attribs?.src)}
      //       // loader={strapiAssetsLoader}
      //       alt={attribs?.alt || "strapi"}
      //       layout="fill"
      //       placeholder="blur"
      //       blurDataURL={placeholderGIF.src}
      //       // unoptimized={true}
      //     />
      //   </Box>
      // );
    }
    if (
      name === "h1" ||
      name === "h2" ||
      name === "h3" ||
      name === "h4" ||
      name === "h5" ||
      name === "h6"
    ) {
      attribs.id = slugify(children[0]?.data);
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
