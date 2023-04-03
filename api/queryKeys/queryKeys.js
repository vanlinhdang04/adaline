export const queryKeyList = (path, params = {}, options = {}) => [
  {
    scope: path,
    params: params,
    options: options,
    type: "list",
  },
];

export const queryKeyDetail = (path, id = "") => [
  {
    scope: path,
    id: id,
    type: "detail",
  },
];
