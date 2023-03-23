// import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import { CardProduct } from "@/common/components/CardProduct";
import { getFieldFromFieldId } from "@/utils/getFieldFromFieldId";
import slugify from "@/utils/slugifyString";
import {
	Box,
	Center,
	Grid,
	Loader,
	Pagination,
	SimpleGrid,
	Text,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductItem({ listProduct, isFetching }) {
	const { locale } = useRouter();
	const [page, setPage] = React.useState(1);
	const [limit] = React.useState(9);
	const [height, setHeight] = React.useState(400);
	React.useEffect(() => {
		if (window.innerWidth < 768) {
			setHeight(600);
		}
	}, []);

	const label = {
		vi: {
			notFound: "Chưa có sản phẩm ở nhóm này",
		},
		en: {
			notFound: "There are no products in this group",
		},
	};

	return (
		<Grid.Col xs={12} lg={9}>
			{listProduct?.length > 0 ? (
				<SimpleGrid
					sx={{
						gap: 30,
					}}
					cols={3}
					breakpoints={[
						{ maxWidth: 600, cols: 2 },
						{ maxWidth: 1000, cols: 3 },
					]}
				>
					{listProduct
						?.sort((a, b) => +a?.summary - +b?.summary)
						?.slice((page - 1) * limit, page * limit)
						?.map((item, index) => {
							const ten_san_pham =
								getFieldFromFieldId("title", "content_id", item?.text_field)
									?.label || "";
							return (
								<Link
									href={`/san-pham/bat-dong-san/${slugify(
										item?.title + " " + item.ma_trang
									)}`}
									key={index}
								>
									<a>
										<CardProduct data={item} />
									</a>
								</Link>
							);
						})}
				</SimpleGrid>
			) : (
				<Center
					style={{
						minHeight: height - 200,
					}}
				>
					{isFetching ? <Loader /> : <Text>{label?.[locale]?.notFound}</Text>}
				</Center>
			)}

			{listProduct?.length > 0 && (
				<Box
					sx={(theme) => ({
						display: "flex",
						justifyContent: "flex-end",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							justifyContent: "center",
						},
					})}
					mt={40}
				>
					<Pagination
						total={Math.ceil(listProduct?.length / limit)}
						onChange={setPage}
					/>
				</Box>
			)}
		</Grid.Col>
	);
}

export default ProductItem;
