import useCountdownTimer from "@/hooks/useCountdownTimer";
import { useLocalContext } from "@/setup/locale-provider";
import { appAlert } from "@/setup/mantine-provider/notifications";
import { Button, Group, Text, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

export default function OtpForm({ authOtp, resend, callback }) {
  const { getLabel } = useLocalContext();
  const { durationLeftInSeconds, startCountdown, isExpired } =
    useCountdownTimer(120);
  // startCountdown();

  React.useEffect(() => {
    startCountdown();
  }, []);

  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) =>
        value.length > 0 ? null : getLabel("Vui lòng nhập mã xác thực"),
    },
  });

  const handleSubmit = async () => {
    try {
      const rs_authOtp = await authOtp(form.values.otp);
      if (rs_authOtp.status) {
        return callback();
      } else {
        return form.setErrors({ otp: "Mã xác thực không hợp lệ" });
      }
    } catch (error) {
      console.log("Error handleSubmit OtpForm => ", error);
    }
  };
  const handleResend = async () => {
    if (!isExpired) return undefined;
    const rs_resend = await resend();
    if (rs_resend.status) {
      appAlert({
        type: "success",
        message: rs_resend.message,
      });
      startCountdown();
    } else {
      appAlert({
        type: "error",
        message: rs_resend.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Mã xác thực"
          withAsterisk
          placeholder={getLabel("Nhập mã của bạn")}
          {...form.getInputProps("otp")}
          sx={{ width: "calc(100% - 18px)" }}
          styles={{
            input: {
              borderRight: "none",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          rightSection={
            <Tooltip label={getLabel("Gửi lại")}>
              <Button
                variant="outline"
                color={isExpired ? "dark" : "gray"}
                radius="md"
                styles={{
                  root: {
                    borderTopLeftRadius: 0,
                    borderEndStartRadius: 0,
                  },
                  input: {
                    letterSpacing: "2px",
                  },
                }}
                // disabled={!isExpired}
                onClick={() => handleResend()}
              >
                {/* Gửi lại */}
                <Text weight={"normal"}>
                  {isExpired
                    ? getLabel("Gửi lại")
                    : `${Math.floor(durationLeftInSeconds / 60)} : ${
                        durationLeftInSeconds % 60 < 10
                          ? `0${durationLeftInSeconds % 60}`
                          : durationLeftInSeconds % 60
                      }`}
                </Text>
              </Button>
            </Tooltip>
          }
        />

        <Group position="center">
          <Button
            type="submit"
            mt="sm"
            fullWidth
            variant="outline"
            color="dark"
          >
            <Text weight={"500"} transform="uppercase">
              {getLabel("Xác nhận")}
            </Text>
          </Button>
        </Group>
      </form>
    </div>
  );
}
