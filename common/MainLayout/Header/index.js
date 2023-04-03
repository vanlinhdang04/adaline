import { SUB_POSITION } from "@/apis/queryFunctions/subcribePosition";
import DownloadApp from "@/common/components/DownloadApp";
import linkChangeLocale from "@/utils/linkChangeLocale";
import {
  Box,
  createStyles,
  Drawer,
  Group,
  Modal,
  Popover,
  SegmentedControl,
  Text,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useFetchNewsTypes } from "@/api/queryFunctions/news";
import imgVectorSubmenu from "@/public/icons/vector_submenu.png";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import iconClose from "public/icons/close_icon.png";
import iconDownload from "public/icons/download_icon.png";
import iconSignup from "public/icons/signup_icon.png";
import logo from "public/images/logo_lite.org.ico";
import React from "react";
import Container from "../Container";
import Form from "../Footer/Components/Form";
import HoverMenu from "./components/HoverMenu";

const useStyles = createStyles((theme) => ({
  header: {
    height: "100%",
    width: "100%",
  },
  wrapperDesktop: {
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  wrapperMobile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    height: "47px",
    // margin: "0 26px",

    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  wrapper: {
    height: "80px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sideLeft: {},
  sideRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  menuItem: {
    marginLeft: "36px",
    listStyleType: "none",

    fontSize: "15px",
    fontWeight: 600,
    lineHeight: "17px",
    letterSpacing: "0em",
    textAlign: "center",
    cursor: "pointer",

    "& a": {
      color: theme.colors.neutral[0],
    },
  },
  menuItemSub: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "21px",
    letterSpacing: "0em",
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },

  drawer: {
    padding: "10px 30px 10px 36px",
    position: "relative",
    height: "100%",
  },
  drawerItem: {
    marginTop: "16px",

    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19px",
    letterSpacing: "0em",
    textAlign: "left",
    color: theme.colors.accent[20],
  },
  drawerItemSub: {
    marginLeft: "19px",
    marginTop: "14px",
    fontWeight: 400,
  },
  downloadWrapper: {
    marginTop: "14px",

    // display: "flex",
    // justifyContent: "space-between",
  },
  vector: {
    position: "absolute",
    bottom: 16,
    left: 36,
  },
}));

export default function Header() {
  const { classes } = useStyles();
  const { push, locale, asPath, pathname } = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const { data: newsType, isLoading } = useFetchNewsTypes();

  const label = {
    vi: {
      menu: {
        home: {
          label: "Trang chủ",
        },
        sanPham: {
          label: "Sản Phẩm",
          // child: ["Bất động sản", "Cổ phần ZenOne", "Cổ phần Startups"],
        },
        tinTuc: {
          label: "Tin tức",
          // child: ["Tin ZenOne", "Ưu đãi & Khuyến mãi"],
        },
        veAdaline: {
          label: "Về Adaline",
        },
        huongDanSuDung: {
          label: "Hướng dẫn sử dụng",
        },
        tuVanNgay: {
          label: "Tư vấn ngay",
        },
        taiUngDung: {
          label: "Tải ứng dụng",
        },
      },
    },
    en: {
      menu: {
        home: {
          label: "Home",
        },
        sanPham: {
          label: "Products",
          // child: ["Real estate", "Adaline Shares", "Startups Shares"],
        },
        tinTuc: {
          label: "News",
          // child: ["News Adaline", "Offers & Promotions"],
        },
        veAdaline: {
          label: "About Adaline",
        },
        huongDanSuDung: {
          label: "User manual",
        },
        tuVanNgay: {
          label: "Contact",
        },
        taiUngDung: {
          label: "Download",
        },
      },
    },
  };

  React.useEffect(() => {
    setOpenDrawer(false);
  }, [asPath]);
  return (
    <header className={classes.header}>
      <div className={classes.wrapperDesktop}>
        <Container>
          <div className={classes.wrapper}>
            <div className={classes.sideLeft}>
              <Link href={"/"} passHref>
                <a>
                  <Box
                    display={"flex"}
                    sx={{ alignItems: "center", userSelect: "none" }}
                  >
                    <Image
                      src={logo}
                      alt="Adaline"
                      priority
                      height={56}
                      width={63}
                      layout="intrinsic"
                    />
                    <h2 style={{ color: "var(--color-primary)" }}>ADALINE</h2>
                  </Box>
                </a>
              </Link>
            </div>
            <div className={classes.sideRight}>
              <ul className={classes.menu}>
                <li className={classes.menuItem}>
                  <Link href="/">{label?.[locale]?.menu?.home?.label}</Link>
                </li>
                <li className={classes.menuItem}>
                  <Link href="/san-pham">
                    {label?.[locale]?.menu?.sanPham?.label}
                  </Link>
                </li>
                {/* <li className={classes.menuItem}>
                  <Link href="/tin-tuc">
                    {label?.[locale]?.menu?.tinTuc?.label}
                  </Link>
                </li> */}
                {/* <Popover shadow="md" radius={24}>
                  <Popover.Target>
                    <li className={classes.menuItem}>
                      <Group align={"center"} spacing={4}>
                        <div>{label?.[locale]?.menu?.sanPham?.label}</div>
                        <div>
                          <Image
                            src={imgVectorSubmenu}
                            alt="vector submenu"
                            width={6}
                            height={6}
                          />
                        </div>
                      </Group>
                    </li>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    <HoverMenu>
                      <div>
                        <div className={classes.menuItemSub}>
                          <Link href={"/san-pham/bat-dong-san"}>
                            {label?.[locale]?.menu?.sanPham?.child[0]}
                          </Link>
                        </div>
                        <div className={classes.menuItemSub}>
                          <Link href={"#"}>
                            {label?.[locale]?.menu?.sanPham?.child[1]}
                          </Link>
                        </div>
                        <div className={classes.menuItemSub}>
                          <Link href={"#"}>
                            {label?.[locale]?.menu?.sanPham?.child[2]}
                          </Link>
                        </div>
                      </div>
                    </HoverMenu>
                  </Popover.Dropdown>
                </Popover> */}
                <Popover shadow="md" radius={24}>
                  <Popover.Target>
                    <li className={classes.menuItem}>
                      <Group align={"center"} spacing={4}>
                        <div>{label?.[locale]?.menu?.tinTuc?.label}</div>
                        <div>
                          <Image
                            src={imgVectorSubmenu}
                            alt="vector submenu"
                            width={6}
                            height={6}
                          />
                        </div>
                      </Group>
                    </li>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    <HoverMenu>
                      <div>
                        {!isLoading &&
                          newsType?.data?.map((item, index) => (
                            <div className={classes.menuItemSub} key={index}>
                              <Link
                                href={`/tin-tuc/${item?.attributes?.slug}?id=${item?.id}`}
                              >
                                {item?.attributes?.title}
                              </Link>
                            </div>
                          ))}
                      </div>
                    </HoverMenu>
                  </Popover.Dropdown>
                </Popover>

                <li className={classes.menuItem}>
                  <Link href="/gioi-thieu">
                    {label?.[locale]?.menu?.veAdaline?.label}
                  </Link>
                </li>
                <li className={classes.menuItem}>
                  <Link href="/ho-tro/huong-dan-su-dung">
                    {label?.[locale]?.menu?.huongDanSuDung?.label}
                  </Link>
                </li>
                <li className={classes.menuItem}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 127,
                      height: 33,
                      background: "#FF577B",
                      borderRadius: "8px",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setOpenSignup((e) => !e);
                    }}
                  >
                    <Box sx={{ display: "flex", marginRight: 7 }}>
                      <Image
                        src={iconSignup}
                        alt="Tư vấn ngay"
                        width={21}
                        height={21}
                      />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Text size={"xs"} weight={500} color={"#fff"}>
                        {label?.[locale]?.menu?.tuVanNgay?.label}
                      </Text>
                    </Box>
                  </Box>
                </li>

                <Popover shadow="md" radius={24}>
                  <Popover.Target>
                    <li className={classes.menuItem} style={{ marginLeft: 16 }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 127,
                          height: 33,
                          background: "#17A49C",
                          borderRadius: "8px",

                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", marginRight: 7 }}>
                          <Image
                            src={iconDownload}
                            alt="Tải ứng dụng"
                            width={21}
                            height={21}
                          />
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Text size={"xs"} weight={500} color={"#fff"}>
                            {label?.[locale]?.menu?.taiUngDung?.label}
                          </Text>
                        </Box>
                      </Box>
                    </li>
                  </Popover.Target>
                  <Popover.Dropdown p={0}>
                    <HoverMenu>
                      <DownloadApp banner />
                    </HoverMenu>
                  </Popover.Dropdown>
                </Popover>
                {/* {process.env.NODE_ENV === "development" && (
                  <li className={classes.menuItem} style={{ marginLeft: 16 }}>
                    <SegmentedControl
                      value={locale}
                      onChange={(val) => {
                        push(
                          linkChangeLocale(pathname),
                          linkChangeLocale(pathname),
                          { locale: val }
                        );
                      }}
                      data={[
                        { label: "VI", value: "vi" },
                        { label: "EN", value: "en" },
                      ]}
                      styles={{
                        active: {
                          background: "#17A49C",
                        },
                        labelActive: {
                          color: "#fff !important",
                        },
                      }}
                    />
                  </li>
                )} */}
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={classes.wrapperMobile}>
          <div onClick={() => setOpenDrawer(true)} style={{ display: "flex" }}>
            <GiHamburgerMenu size={25} color="var(--color-primary)" />
          </div>
          <Link href={"/"} passHref>
            <a>
              <Box
                display={"flex"}
                sx={{ alignItems: "center", userSelect: "none" }}
              >
                <Image
                  src={logo}
                  alt="Adaline"
                  priority
                  width={34}
                  height={30}
                  objectFit="cover"
                  layout="intrinsic"
                />
                <h3 style={{ color: "var(--color-primary)" }}>ADALINE</h3>
              </Box>
            </a>
          </Link>

          <div></div>
        </div>
      </Container>

      {/* Drawer */}
      <Drawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        // title="Register"
        // padding={36}
        px={36}
        size={302}
        withCloseButton={false}
      >
        <div className={classes.drawer}>
          <Link href={"/"}>
            <Box
              display={"flex"}
              sx={{ alignItems: "center", userSelect: "none" }}
            >
              <Image
                src={logo}
                alt="Adaline"
                width={64}
                height={56}
                //placeholder="blur"
              />
              <h3 style={{ color: "var(--color-primary)" }}>ADALINE</h3>
            </Box>
          </Link>
          <div className={classes.drawerItem}>
            <Link href={"#"}>{label?.[locale]?.menu?.sanPham?.label}</Link>
            {/* <div className={classes.drawerItemSub}>
              <Link href={"/san-pham/bat-dong-san"}>
                {label?.[locale]?.menu?.sanPham?.child[0]}
              </Link>
            </div>
            <div className={classes.drawerItemSub}>
              <Link href={"#"}>{label?.[locale]?.menu?.sanPham?.child[1]}</Link>
            </div>
            <div className={classes.drawerItemSub}>
              <Link href={"#"}>{label?.[locale]?.menu?.sanPham?.child[2]}</Link>
            </div> */}
          </div>
          {/*  */}
          <div className={classes.drawerItem}>
            <Link href={"#"}>{label?.[locale]?.menu?.tinTuc?.label}</Link>
            {/* <div className={classes.drawerItemSub}>
              <Link href={"/tin-tuc/tin-zenone"}>
                {label?.[locale]?.menu?.tinTuc?.child[0]}
              </Link>
            </div>
            <div className={classes.drawerItemSub}>
              <Link href={"/tin-tuc/tin-uu-dai"}>
                {label?.[locale]?.menu?.tinTuc?.child[1]}
              </Link>
            </div> */}
          </div>
          {/*  */}
          <div className={classes.drawerItem}>
            <Link href={"/gioi-thieu"}>
              {label?.[locale]?.menu?.veAdaline?.label}
            </Link>
          </div>
          <div className={classes.drawerItem}>
            <Link href={"/ho-tro/huong-dan-su-dung"}>
              {label?.[locale]?.menu?.huongDanSuDung?.label}
            </Link>
          </div>
          <div className={classes.drawerItem}>
            <Link href={"#"}>{label?.[locale]?.menu?.taiUngDung?.label}</Link>
          </div>

          {/* download */}
          <div className={classes.downloadWrapper}>
            <DownloadApp banner />
          </div>
          <Box
            mt={15}
            sx={{
              position: "relative",
              width: "100%",
              height: 33,
              background: "#FF577B",
              borderRadius: "8px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              setOpenSignup((e) => !e);
            }}
          >
            <Box sx={{ display: "flex", marginRight: 7 }}>
              <Image
                src={iconSignup}
                alt="Tư vấn ngay"
                width={21}
                height={21}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Text size={"xs"} weight={500} color={"#fff"}>
                {label?.[locale]?.menu?.tuVanNgay?.label}
              </Text>
            </Box>
          </Box>
          {/* {process.env.NODE_ENV === "development" && (
            <Box mt={6}>
              <SegmentedControl
                size="xs"
                value={locale}
                onChange={(val) => {
                  push(linkChangeLocale(pathname), linkChangeLocale(pathname), {
                    locale: val,
                  });
                }}
                data={[
                  { label: "VI", value: "vi" },
                  { label: "EN", value: "en" },
                ]}
                styles={{
                  active: {
                    background: "#17A49C",
                  },
                  labelActive: {
                    color: "#fff !important",
                  },
                }}
              />
            </Box>
          )} */}
          {/* <div className={classes.vector} onClick={() => setOpenDrawer(false)}>
						<Image
							src={vectorLeft}
							alt="QR Code"
							width={25}
							height={25}
							//placeholder="blur"
						/>
					</div> */}
        </div>
      </Drawer>

      {/* Modal DangKy */}
      <Modal
        opened={openSignup}
        onClose={() => setOpenSignup(false)}
        size={526}
        closeButtonLabel={"qsfqwf"}
        styles={{
          header: {
            marginBottom: 0,
            marginRight: 0,
            display: "none",
          },
          modal: {
            marginTop: 75,
            padding: "0px !important",
          },
        }}
        // centered
      >
        <Box
          sx={(theme) => ({
            padding: "20px 28px",

            display: "flex",
            justifyContent: "flex-end",
            [theme.fn.smallerThan("md")]: {
              padding: "18px",
            },
          })}
        >
          <Image
            src={iconClose}
            alt="close"
            width={25}
            height={25}
            layout="intrinsic"
            onClick={() => setOpenSignup(false)}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={(theme) => ({
            padding: "0px 56px 44px",

            [theme.fn.smallerThan("md")]: {
              padding: "0px 18px 27px",
            },
          })}
        >
          <Form
            isFooter={false}
            titleColor="#001529"
            isFullInput={true}
            closeModal={() => setOpenSignup(false)}
            position={SUB_POSITION.HEADER}
          ></Form>
        </Box>
      </Modal>
    </header>
  );
}
