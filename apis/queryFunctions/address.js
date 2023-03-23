import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";

export const fetchListCity = async () => {
  return await asyncGetList({
    collection_name: "tinhthanh",
    options: {
      status: true,
    },
  });
};

export const fetchListDistrict = async (cityId) => {
  return await asyncGetList({
    collection_name: "quanhuyen",
    options: {
      status: true,
      condition: {
        ten_tinh_thanh: cityId,
      },
    },
  });
};

export const fetchListWard = async (districtId) => {
  return await asyncGetList({
    collection_name: "xaphuong",
    options: {
      status: true,
      condition: {
        ten_quan_huyen: districtId,
      },
    },
  });
};
