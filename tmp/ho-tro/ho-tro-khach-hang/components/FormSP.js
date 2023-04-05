import { postContact } from "@/apis/queryFunctions/contact";
import { postSubscribe } from "@/apis/queryFunctions/subscribe";
import { appAlert } from "@/setup/mantine-provider/notifications";
import {
  Button,
  createStyles,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

import imgVector from "public/icons/greenarrow.png";
const useStyles = createStyles((theme) => ({
  text: {
    [`::placeholder`]: { fontSize: 14 },
    // [`::-webkit-scrollbar-thumb:hover`]: {
    //   background: "rgba(14, 159, 153,.7)",
    // },
  },
}));

export default function FormSP() {
  const { classes } = useStyles();
  const { locale } = useRouter();
  const form = useForm({
    initialValues: {
      ho_ten: "",
      sdt: "",
      email: "",
    },
    validate: {
      ho_ten: (val) =>
        val.length <= 2
          ? locale == "vi"
            ? "Họ và tên quá ngắn"
            : "First and last name too short"
          : null,
      sdt: (value) =>
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
          value
        )
          ? null
          : "Sai định dạng sđt",
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : locale == "vi"
          ? "Sai định dạng sđt"
          : "Wrong format of phone number",
    },
  });

  const contactMutation = useMutation(postContact, {
    onSuccess: () => {
      appAlert({
        type: "success",
        message: locale == "vi" ? "Đăng ký thành công" : "Subcribe success",
      });
      form.reset();
    },
  });
  return (
    <>
      <form
        onSubmit={form.onSubmit(({ ho_ten, sdt, email }) => {
          contactMutation.mutate({
            name: ho_ten,
            phone: sdt,

            email,
          });
        })}
      >
        <SimpleGrid>
          {/* <Group spacing={0}> */}
          {/* <Input.Wrapper> */}

          <TextInput
            placeholder={locale == "vi" ? "Nhập Họ và tên" : "Name"}
            label={locale == "vi" ? "Họ tên" : "Name"}
            className={classes.text}
            styles={{
              input: {
                [`::placeholder`]: { fontSize: 14, color: "#ADB4BB" },
              },
            }}
            size="md"
            {...form.getInputProps("ho_ten")}
          ></TextInput>
          <TextInput
            label="Email"
            placeholder={locale == "vi" ? "Nhập email" : "Email"}
            styles={{
              input: {
                [`::placeholder`]: { fontSize: 14, color: "#ADB4BB" },
              },
            }}
            size="md"
            {...form.getInputProps("email")}
          ></TextInput>
          <TextInput
            label={locale == "vi" ? "Số điện thoại" : "Phone"}
            placeholder={locale == "vi" ? "Nhập số điện thoại" : "Phone"}
            styles={{
              input: {
                [`::placeholder`]: { fontSize: 14, color: "#ADB4BB" },
              },
            }}
            size="md"
            {...form.getInputProps("sdt")}
          ></TextInput>

          <Textarea
            size="lg"
            label={
              locale == "vi"
                ? "Bạn cần hỗ trợ gì"
                : "What do you need assistance"
            }
            withAsterisk
          />
          {/* </Input.Wrapper> */}
        </SimpleGrid>
        <Button
          sx={{
            float: "right",
            height: 46,
            width: 154,
            marginTop: 15,
            display: "flex",
            alignItems: "center",
            padding: "0 20px 0 30px",
            justifyContent: "center",
            backgroundColor: "#001529",
          }}
          type="submit"
          radius={13}
        >
          <Text sx={{ marginRight: 20 }} size={14} weight={600} color="#A8EFEB">
            {locale == "vi" ? "Gửi" : "Send"}
          </Text>
          <Image
            src={imgVector}
            alt="Vector"
            layout="fixed"
            width={18}
            height={14}
          />
        </Button>
        {/* </Group> */}
      </form>
    </>
  );
}
