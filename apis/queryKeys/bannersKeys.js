import { flattenObj } from "@/utils/lodash";

const sort = {
  date_created: -1,
};

const bannersKeys = {
  all: [{ scope: "ecombanners", limit: 100, sort }],
  count: (options) => [
    {
      scope: "ecombanners",
      type: "count",
      ...flattenObj(options || {}),
    },
  ],
  list: (vi_tri) => [
    {
      scope: "ecombanners",
      type: "list",
      vi_tri,
    },
  ],
  detail: (_id) => [{ scope: "ecombanners", type: "detail", _id }],
};

export default bannersKeys;
