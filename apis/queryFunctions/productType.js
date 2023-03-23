import { useQuery } from "@tanstack/react-query";
import { asyncGetList } from "../fetch";

export const fetchProductType = async (options) => {
	const itemProductType = {
		ma_nhom: "Tất cả",
		ten_nhom: "Tất cả",
		_id: "Tất cả",
	};

	const listProductType = await asyncGetList({
		collection_name: "assproductgroup",
		options: {
			limit: 100,
			condition: options.condition,
		},
	});
	if (listProductType?.length) {
		listProductType.unshift(itemProductType);
	}
	return listProductType;
};

export const useFetchProductType = (options = {}) => {
	return useQuery(["productType"], () => fetchProductType(options), {
		staleTime: process.env.DEFAULT_STALE_TIME,
	});
};

export const fetchProducts = async (options = {}) => {
	if (options.condition.ma_nhom === "Tất cả") {
		delete options.condition;
	}
	return await asyncGetList({
		collection_name: "assproduct",
		options: {
			limit: 9,
			page: options.page,
			...options,
			condition: options.condition,
			sort: { ...(options?.sort || {}) },
		},
	});
};

export const useFetchProducts = (options = {}) => {
	return useQuery(["products", options.condition?.ma_nhom], () =>
		fetchProducts(options)
	);
};

export const fetchRealEstateProducts = async (options) => {
	return await asyncGetList({
		collection_name: "assproduct",
		options: {
			limit: 9,
			page: options?.page || 1,
			notfields: "vi_tri,thiet_ke,tien_nghi,mieu_ta,phap_ly",
			condition: {
				ma_loai: "Bất động sản",
			},
		},
	});
};

export const useFetchRealEstateProducts = (options = {}) => {
	return useQuery(
		[
			"products",
			{
				ma_loai: "Bất động sản",
				ma_nhom: options.condition?.ma_nhom,
				options,
			},
		],
		() => fetchProducts(options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
		}
	);
};
export const fetchHighlightedProducts = async () => {
	return await asyncGetList({
		collection_name: "assproduct",
		options: {
			limit: 4,
			// condition: {
			//   ma_loai: "Bất động sản",
			// },
		},
	});
};

export const useFetchHighlightedProducts = (options = {}) => {
	return useQuery(
		["products", "highlighted"],
		() => fetchHighlightedProducts(options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
		}
	);
};

export const useFetchCountProduct = (options = {}) => {
	return useQuery(["countProduct", options.condition?.ma_nhom], () =>
		fetchProducts(options)
	);
};
