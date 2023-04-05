export const newsKeys = {
  list: (params, options) => [
    {
      scope: "/tin-tucs",
      type: "list",
      params,
      options,
    },
  ],
  detail: (slug, params, options) => [
    {
      scope: "/tin-tucs",
      type: "detail",
      slug,
      params,
      options,
    },
  ],
};
