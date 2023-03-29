export const title = `Phần mềm quản lý bán hàng ADALINE`;
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
    url: "https://adaline.com.vn/",
    title: title,
    // description,
    locale: "vi",
    siteName: "Adaline",
  },
};

export default defaultSEOConfigs;
