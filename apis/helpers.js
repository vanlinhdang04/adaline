const list_not_require_id_app_default = [
  "user",
  "users",
  "notification",
  "message",
  "listinfo",
  "moduleinfo",
  "reportinfo",
  "tableinfo",
  "labelinfo",
  "trangthai",
  "app",
  "sysgroup",
  "sysconfig",
  "schedule",
  "templatestore",
  "tinhthanh",
  "quanhuyen",
  "xaphuong",
  "token",
  "importexceltemplate",
  "exportexceltemplate",
  "ecomcategories",
  "ecomproductbrands",
  "ecomproduct_orgins",
  "ecomproductbrand_banners",
  "ecomproductproperties",
  "ecomproductoptions",
  "ecomproductbrand_categories",
  "ecomproductlines",
];

export function getIdApp(collection_name, options) {
  let id_app;

  if (list_not_require_id_app_default.includes(collection_name)) {
    id_app = "";
  } else {
    id_app = options?.id_app || process.env.id_app;
  }
  return id_app;
}
export function prepareURL(collection_name, id_app, access_token) {
  if (!collection_name) return;
  let _id_app = id_app ? `/${id_app}` : "";
  return `${process.env.server_url_report}/api${_id_app}/${collection_name}?access_token=${access_token}&trustkey=${process.env.trustkey}`;
}
export function appendOptionsToURL(
  url,
  { page, sort, condition, fields, limit, notfields, count }
) {
  if (!url) return;
  let appendedURL;
  let _page = 1;
  if (page) _page = page;
  appendedURL = `&page=${_page}`;
  if (sort) appendedURL = `${appendedURL}&sort=${JSON.stringify(sort)}`;
  if (condition && Object.keys(condition).length > 0)
    appendedURL = `${appendedURL}&q=${JSON.stringify(condition)}`;
  if (fields) appendedURL = `${appendedURL}&fields=${fields}`;
  if (limit) appendedURL = `${appendedURL}&limit=${limit}`;
  if (notfields) appendedURL = `${appendedURL}&notfields=${notfields}`;
  if (count) appendedURL = `${appendedURL}&count=1`;

  return url + appendedURL;
}
