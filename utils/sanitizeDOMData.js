import parse, { domToReact } from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

const parseOptions = {
  replace: ({ attribs, children }) => {
    if (!attribs) {
      return;
    }
    if (attribs.dir === "ltr") {
      return <div>{domToReact(children)}</div>;
    }
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
    // replace: parseOptions.replace,
    ...options,
  });
  return html;
}
