export const title = `ZenOne là ứng dụng đầu tư BĐS, khả năng sinh lời cao với số vốn khiêm tốn`;
// export const description = `Đăng ký để nhận ngay 5.000 VND và trải nghiệm đầu tư BĐS qua App ZenOne cùng mình nhé`;
export const description = ``;

const defaultSEOConfigs = {
	titleTemplate: "%s",
	defaultTitle: title,
	title,
	// description,
	openGraph: {
		type: "website",
		// url: process.env.SITE_URL,
		url: "https://zenone.com.vn",
		title: title,
		// description,
		locale: "vi",
		siteName: "ZenOne",
		images: [
			{
				// url: `${process.env.SITE_URL}/images/referral-1.jpg`,
				url: `https://zenone.com.vn/images/referral-1.jpg`,
				width: 1200,
				height: 630,
				alt: "ZenOne Banner",
			},
		],
	},
};

export default defaultSEOConfigs;
