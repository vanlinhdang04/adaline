import placeholderGIF from "@/public/images/placeholder.gif";

const appendImageFromAPI = (path) => {
  if (!path) return placeholderGIF;
  return process.env.NEXT_PUBLIC_STRAPI_API_URL + path;
};

export default appendImageFromAPI;
