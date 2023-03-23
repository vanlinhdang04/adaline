import { flattenObj } from "@/utils/lodash";

const sort = {
  date_updated: -1,
};

const wishListKeys = {
  all: [{ scope: "ecomwishlist", limit: 100, sort }],
  count: (options) => [
    {
      scope: "ecomwishlist",
      type: "count",

      ...flattenObj(options || {}),
    },
  ],
  list: (options) => [
    {
      scope: "ecomwishlist",
      type: "list",
      sort,
      ...flattenObj(options || {}),
    },
  ],

  detail: (ma_vt) => [{ scope: "ecomwishlist", type: "detail", ma_vt }],
};

export default wishListKeys;
