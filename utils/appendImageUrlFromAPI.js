import imgDefault from "public/images/loading.gif";
export default function appendImageUrlFromAPI({ src, size }) {
  const IMAGE_SIZES = ["x", "s", "m", "l", "2k", "xl"];
  let _src = src;
  if (!src) return imgDefault;
  if (size && !IMAGE_SIZES.includes(size.toLowerCase())) {
    alert(`size: ${size} provided is invalid`);
  }
  if (src && String(src).indexOf("http") < 0) {
    _src = `${process.env.server_url_report}${src}?access_token=${
      process.env.public_token
    }&trustkey=${process.env.trustkey}${size ? `&size=${size}` : ""}`;
  }

  return _src;
}
