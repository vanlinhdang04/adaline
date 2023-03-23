export const getIdFromSlug = (slug) => {
  if (!slug || typeof slug !== "string") return null;

  const splited = slug.split("-");
  return +splited[splited.length - 1];
};
