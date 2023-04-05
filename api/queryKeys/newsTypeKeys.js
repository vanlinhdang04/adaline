export const newsTypeKeys = {
  list: (params, options) => [
    {
      scope: "/loai-tin-tucs",
      type: "list",
      params,
      options,
    },
  ],
  detail: (slug, params, options) => [
    {
      scope: "/loai-tin-tucs",
      type: "detail",
      slug,
      params,
      options,
    },
  ],
};
