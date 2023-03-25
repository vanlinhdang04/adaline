import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import { Box, Center, Grid, Group, Stack, Text } from "@mantine/core";
import { FiFolder } from '@react-icons/all-files/fi/FiFolder';
import { FiHeadphones } from '@react-icons/all-files/fi/FiHeadphones';
import { FiMail } from '@react-icons/all-files/fi/FiMail';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { RiShieldCheckLine } from '@react-icons/all-files/ri/RiShieldCheckLine';
import { VscFile } from '@react-icons/all-files/vsc/VscFile';
import Image from "next/image";
import React from "react";
import WhyInvestItem from "./AvantageItem";
import HomeTitle from "./HomeTitle";

export default function WhyInvest({ data }) {
	const list = data?.add_on_4?.filter((x) => x.id === "list")[0];


	const a = [
		{
			icon: <FiMail/>,
			title: 'Email mỗi ngày',
			text: 'Hỗ trợ gửi báo cáo doanh thu, nhập hàng, tồn kho qua email của bạn vào cuối ngày',
		},
		{
			icon: <FiHeadphones/>,
			title: 'Hỗ trợ',
			text: 'Adaline hỗ trợ nhanh chóng qua Ultraview, Zalo, điện thoại, hỗ trợ cả ngày lễ và cuối tuần',
		},
		{
			icon: <RiShieldCheckLine/>,
			title: 'An toàn',
			text: 'Hỗ trợ kết nối dữ liệu online (dữ liệu đặt trên Adaline) và offline (dữ liệu đặt tại máy của khách hàng)',
		},
		{
			icon: <VscFile/>,
			title: 'Hướng dẫn sử dụng',
			text: 'Với các video Youtube hướng dẫn đa dạng theo từng quy trình nghiệp vụ, tập tin sử dụng phần mềm với chi tiết từng bước',
		},
		{
			icon: <FiUsers/>,
			title: 'Đa dạng nghành hàng',
			text: 'Phù hợp với hầu hết nghiệp vụ quản lý các ngành hàng từ cá nhân tới công ty, doanh nghiệp vừa và nhỏ',
		},
		{
			icon: <FiFolder/>,
			title: 'Viết theo yêu cầu',
			text: 'Với đội ngũ lập trình kinh nghiệp, Adaline sẵn sàng mở rộng tính năng theo yêu cầu nghiệp vụ của khách hàng',
		},
	]

	return (
		<div>
			<Center>
				<HomeTitle style={{ textAlign: "center" }}>
					{/* {sanitizeDOMData(data?.content)} */}
					Tại sao nên chọn <span className="company-name">Adaline</span> đồng hành cùng bạn?
				</HomeTitle>
			</Center>
			<Box
				sx={(theme) => ({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						gap: "25px",
					},
				})}
			>
				<Grid gutter={'md'}>
					{a.map((item, index) => (
						<Grid.Col key={index} sm={12} md={6} lg={4}>
							
							<AvantageItem icon={item.icon} title={item.title} text={item.text}/>
						</Grid.Col>
					))}
				</Grid>

				{/* <Box
					sx={(theme) => ({
						flexBasis: "45%",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							flexBasis: "100%",
						},
					})}
				>
					<Box
						sx={(theme) => ({
							position: "relative",
							aspectRatio: "1.48",
							width: "100%",
							margin: "0 auto 0 0",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								margin: "0 auto",
							},
						})}
					>
						<Image
							src={appendImageUrlFromAPI({ src: data?.picture_1 })}
							alt="Why Invest"
							layout="fill"
							objectFit="cover"
							//placeholder="blur"
							blurDataURL={"https://via.placeholder.com/521x502"}
							priority
						/>
					</Box>
				</Box>
				<Box
					sx={(theme) => ({
						flexBasis: "55%",
						[`@media (max-width: ${theme.breakpoints.md}px)`]: {
							flexBasis: "100%",
						},
					})}
				>
					<Stack
						justify="center"
						sx={(theme) => ({
							height: "100%",
							gap: "36px",
							[`@media (max-width: ${theme.breakpoints.md}px)`]: {
								gap: "18px",
							},
						})}
					>
						{list?.text_field?.map((item, k) => (
							<Box key={k} sx={{ display: "flex", width: "100%" }}>
								<Group
									key={k}
									align="flex-start"
									spacing={24}
									sx={(theme) => ({
										marginLeft: 24,
										gap: "24px",
										[`@media (max-width: ${theme.breakpoints.md}px)`]: {
											marginLeft: 0,
											gap: "18px",
										},
									})}
								>
									<Box
										sx={(theme) => ({
											position: "relative",
											aspectRatio: "1",
											width: 64,
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												width: 36,
											},
										})}
									>
										<Image
											src={appendImageUrlFromAPI({
												src: list?.pictures[k]?.picture_url,
											})}
											alt="icon"
											layout="fill"
											blurDataURL="https://via.placeholder.com/64"
											objectFit="cover"
										/>
									</Box>
									<Box
										sx={(theme) => ({
											width: "calc(100% - 88px)",
											[`@media (max-width: ${theme.breakpoints.md}px)`]: {
												width: "calc(100% - 54px)",
											},
										})}
									>
										<Text
											size={"lg"}
											weight={400}
											sx={(theme) => ({
												fontSize: 20,
												lineHeight: "24px",
												color: theme.colors.neutral[0],
												[`@media (max-width: ${theme.breakpoints.md}px)`]: {
													fontSize: 16,
													lineHeight: "19px",
												},
											})}
										>
											{sanitizeDOMData(item?.content_editor)}
										</Text>
									</Box>
								</Group>
							</Box>
						))}
					</Stack>
				</Box> */}
			</Box>
		</div>
	);
}
