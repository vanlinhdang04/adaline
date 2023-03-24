import GIF from '@/public/images/gif1.gif';
import { Box, Center, Group, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import HomeTitle from '../HomeTitle';

const Companion = () => {
  return (
    <Box>``
      <Center>
				<HomeTitle style={{ textAlign: "center" }}>
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
        <Box
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
							src={GIF}
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
            {/* items */}
            <Box sx={{ display: "flex", width: "100%" }}>
								<Group
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
										{/* <Image
											src={appendImageUrlFromAPI({
												src: list?.pictures[k]?.picture_url,
											})}
											alt="icon"
											layout="fill"
											blurDataURL="https://via.placeholder.com/64"
											objectFit="cover"
										/> */}
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
											{/* {sanitizeDOMData(item?.content_editor)} */}
										</Text>
									</Box>
								</Group>
							</Box>
						{/* {list?.text_field?.map((item, k) => (
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
						))} */}
					</Stack>
				</Box>
      </Box>
    </Box>
  )
}

export default Companion