import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { Box, Skeleton, Text } from "@mantine/core";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewsCard({ data, isLoading = false, pathname = "" }) {
	return (
		<Link href={`${pathname}/${data?.slug}`}>
			<Box
				pb={"xs"}
				sx={{
					cursor: "pointer",
					transition: "0.3s",
					borderRadius: 13,
					height: "100%",

					// [`&:hover`]: {
					// 	transform: "translateY(-18px)",
					// 	boxShadow: `20px 20px 40px rgba(43, 223, 206, 0.3)`,
					// },
				}}
			>
				<Skeleton visible={isLoading} radius={15}>
					<div
						style={{
							overflow: "hidden",
							width: "100%",
							aspectRatio: "1.05",
							position: "relative",
						}}
					>
						<Image
							src={appendImageUrlFromAPI({ src: data?.picture })}
							alt="newscard img"
							// width={564}
							// height={544}
							layout="fill"
							//placeholder="blur"
							blurDataURL={"https://via.placeholder.com/521x502"}
							objectFit="cover"
						/>
					</div>
				</Skeleton>
				<Box my={12}>
					<Skeleton visible={isLoading}>
						<Text
							size="xs"
							color={"#001529"}
							weight={400}
							transform="uppercase"
						>
							{dayjs(data?.date_updated).format("MMM DD, YYYY")}
						</Text>
					</Skeleton>
				</Box>
				<Box>
					<Skeleton visible={isLoading}>
						<Text size={"md"} weight={500} color="#001529" lineClamp={4}>
							{data?.title || "title bai viet"}
							{/* {data?.title} */}
						</Text>
					</Skeleton>
				</Box>
			</Box>
		</Link>
	);
}
