import { useFetchAppInfo } from "@/apis/queryFunctions/appInfo";
import { SUB_POSITION } from "@/apis/queryFunctions/subcribePosition";
import {
  addtrackingEvent,
  TRACKING_NAMES,
  TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
import { Grid, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import arrow from "public/icons/arrow.png";
import Facebook from "public/icons/Facebook.png";
import Home from "public/icons/home.png";
import Mail from "public/icons/mail.png";
import Phone from "public/icons/phone.png";
import Youtube from "public/icons/Youtube.png";
import Zalo from "public/icons/Zalo.png";
import logo from "public/images/footer_logo.png";
import useStyles from "../styles";
import Form from "./Form";
export default function Info() {
  const { classes } = useStyles();
  const { data } = useFetchAppInfo({});
  const { locale } = useRouter();
  // console.log(data);
  return (
    <Grid sx={{ width: "100%" }}>
      <Grid.Col sm={6} md={3.6} sx={{ margin: "13px 0px 0px " }}>
        <Image src={logo} alt="ZenOne" priority height={56} width={127}></Image>
        <Text>{locale == "vi" ? data?.name : data?.name_en}</Text>
        <Text sx={{ paddingBottom: 15 }}>MST: {data?.ma_so_thue}</Text>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "5px 10px 5px 0", cursor: "pointer" }}>
            {data?.zalo ? (
              <Link scroll={false} href={data?.zalo}>
                <a target={"_blank"} aria-label="Facebook">
                  <Image
                    src={Zalo}
                    alt="Zalo"
                    priority
                    layout="fixed"
                    height={30}
                    width={30}
                  ></Image>
                </a>
              </Link>
            ) : (
              <Image
                src={Zalo}
                alt="Zalo"
                priority
                height={30}
                width={30}
              ></Image>
            )}
          </div>
          <div style={{ margin: "5px 10px 5px 0", cursor: "pointer" }}>
            {data?.facebook ? (
              <Link scroll={false} href={data?.facebook}>
                <a target={"_blank"} aria-label="Facebook">
                  <Image
                    src={Facebook}
                    alt="Facebook"
                    layout="fixed"
                    priority
                    height={30}
                    width={30}
                  ></Image>
                </a>
              </Link>
            ) : (
              <Image
                src={Facebook}
                alt="Facebook"
                layout="fixed"
                priority
                height={30}
                width={30}
              ></Image>
            )}
          </div>
          <div style={{ margin: "5px 10px 5px 0", cursor: "pointer" }}>
            {data?.youtube ? (
              <Link scroll={false} href={data?.youtube}>
                <a target={"_blank"} aria-label="Facebook">
                  <Image
                    src={Youtube}
                    alt="Youtube"
                    layout="fixed"
                    priority
                    height={30}
                    width={30}
                  ></Image>
                </a>
              </Link>
            ) : (
              <Image
                src={Youtube}
                alt="Youtube"
                layout="fixed"
                priority
                height={30}
                width={30}
              ></Image>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 20, height: 20, margin: "10px 10px 10px 0" }}>
            <Image
              src={Home}
              alt="Home"
              layout="fixed"
              priority
              height={20}
              width={20}
            ></Image>
          </div>
          <Text size={16} sx={{ marginTop: 10 }}>
            {locale == "vi" ? data?.address : data?.address_en}
          </Text>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 20, height: 20, margin: "10px 10px 10px 0" }}>
            <Image
              src={Mail}
              alt="Mail"
              layout="fixed"
              priority
              objectFit="contain"
              height={20}
              width={20}
            ></Image>
          </div>
          {data?.email ? (
            <Link scroll={false} href={`mailto:${data?.email}`}>
              <a target={"_blank"} aria-label="Email">
                <Text size={16} sx={{ marginTop: 10 }}>
                  info@zenone.com.vn
                </Text>
              </a>
            </Link>
          ) : (
            <Text size={16} sx={{ marginTop: 10, cursor: "pointer" }}>
              info@zenone.com.vn
            </Text>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: 20, height: 20, margin: "10px 10px 10px 0" }}>
            <Image
              src={Phone}
              alt="Phone"
              layout="fixed"
              priority
              height={20}
              width={20}
            ></Image>
          </div>
          <Text size={16} sx={{ marginTop: 10 }}>
            {data?.phone}
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col sm={6} md={2.4} sx={{ margin: "auto" }}>
        <InfoTitle> {locale == "vi" ? "Sản phẩm" : "Product"}</InfoTitle>

        <InfoText className={classes.infoText} link={"/san-pham/bat-dong-san"}>
          {locale == "vi" ? " Bất động sản" : "Real estate"}
        </InfoText>

        <InfoText
          className={classes.infoText}
          // link={"/san-pham/co-phan-zenone"}
        >
          {locale == "vi" ? "Cổ phần Zenone" : "Shares of Zenone"}
        </InfoText>
        <InfoText
          className={classes.infoText}
          // link={"/san-pham/co-phan-startups"}
        >
          {locale == "vi" ? "Cổ phần Starups" : "Shares of Startups"}
        </InfoText>
        <InfoTitle>{locale == "vi" ? "Hỗ trợ" : "Support"} </InfoTitle>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Ho-tro-KH"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/ho-tro/ho-tro-khach-hang"}
          >
            {locale == "vi" ? "Hỗ trợ khách hàng" : "Customer support"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Huong-dan-su-dung"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/ho-tro/huong-dan-su-dung"}
          >
            {locale == "vi" ? "Hướng dẫn sử dụng" : "User manual"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Dieu-khoan-su-sung"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/ho-tro/dieu-khoan-su-dung"}
          >
            {locale == "vi" ? "Điều khoản sử dụng" : "Terms of use"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Hoi-dap-thuong-gap"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/ho-tro/cau-hoi-thuong-gap"}
          >
            {locale == "vi"
              ? "Hỏi đáp thường gặp"
              : "Frequently asked questions"}
          </InfoText>
        </div>
      </Grid.Col>
      <Grid.Col sm={6} md={3}>
        <InfoTitle>
          {locale == "vi"
            ? "Chính sách đầu tư/ hợp tác"
            : "Investment/cooperation policy"}
        </InfoTitle>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES.FOOTER_Chinhsach_BDS,
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/chinh-sach-dau-tu-hop-tac"}
            detail={"chinh-sach-dau-tu-bat-dong-san"}
          >
            {locale == "vi"
              ? "Chính sách đầu tư bất động sản"
              : "Real estate investment policy"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES.FOOTER_Chinhsach_CP,
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            // link={"/chinh-sach-dau-tu-hop-tac"}
            // detail={"chinh-sach-dau-tu-co-phan"}
          >
            {locale == "vi"
              ? "Chính sách đầu tư cổ phần"
              : "Equity investment policy"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Chinh-sach-gioi-thieu"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            link={"/chinh-sach-dau-tu-hop-tac"}
            detail={"chinh-sach-gioi-thieu"}
          >
            {locale == "vi" ? "Chính sách giới thiệu" : "Referral Policy"}
          </InfoText>
        </div>
        <div
          onClick={() => {
            addtrackingEvent({
              vi_tri: TRACKING_VI_TRI.FOOTER,
              field_id: TRACKING_NAMES["FOOTER_Chinh-sach CTV"],
            });
          }}
        >
          <InfoText
            className={classes.infoText}
            // link={"/chinh-sach-dau-tu-hop-tac"}
            // detail={"chinh-sach-ctv"}
          >
            {locale == "vi" ? "Chính sách CTV" : "Contributor policy"}
          </InfoText>
        </div>
      </Grid.Col>
      <Grid.Col sm={6} md={3}>
        <Text size={"sm"} weight={"700"} sx={{ margin: "13px 0px 17px 0px" }}>
          {locale == "vi"
            ? "Để lại thông tin nhận tư vấn miễn phí"
            : "Leave your information for a free consultation"}
        </Text>

        <Form position={SUB_POSITION.FOOTER}></Form>
      </Grid.Col>
    </Grid>
  );
}
const InfoTitle = ({ children }) => (
  <Text size={"sm"} weight={"700"} sx={{ margin: "13px 0px 17px 0px" }}>
    {children}
  </Text>
);

const InfoText = ({ children, className, link, detail }) => (
  <div style={{ display: "flex", marginBottom: 7 }}>
    <div
      style={{
        display: "flex",
        height: 8,
        width: 9,
        justifyContent: "center",
        alignItems: "center",
        margin: "5px 10px 5px 0",
      }}
    >
      <Image
        src={arrow}
        alt="Arrow"
        layout="fixed"
        priority
        height={8}
        width={9}
      ></Image>
    </div>
    <Link
      href={
        detail
          ? { pathname: link, query: { keyword: detail } }
          : { pathname: link }
      }
      // scroll={true}
    >
      <a>
        <Text
          size={"sm"}
          color={"#fff"}
          weight="normal"
          mb={4}
          className={className}
        >
          {children}
        </Text>
      </a>
    </Link>
  </div>
);
