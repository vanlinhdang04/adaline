import BannerIMG from '@/public/images/banner.json';
import { getFieldFromFieldId } from '@/utils/getFieldFromFieldId';
import { Box, Center, Grid, List, MediaQuery, Title } from '@mantine/core';
import Image from 'next/image';
import ArrowDownGIF from 'public/icons/down_arrows.gif';
import ListIcon from "public/icons/list-icon.svg";
import React from 'react';
import DownloadApp from '../DownloadApp';

const BannerHome = ({onClickScroll}) => {
  console.log("BannerIMG", BannerIMG)
	const ref = React.useRef(null);
	const [lottie, setLottie] = React.useState(null);


  React.useEffect(() => {
		import("lottie-web").then((Lottie) => setLottie(Lottie.default));
	}, []);

  React.useEffect(() => {
		if (lottie && ref.current) {
			const animation = lottie.loadAnimation({
				container: ref.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: 'images/banner.json',
				rendererSettings: {
					className: "home-banner-animation",
				},
			});

			return () => animation.destroy();
		}
	}, [lottie]);

  return (
    <Box pos={'relative'}>
      <Box
				sx={(theme) => ({
					position: "absolute",
					top: "55%",
					left: "40%",

					border: "1px solid #17A49C",
					borderRadius: "50%",
					width: "60px",
					aspectRatio: "1",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						display: "none",
					},
				})}
			></Box>
			<Box
				sx={(theme) => ({
					position: "absolute",
					top: "10%",
					left: "50%",

					border: "1px solid #17A49C",
					borderRadius: "50%",
					width: "30px",
					aspectRatio: "1",

					[`@media (max-width: ${theme.breakpoints.md}px)`]: {
						display: "none",
					},
				})}
			></Box>

      {/*  */}

      <Grid align={"center"} gutter={0}>
        <Grid.Col xs={12} md={6} order={2} orderMd={1}>
        <Box
						sx={(theme) => ({
							color: theme.colors.neutral[0],
							minHeight: 270,
						})}
					>
						<Title
							order={1}
							sx={(theme) => ({
								fontSize: 40,
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									fontSize: 32,
								},
							})}
						>
								Đầu tư vượt trội cùng{" "}
								<span className="company-name">Adaline</span>
						</Title>
						<List
							icon={
								<Box sx={{ width: 23, height: 23 }}>
									<Image
										src={ListIcon}
										alt="vector Top right"
										width={23}
										height={23}
										layout="responsive"
									/>
								</Box>
							}
							sx={(theme) => ({
								fontSize: 20,
								color: theme.colors.neutral[0],
								[`@media (max-width: ${theme.breakpoints.md}px)`]: {
									fontSize: 20,
								},
							})}
							styles={{
								itemIcon: {
									marginTop: "4px",
								},
							}}
							mb={16}
						>
							<List.Item>Đơn giản, dẽ dùng</List.Item>
							<List.Item>Phù hợp cho từng ngành hàng</List.Item>
							<List.Item>Tiết kiệm chi phí nhất</List.Item>
						</List>
						<DownloadApp banner={true} />
					</Box>
        </Grid.Col>

        <Grid.Col my={14} xs={12} md={6} order={1} orderMd={2}>
					<MediaQuery
						smallerThan={"md"}
						styles={{
							width: "80% !important",
							// margin: "0 auto 36px !important",
						}}
					>
						<div
							style={{
								position: "relative",
								aspectRatio: "1.22",
								maxWidth: "605px",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								margin: "0 auto",
							}}
						>
              <div
									ref={ref}
									style={{
										position: "relative",
										aspectRatio: "1.22",
										maxWidth: "605px",
										display: "flex",
										justifyContent: "center",
										margin: "0 auto",
									}}
								/>
							
						</div>
					</MediaQuery>
				</Grid.Col>
      </Grid>

      <Center>
				<Box sx={{ cursor: "pointer" }} onClick={onClickScroll}>
					<Image
						src={ArrowDownGIF}
						alt="Scroll down arrows"
						width={56}
						height={56}
						objectFit="cover"
						objectPosition={"50% 100%"}
						//placeholder="blur"
						blurDataURL="https://via.placeholder.com/64"
					/>
				</Box>
			</Center>
    </Box>
  )
}

export default BannerHome