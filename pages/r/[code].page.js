import useAuth from "@/apis/Auth";
import { fetchNewsArticle } from "@/apis/queryFunctions/news";
import { useFetchPageInfo } from "@/apis/queryFunctions/pageInfo";
import pageInfoKeys from "@/apis/queryKeys/pageInfoKey";
import AppDownload from "@/common/components/AppDownload";
import { appAlert } from "@/setup/mantine-provider/notifications";
import appendImageUrlFromAPI from "@/utils/appendImageUrlFromAPI";
import { setToStorage } from "@/utils/localStorage";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import {
	Accordion,
	Box,
	Button,
	Checkbox,
	Container,
	Grid,
	Group,
	Modal,
	PasswordInput,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { MOCK_USER_SIGNUP } from "configs";
// import test from "flexzen-core";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const email = "zenone-test-181@mailsac.com";
const placeholderInputs = {
	name: "Bảo bảo",
	email,
	// email2: email,
	password: "Zen123",
	rePassword: "Zen123",
	introduce_code: "447497",
	termsOfService: false,
};

const initialValues = {
	name: "",
	email: "",
	email2: "",
	password: "",
	rePassword: "",
	introduce_code: undefined,
	termsOfService: false,
};

export default function Referral() {
	const { data } = useFetchPageInfo("web-dieu-khoan");
	const [openDieuKhoan, setOpenDieuKhoan] = React.useState(false);

	const signupForm = useForm({
		initialValues: MOCK_USER_SIGNUP ? placeholderInputs : initialValues,
		validate: {
			name: (value) =>
				value?.replace(/\s/g, "")?.length < 5
					? "Họ và tên phải có ít nhất 5 ký tự"
					: null,
			// should be phone number
			email: (value) => {
				if (
					(!MOCK_USER_SIGNUP && /[a-zA-Z]/.test(value)) ||
					(!MOCK_USER_SIGNUP && value?.replace(/\s/g, "")?.length < 10) ||
					(!MOCK_USER_SIGNUP && value?.replace(/\s/g, "")?.length > 13)
				) {
					return "Số điện thoại không hợp lệ";
				}
				return null;
			},

			email2: (value) => {
				if (!value || value?.replace(/\s/g, "")?.length === 0) {
					return null;
				}
				return /^\S+@\S+$/.test(value) ? null : "Email không hợp lệ";
			},

			password: (value) => {
				if (value?.length < 6) {
					return "Mật khẩu phải ít nhất 6 ký tự";
				}
				if (!/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/.test(value)) {
					return "Mật khẩu phải gồm 1 ký tự thướng, 1 ký tự hoa và 1 số";
				}
				return null;
			},
			rePassword: (value, values) => {
				if (value?.replace(/\s/g, "")?.length === 0) {
					return "Xác nhận mật khẩu không được bỏ trống";
				}
				if (value !== values.password) {
					return "Hai mật khẩu không khớp nhau";
				}
				return null;
			},
			introduce_code: (value) => {
				if (!value || value?.replace(/\s/g, "")?.length === 0) {
					return null;
				}
				if (value?.replace(/\s/g, "")?.length !== 6) {
					return "Mã giới thiệu không hợp lệ";
				}
				if (/[a-zA-Z]/.test(value)) {
					return "Mã giới thiệu không hợp lệ";
				}
			},
			termsOfService: (value) => {
				return value ? null : "Bạn chưa chấp nhận điều khoản";
			},
		},
	});

	// const [redirectUrl, setRedirectUrl] = React.useState(null);

	const [isRegistered, setIsRegistered] = React.useState(false);
	const [opened, setIsModalOpen] = React.useState(false);
	const [loadCaptcha, setLoadCaptcha] = React.useState(false);
	const {
		asPath,
		query: { code },
	} = useRouter();

	const onSignupCompleted = (token) => {
		signupForm.reset();
		setToStorage(token);
		setIsRegistered(true);
	};

	const { loadGoogleCaptcha, signup, renderVerifyForm } = useAuth({
		configs: {
			id_app: process.env.id_app,
			group_id: process.env.group_id,
		},
		onError: (msg) =>
			appAlert({
				message: msg || "Đăng ký không thành công",
				type: "error",
				id: "signup-error",
			}),
		onSuccess: (msg) =>
			appAlert({
				message: msg,
				type: "success",
				id: "signup-success",
			}),
		toggleVerifyOtpModal: () => setIsModalOpen(!opened),
		onSignupCompleted,
	});

	React.useEffect(() => {
		signupForm.setFieldValue("introduce_code", code);
	}, [code]);

	const { data: pageData, isLoading } = useFetchPageInfo("web-referral");
	console.log(
		"🚀 ~ file: [code].page.js ~ line 160 ~ Referral ~ pageData",
		pageData
	);

	const handleSubmit = async () => {
		signup({
			data: signupForm.values,
		});
	};
	const handleError = async () => {};

	React.useEffect(() => {
		if (signupForm.values.termsOfService) {
			setLoadCaptcha(true);
			loadGoogleCaptcha();
		}
	}, [signupForm.values.termsOfService]);

	return (
		<>
			<NextSeo
				title={pageData?.seo_title}
				// description={pageData?.seo_description}
				openGraph={{
					type: "website",
					url: `${process.env.referral_url}${asPath}`,
					title: pageData?.seo_title,
					// description: " ",
					images: [
						{
							url: pageData?.seo_image_1
								? appendImageUrlFromAPI({
										src: pageData.seo_image_1,
								  })
								: `${process.env.SITE_URL}/images/referral-1.jpg`,
							width: 1200,
							height: 630,
							alt: "Referral Banner 1",
						},
					],
				}}
			/>

			<Container
				size="xl"
				sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
			>
				<Box
					mt={24}
					mb={12}
					sx={(theme) => ({
						height: "100%",
						display: "flex",
						flexDirection: "column",
						flexGrow: 1,
						justifyContent: "flex-start",
						[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
							justifyContent: "center",
						},
					})}
				>
					<Grid gutter={"xl"}>
						<Grid.Col xs={12} lg={4} order={2} orderLg={1}>
							{isRegistered ? (
								<section>
									<AppDownload />
								</section>
							) : (
								<Box component="section">
									<Title my={8} order={1} sx={{ fontSize: 20 }}>
										{pageData?.summary}
									</Title>

									<div>
										<form
											onSubmit={signupForm.onSubmit(handleSubmit, handleError)}
										>
											<TextInput
												label="Họ tên"
												withAsterisk
												placeholder="Nhập họ tên"
												{...signupForm.getInputProps("name")}
											/>
											<TextInput
												mt={"sm"}
												autoComplete="username"
												label="Số điện thoại"
												withAsterisk
												placeholder="Nhập số điện thoại"
												{...signupForm.getInputProps("email")}
											/>
											<TextInput
												mt={"sm"}
												autoComplete="username"
												label="Email"
												placeholder="Nhập email"
												{...signupForm.getInputProps("email2")}
											/>
											<PasswordInput
												mt={"sm"}
												label="Mật khẩu"
												withAsterisk
												placeholder="Nhập mật khẩu"
												autoComplete="new-password"
												{...signupForm.getInputProps("password")}
											/>
											<PasswordInput
												mt={"sm"}
												autoComplete="new-password"
												label="Xác nhận mật khẩu"
												withAsterisk
												placeholder="Nhập xác nhận mật khẩu"
												{...signupForm.getInputProps("rePassword")}
											/>
											<TextInput
												mt={"sm"}
												label="Mã giới thiệu"
												placeholder="Nhập xác nhận mật khẩu"
												{...signupForm.getInputProps("introduce_code")}
											/>
											<Box sx={{ display: "flex", alignItems: "baseline" }}>
												<Checkbox
													mt="md"
													label={
														<>
															Tôi đã đọc, hiểu và chấp nhận{" "}
															<span
																onClick={() => setOpenDieuKhoan(true)}
																style={{
																	textDecoration: "underline",
																	cursor: "pointer",
																}}
															>
																điều khoản
															</span>
															{/* <Anchor
																component="a"
																sx={{ fontSize: 16, color: "blue" }}
																target="_blank"
																href="/ho-tro/dieu-khoan-su-dung"
															>
																điều khoản
															</Anchor> */}
														</>
													}
													{...signupForm.getInputProps("termsOfService", {
														type: "checkbox",
													})}
													styles={() => ({
														input: {
															backgroundColor: "transparent",
															borderColor: "#ADB4BB",
															":checked": {
																backgroundColor: "#001529",
																borderColor: "#001529",
															},
														},
														icon: {
															color: "#A8EFEB",
														},
													})}
												/>
											</Box>
											<Group my="lg" position="right">
												<Button
													sx={(theme) => ({
														backgroundColor: "#001529",
														fontSize: 14,
														fontWeight: 600,
														padding: "8px 24px",
														color: "#A8EFEB",
													})}
													type="submit"
												>
													Hoàn tất
												</Button>
											</Group>
										</form>
									</div>
								</Box>
							)}
						</Grid.Col>

						<Grid.Col xs={12} lg={8} order={1} orderLg={2}>
							<Box
								sx={{ height: "100%", display: "flex", alignItems: "center" }}
							>
								<Box
									sx={() => ({
										position: "relative",
										width: "100%",
										aspectRatio: "1.7778",
										borderRadius: "28px",
										overflow: "hidden",
									})}
								>
									<Image
										src={appendImageUrlFromAPI({
											src: pageData?.picture_1,
											size: "xl",
										})}
										alt="referral banner"
										layout="fill"
										objectFit="contain"
									/>
								</Box>
							</Box>
						</Grid.Col>
					</Grid>
				</Box>
				{loadCaptcha && (
					<Modal
						opened={opened}
						onClose={() => setIsModalOpen(!opened)}
						centered
						title="Xác minh tài khoản"
						closeOnClickOutside={false}
						closeOnEscape={false}
					>
						{renderVerifyForm()}
					</Modal>
				)}
				<Modal
					opened={openDieuKhoan}
					onClose={() => setOpenDieuKhoan(!openDieuKhoan)}
					// title="Điều khoản sử dụng"
					size={"90%"}
				>
					{data?.add_on_4 && (
						<Accordion defaultValue={data?.add_on_4[0].id}>
							{data?.add_on_4?.map((item, k) => (
								<Accordion.Item value={item?.id} key={k}>
									<Accordion.Control>
										{item?.text_field[0]?.content}
									</Accordion.Control>
									<Accordion.Panel>
										<Box className="webview">
											{sanitizeDOMData(item?.text_field[0]?.content_editor)}
										</Box>
									</Accordion.Panel>
								</Accordion.Item>
							))}
						</Accordion>
					)}
				</Modal>
			</Container>
		</>
	);
}

export async function getServerSideProps() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web-referral"),
		() => fetchNewsArticle("web-referral"),
		{
			staleTime: 1000 * 60 * 60,
		}
	);
	await queryClient.prefetchQuery(
		pageInfoKeys.detail("web-dieu-khoan"),
		() => fetchNewsArticle("web-dieu-khoan"),
		{
			staleTime: 1000 * 60 * 60,
		}
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
