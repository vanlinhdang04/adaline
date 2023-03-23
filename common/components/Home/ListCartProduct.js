import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import {
	addtrackingEvent,
	TRACKING_NAMES,
	TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Center, Grid } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CartHome } from "../CartProductType";
import HomeTitle from "../HomeTitle";

// const useStyles = createStyles((theme) => ({
//   title: {
//     fontSize: 36,
//     flexDirection: "row",
//     fontWeight: 400,
//     display: "flex",
//   },
//   brandName: {
//     color: theme.colors.main[1],
//     fontWeight: 700,
//     paddingLeft: 8,
//   },
// }));

function ListCartProduct({ data }) {
	const { locale } = useRouter();
	const { data: pageContent } = useFetchPageInfo(
		"web/home/product-type",
		{ condition: { ngon_ngu: locale } },
		data
	);

	const { text_field } = data || {};
	const { content_editor } =
		text_field?.find((el) => el.content_id === "title") || {};

	const { add_on_4: productTypes } = pageContent || {};

	return (
		<>
			<Center my="sm">
				<HomeTitle>{sanitizeDOMData(content_editor)}</HomeTitle>
			</Center>
			<Grid>
				{productTypes &&
					productTypes
						.sort((a, b) => a?.stt - b?.stt)
						.map((item) => {
							const cardImage = item?.pictures?.find(
								(el) => el?.picture_id === "card-image"
							);
							const listItems = item?.text_field
								?.filter((el) => el?.content_id === "list-item")
								?.sort((a, b) => a?.stt - b?.stt)
								?.map((el) => el?.label);

							let redirectLink;
							let trackingName;
							if (item?.id === "bat-dong-san") {
								redirectLink = "/san-pham/bat-dong-san";
								trackingName = TRACKING_NAMES["TRANG_CHU_SanPham_BDS"];
							}
							if (item?.id === "co-phan-zenone") {
								// redirectLink = "/san-pham/co-phan-zenone";
								redirectLink = "#/";
								trackingName = TRACKING_NAMES["TRANG_CHU_SanPham_CPS"];
							}
							if (item?.id === "co-phan-startups") {
								// redirectLink = "/san-pham/co-phan-startups";
								redirectLink = "#/";
								trackingName = TRACKING_NAMES["TRANG_CHU_SanPham_CPZ"];
							}

							return (
								<Grid.Col
									key={item.label}
									xs={12}
									md={6}
									lg={4}
									onClick={() => {
										addtrackingEvent({
											vi_tri: TRACKING_VI_TRI["TRANG-CHU"],
											field_id: trackingName,
										});
									}}
								>
									<Link href={redirectLink} passHref>
										<a>
											<CartHome
												title={item?.label}
												imageUrl={cardImage.picture_url}
												listItems={listItems}
												isRunning={item?.shared}
											/>
										</a>
									</Link>
								</Grid.Col>
							);
						})}
			</Grid>
		</>
	);
}

export default ListCartProduct;
