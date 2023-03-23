import { Breadcrumbs, Skeleton, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import imgBreadcrumbs from "public/icons/vector_breadcrumbs.png";

const AppBreadcrumbs = ({ items, isLoading }) => {
	return (
		<Skeleton visible={isLoading}>
			<Breadcrumbs
				separator={
					<Image src={imgBreadcrumbs} alt="vector" width={10} height={12} />
				}
			>
				{items?.map((item, index) => (
					<Link key={index} href={item.href || "#"} scroll={false}>
						<a>
							{/* <Anchor href={item.href}> */}
							<Text
								color={"#000"}
								size="xs"
								lineClamp={index === items.length - 1 ? 1 : 2}
								sx={{
									width:
										index === items.length - 1 ? "fit-content" : "max-content",
								}}
								weight={index === items.length - 1 ? 600 : 400}
							>
								{item.title}
							</Text>
							{/* </Anchor> */}
						</a>
					</Link>
				))}
			</Breadcrumbs>
		</Skeleton>
	);
};

AppBreadcrumbs.propTypes = {
	items: PropTypes.array.isRequired,
};

export default AppBreadcrumbs;
