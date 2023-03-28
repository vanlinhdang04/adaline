import React from "react";

const appendImageFromAPI = (path) => {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + path;
};

export default appendImageFromAPI;
