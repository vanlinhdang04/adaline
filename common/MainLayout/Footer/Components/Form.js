import { postContact } from "@/apis/queryFunctions/contact";
import {
  addtrackingEvent,
  TRACKING_NAMES,
  TRACKING_VI_TRI,
} from "@/apis/queryFunctions/tracking";
// import { appAlert } from "@/setup/mantine-provider/notifications";
import sanitizeDOMData from "@/utils/sanitizeDOMData";
import {
  Box,
  Button,
  Center,
  createStyles,
  Modal,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import right from "public/icons/backarrow.png";
import iconClose from "public/icons/close_icon.png";
import Mail from "public/icons/Mail_Form.png";
import Name from "public/icons/Name_Form.png";
import Phone from "public/icons/Phone_Form.png";
import success from "public/images/success.png";
import React from "react";
const useStyles = createStyles(() => ({
  text: {
    [`::placeholder`]: { fontSize: 14 },
    // [`::-webkit-scrollbar-thumb:hover`]: {
    //   background: "rgba(14, 159, 153,.7)",
    // },
  },
}));

export default function Form({
  styles = {},
  isFooter = true,
  id = "",
  slug = "",
  title = "Nếu bạn quan tâm sản phẩm này, hãy để lại thông tin cho ZenOne",
  showIcon = true,
  titleColor = "#ffffff",
  isFullInput = false,
  placeholderColor = "#ADB4BB",
  closeModal = () => null,
  bds = false,
  position,
}) {
  const [open, setOpen] = React.useState(false);
  const { locale } = useRouter();
  locale == "vi"
    ? (title = "Nếu bạn quan tâm sản phẩm này, hãy để lại thông tin cho ZenOne")
    : (title =
        "If you are interested in this product, please leave a message for ZenOne");
  const handleClose = () => {
    sessionStorage.setItem("popup_expiry", "close");
    setOpen(false);
    closeModal();
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validate: {
      name: (value) =>
        value.length <= 2
          ? locale == "vi"
            ? "Họ và tên quá ngắn"
            : "First and last name too short"
          : null,
      phone: (value) =>
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
          value
        )
          ? null
          : locale == "vi"
          ? "Sai định dạng sđt"
          : "Wrong format of phone number",
    },
  });

  const contactMutation = useMutation(postContact, {
    onSuccess: () => {
      setOpen(true);
      // appAlert({
      //   type: "success",
      //   message: "Gửi thông tin thành công. ZenOne sẽ liên hệ bạn trong 24h",
      // });
      if (isFooter) {
        addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.FOOTER,
          field_id: TRACKING_NAMES["FOOTER_Form-lien-he"],
        });
      }
      if (bds) {
        addtrackingEvent({
          vi_tri: TRACKING_VI_TRI.BDS,
          field_id: TRACKING_NAMES.BDS_Form,
        });
      }
      form.reset();
    },
  });
  return (
    <>
      <form
        onSubmit={form.onSubmit(({ name, phone, email }) => {
          contactMutation.mutate({
            name: name,
            phone: phone,
            email,
            subscribe_to_product: id,
            subscribe_to_news: slug,
            url: window.location.href,
            vi_tri: position,
            called: false,

            // ten_san_pham: "Zen Group Tower",
          });
        })}
      >
        <SimpleGrid
          className={styles}
          sx={{ margin: "auto", height: "fit-content" }}
          spacing="xl"
        >
          {!isFooter && (
            <Title
              // size={20}
              weight={700}
              align="center"
              order={2}
              color={titleColor}
              sx={(theme) => ({
                fontSize: 24,
                // marginBottom: 40,
                fontWeight: "600",

                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  fontSize: 20,
                },
              })}
            >
              {title}
            </Title>
          )}
          <Box px={isFooter || isFullInput ? 0 : isMobile ? 0 : 37}>
            <TextInput
              size={isFooter ? "sm" : bds ? "lg" : "md"}
              icon={
                showIcon && (
                  <div style={{ width: 29, height: 29, margin: 10 }}>
                    <Image
                      src={Name}
                      alt="Name"
                      layout="fixed"
                      priority
                      height={29}
                      width={29}
                    ></Image>
                  </div>
                )
              }
              required
              placeholder={locale == "vi" ? "Nhập Họ và tên *" : "Name *"}
              className={classes.text}
              styles={{
                input: {
                  paddingLeft: bds && `60px !important`,
                  [`::placeholder`]: {
                    fontSize: 14,
                    color: placeholderColor,
                  },
                },
              }}
              radius={"xs"}
              {...form.getInputProps("name")}
            ></TextInput>
          </Box>
          <Box px={isFooter || isFullInput ? 0 : isMobile ? 0 : 37}>
            <TextInput
              size={isFooter ? "sm" : bds ? "lg" : "md"}
              required
              icon={
                showIcon && (
                  <div style={{ width: 29, height: 29, margin: 10 }}>
                    <Image
                      src={Phone}
                      alt="Phone"
                      layout="fixed"
                      priority
                      height={29}
                      width={29}
                    ></Image>
                  </div>
                )
              }
              placeholder={locale == "vi" ? "Nhập số điện thoại *" : "Phone *"}
              radius={"xs"}
              styles={{
                input: {
                  paddingLeft: bds && `60px !important`,

                  [`::placeholder`]: {
                    fontSize: 14,
                    color: placeholderColor,
                  },
                },
              }}
              {...form.getInputProps("phone")}
            ></TextInput>
          </Box>
          <Box px={isFooter || isFullInput ? 0 : isMobile ? 0 : 37}>
            <TextInput
              size={isFooter ? "sm" : bds ? "lg" : "md"}
              icon={
                showIcon && (
                  <div style={{ width: 29, height: 29, margin: 10 }}>
                    <Image
                      src={Mail}
                      alt="Mail"
                      layout="fixed"
                      priority
                      height={29}
                      width={29}
                    ></Image>
                  </div>
                )
              }
              // required
              placeholder={"Email"}
              styles={{
                input: {
                  paddingLeft: bds && `60px !important`,
                  [`::placeholder`]: {
                    fontSize: 14,
                    color: placeholderColor,
                  },
                },
              }}
              radius={"xs"}
              {...form.getInputProps("email")}
            ></TextInput>
          </Box>

          <Box px={isFooter || isFullInput ? 0 : isMobile ? 0 : 37}>
            <Button
              type="submit"
              color={isFooter ? "dark" : "primary"}
              radius={isFooter ? "xs" : 13}
              size={isFooter ? "sm" : "md"}
              fullWidth
            >
              <Text
                weight={isFooter ? "normal" : 600}
                color={isFooter ? "#A8EFEB" : "dark"}
                size={14}
                sx={{ marginRight: !isFooter ? 20 : 0 }}
              >
                {locale == "vi" ? "Gửi" : "Send"}
              </Text>
              {!isFooter && (
                <Image
                  src={right}
                  alt="Vector"
                  layout="fixed"
                  width={18}
                  height={14}
                />
              )}
            </Button>
          </Box>
        </SimpleGrid>
      </form>
      <Modal
        opened={open}
        onClose={handleClose}
        size={526}
        styles={{
          header: {
            marginBottom: 0,
            display: "none",
          },
          modal: {
            marginTop: 75,
            padding: "0px !important",
          },
        }}
      >
        <Box
          sx={(theme) => ({
            padding: "20px 28px",

            display: "flex",
            justifyContent: "flex-end",
            [theme.fn.smallerThan("md")]: {
              padding: "18px 18px 0",
            },
          })}
        >
          <Image
            src={iconClose}
            alt="close"
            width={25}
            height={25}
            layout="intrinsic"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={(theme) => ({
            padding: "0px 103px 90px",

            [theme.fn.smallerThan("md")]: {
              padding: "0px 18px 41px",
            },
          })}
        >
          <Center>
            <Image alt="success" src={success} width={211} height={211}></Image>
          </Center>
          <Box>
            <Text size={"lg"} weight={400} color={"#001529"} align="center">
              {locale == "vi"
                ? "Gửi thông tin thành công."
                : "Information sent successfully."}
            </Text>
            <Text size={"lg"} weight={400} color={"#001529"} align="center">
              {locale == "vi"
                ? "ZenOne sẽ liên hệ bạn trong 24h"
                : "ZenOne will contact you within 24 hours"}
            </Text>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
