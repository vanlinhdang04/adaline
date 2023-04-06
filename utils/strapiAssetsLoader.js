const strapiAssetsLoader = ({ src }) => {
  if (src?.indexOf("http") >= 0) return src;
  else return `${process.env.STRAPI_ASSETS_BASE_URL}${src}`;
};

export default strapiAssetsLoader;
