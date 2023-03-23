import { asyncGet, asyncPost } from "@/apis/fetch";
import { useApiContext } from "@/setup/flexbiz-api-provider";
import { removeStorage, setToStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import React from "react";

export default function useAuth() {
  const context = useApiContext();
  const router = useRouter();
  const [userInput, setUserInput] = React.useState(null);
  const [otpInfo, setOtpInfo] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(false);
  const [error, setError] = React.useState(null);

  const signup = async (data) => {
    try {
      setUserInput(data);
      const rs = await context.apis.asyncSignup(data);
      console.log("rs", rs);
      return {
        status: true,
        message: rs,
      };
    } catch (error) {
      console.log(
        "Error signup => ",
        error.data?.message ||
          error.data ||
          error.message ||
          error.error ||
          error
      );
      setError(error);
      return {
        status: false,
        message:
          error.data?.message ||
          error.data ||
          error.message ||
          error.error ||
          error,
      };
    }
  };

  const sendOtp = async (email) => {
    setUserInput(email);

    if (!email)
      return {
        status: false,
        message: "Lỗi: Không tìm thấy email hoặc số điện thoại",
      };
    try {
      let rs_otpInfo = JSON.parse(await context.apis.asyncLoginSms(email));
      setOtpInfo(rs_otpInfo);
      return {
        status: true,
        message: `Đã gửi mã xác thực đến ${email}`,
      };
    } catch (error) {
      console.log(
        "Error sendOtp => ",
        error.data?.message || error.message || error.error || error
      );
      setError(error);
      return {
        status: false,
        message: error.data?.message || error.message || error.error || error,
      };
    }
  };

  const authOtp = async (otpInput) => {
    if (!otpInfo)
      return {
        status: false,
        message: "Không có mã xác thực",
      };
    try {
      let rs_userInfo = await context.apis.asyncLoginSmsVerify(
        otpInfo._id,
        otpInput,
        {
          once: true,
        }
      );
      setUserInfo(rs_userInfo);
      // localStorage.setItem("token", rs_userInfo.token);
      return {
        status: true,
        message: "Xác thực thành công",
        token: rs_token,
      };
    } catch (error) {
      console.log(
        "Error sendOtp => ",
        error.data?.message || error.message || error.error || error
      );
      setError(error);
      return {
        status: false,
        message: error.data?.message || error.message || error.error || error,
      };
    }
  };

  const resend = async (email = userInput) => {
    try {
      let rs_otpInfo = await sendOtp(email);
      if (rs_otpInfo.status) {
        return {
          status: true,
          message: `Mã xác thực đã gửi đến ${email}`,
        };
      } else {
        return {
          status: false,
          message: `Gửi lại mã xác thực không thành công`,
        };
      }
    } catch (error) {
      console.log(
        "Error handleSubmit => ",
        error.data?.message || error.message || error.error || error
      );
      return {
        status: false,
        message: `Gửi lại mã xác thực không thành công`,
      };
    }
  };

  const login = async (email, password) => {
    try {
      const rs_login = await context.apis.asyncLoginAPI(email, password);
      setUserInfo(rs_login);
      setToStorage("token", rs_login.token);
      setToStorage("updateInfo", true);
      // localStorage.setItem("token", rs_login.token);
      // localStorage.setItem("updateInfo", true);

      return {
        status: true,
        message: "Đăng nhập thành công",
        require_verify: false,
      };
    } catch (error) {
      console.log(
        "Error login => ",
        error.data?.message || error.message || error.error || error
      );
      if (error && (error.data?.require_verify || error.require_verify)) {
        return {
          status: false,
          message: `Xác minh tài khoản! Mã xác thực được gửi đến ${email}`,
          require_verify: true,
        };
      } else {
        return {
          status: false,
          message: error.data?.message || error.message || error.error || error,
          require_verify: false,
        };
      }
    }
  };

  const logout = async (token) => {
    // localStorage.removeItem("token");
    try {
      await context.apis.asyncGet(
        `${process.env.server_url_report}/api/user/logout?access_token=${token}`
      );
      //clear cache
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (
          key.indexOf("labelinfo") < 0 &&
          key.indexOf("listinfo") < 0 &&
          key.indexOf("reportinfo") < 0
        ) {
          removeStorage(key);
          // localStorage.removeItem(key);
        }
      }
      removeStorage("token");
      // localStorage.removeItem("token");
      router.reload();
    } catch (error) {
      console.log(
        "Error logout => ",
        error.data?.message || error.message || error.error || error
      );
    }
  };

  const resetPassword = async (input) => {
    // input ={newPassword , reNewPassword}
    try {
      await context.apis.asyncChangePassword(userInfo.token, input);
      return {
        status: true,
        message: "Thay đổi mật khẩu thành công",
      };
    } catch (error) {
      return {
        status: false,
        message: "Thay đổi mật khẩu không thành công",
      };
    }
  };

  const changePassword = async (data) => {
    // data: {oldPassword: "",
    // newPassword: "",
    // reNewPassword: "",}
    try {
      await context.apis.asyncChangePassword(context.userInfo.token, data);
      return {
        status: "success",
        message: "Đổi mật khẩu thành công",
      };
    } catch (error) {
      console.log(
        "Error changePassword => ",
        error.data?.message || error.message || error.error || error
      );
      return {
        status: "error",
        message: "Đổi mật khẩu không thành công",
      };
    }
  };

  const getProfile = async (token, email) => {
    try {
      const profile = await asyncGet(
        `${process.env.server_url_report}/api/profile?access_token=${token}&email=${email}`
      );
      return { isLogin: true, userInfo: profile };
    } catch (error) {
      return { isLogin: false, userInfo: null };
    }
  };

  const updateProfile = async ({ name, ngay_sinh, gioi_tinh }) => {
    try {
      const rs = await asyncPost({
        url: `${process.env.server_url}/api/updateprofile?access_token=${context?.userInfo?.token}`,

        data: {
          name: name,
          local: {
            exfields: { ngay_sinh: ngay_sinh, gioi_tinh: gioi_tinh },
          },
        },
        method: "POST",
      });
      context.userInfo.name = name;
      context.userInfo.local.exfields.ngay_sinh = ngay_sinh;
      context.userInfo.local.exfields.gioi_tinh = gioi_tinh;
      if (rs) {
        return {
          status: "success",
          message: "Thay đổi thông tin thành công",
        };
      } else {
        return {
          status: "error",
          message: "Thay đổi thông tin không thành công",
        };
      }
    } catch (error) {
      console.log(
        "Error updateProfile => ",
        error.data?.message || error.message || error.error || error
      );
      return {
        status: "error",
        message: "Thay đổi thông tin không thành công",
      };
    }
  };

  return {
    apis: context.apis,
    signup,
    sendOtp,
    authOtp,
    error,
    token: userInfo.token,
    userInfo,
    logout,
    login,
    resend,
    resetPassword,
    changePassword,
    getProfile,
    updateProfile,
  };
}
