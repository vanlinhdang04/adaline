export const queryKeyList = (path, urlParamsObject = {}, options = {}) => [
  {
    scope: path,
    params: urlParamsObject,
    options: options,
    type: "list",
  },
];

export const queryKeyDetail = (
  path,
  id = "",
  urlParamsObject = {},
  options = {}
) => [
  {
    scope: path,
    params: urlParamsObject,
    options: options,
    type: "detail",
    id: id,
  },
];
