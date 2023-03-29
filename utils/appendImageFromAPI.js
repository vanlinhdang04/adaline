import imgDefault from "public/images/loading.gif";
import React from "react";

const appendImageFromAPI = (path) => {
  if (!path) return imgDefault;
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + path;
};

export default appendImageFromAPI;
