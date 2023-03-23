import { flattenObj } from "@/utils/lodash";

const categoryKeys = {
  all: [{ scope: "ecomcategories_cty", limit: 200 }],
  count: (options) => [
    {
      scope: "ecomcategories_cty",
      type: "count",
      ...flattenObj(options || {}),
    },
  ],
  list: (options) => [
    {
      scope: "ecomcategories_cty",
      type: "list",
      ...flattenObj(options || {}),
    },
  ],
  detailLv1: (id) => [{ scope: "ecomcategories_cty", type: "detail", id }],
  detailLv2: (slug) => [{ scope: "ecomcategories_cty", type: "detail", slug }],
};

export default categoryKeys;
