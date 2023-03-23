import useCountdownTimer from "@/hooks/useCountdownTimer";
import fetch from "isomorphic-unfetch";
import loadScript from "load-script";
import React from "react";

export { default as useApplyIntroduceCode } from "./useApplyIntroduceCode";
export { default as useGetUserInfoByToken } from "./useGetUserInfoByToken";
export { default as useGetUserProfile } from "./useGetUserProfile";
export { default as useLogin } from "./useLogin";
export { default as useLogout } from "./useLogout";
export { default as useResetPassword } from "./useResetPassword";
export { default as useSignUp } from "./useSignUp";
export { default as useUpdateNewPassword } from "./useUpdateNewPassword";
export { default as useUpdateUserProfile } from "./useUpdateUserProfile";
export { default as useVerifyIntroduceCode } from "./useVerifyIntroduceCode";
export { default as useVerifyOtp } from "./useVerifyOtp";

const useAuth = ({
  configs: _configs,
  onError = () => {},
  onSuccess = () => {},
  toggleVerifyOtpModal = () => {},
  onSignupCompleted = () => {},
}) => {
  const defaultConfigs = {
    server_url: "https://api.flexzen.app",
    server_url_report: "https://api.flexzen.app",
    public_token: "flex.public.token",
    trustkey: "APP.FKJSHHHH908KJF",
    GOOGLE_RECAPTCHA_SITE_KEY: "6Lf25qEUAAAAAFHwh_XZw-YY6HXTdyv2xEp9AHbt",
    google_client_id:
      "936207774867-d5nvdms0bpau4kfqrdnh6mmapkcpd87c.apps.googleusercontent.com",
  };
  const configs = {
    ...defaultConfigs,
    ..._configs,
  };

  const otpResponse = React.useRef();
  const introduceCodeInfo = React.useRef();
  const [otpInput, setOtpInput] = React.useState("");
  const { durationLeftInSeconds, startCountdown, isExpired } =
    useCountdownTimer(120);

  const fetcher = async ({
    url,
    data: bodyObj,
    method = "GET",
    callbackOnSuccess = () => {},
    callbackOnError = () => {},
  }) => {
    const hasBody = Boolean(bodyObj);
    const body = hasBody ? JSON.stringify(bodyObj) : undefined;

    const headers = new Headers({
      "content-type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Accept: "application/json",
    });

    try {
      const res = await fetch(url, {
        method: method.toUpperCase(),
        headers,
        body,
        credentials: "include",
      });

      const data = await handleResponse(
        res,
        callbackOnSuccess,
        callbackOnError
      );

      return data;
    } catch (error) {
      const msg = error?.message || error?.error || error;
      onError(msg);
    }
  };

  const handleResponse = async (
    response,
    callbackOnSuccess,
    callbackOnError
  ) => {
    const data = await transformResponse(response);
    let textString;
    if (typeof data === "string") {
      textString = data;
    }

    if (response.ok) {
      // onSuccess(
      //   data?.message || data?.error || textString || "Thao tác thành công"
      // );
      if (callbackOnSuccess && typeof callbackOnSuccess === "function") {
        callbackOnSuccess();
      }
    } else {
      onError(
        data?.message ||
          data?.error ||
          textString ||
          "Thao tác không thành công"
      );

      if (callbackOnError && typeof callbackOnError === "function") {
        callbackOnError();
      }
    }

    return data;
  };

  const transformResponse = async (response) => {
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.clone().text();
    }
    return data;
  };

  const handleCaptchaMiddleware = (action, callback) => {
    const { GOOGLE_RECAPTCHA_SITE_KEY } = configs;

    try {
      if (!window || !window.grecaptcha) {
        onError("Lỗi load Google Captcha");
        return;
      }
      // eslint-disable-next-line no-undef
      const captcha = grecaptcha;
      captcha.ready(async function () {
        captcha
          .execute(GOOGLE_RECAPTCHA_SITE_KEY, {
            action,
          })
          .then(callback, (error) => {
            console.log(
              "🚀 ~ file: index.js ~ line 125 ~ .then ~ error",
              error
            );
            onError(
              error?.message || error?.error || "Lỗi khi tải google recaptcha."
            );
          })
          .catch((err) => {
            console.log("🚀 ~ file: index.js ~ line 137 ~ err", err);
            onError(
              err?.message || err?.error || "Lỗi khi tải google recaptcha.."
            );
          });
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: index.js ~ line 138 ~ handleCaptchaMiddleware ~ error",
        error
      );

      onError(
        error?.message || error?.error || "Lỗi khi tải google recaptcha..."
      );
    }
  };

  const signup = async ({ data }) => {
    const { id_app, server_url_report, group_id } = configs;

    async function request(captchaToken) {
      let url = server_url_report + "/signup";

      data.group_id = group_id;
      data.id_app = id_app;
      data["g-recaptcha-response"] = captchaToken;

      // response chỉ là 1 đoạn text - tài khoản đã đuọc tạo
      await fetcher({
        url,
        method: "post",
        data,
        callbackOnSuccess: () => requestOtp(data.email),
      });
    }

    // kiểm tra introduce_code - nếu có thì kt có hiệu lực hay ko
    if (data?.introduce_code && !verifyIntroduceCode(data?.introduce_code)) {
      console.log("error occur with introduce_code");
      return;
    }

    handleCaptchaMiddleware("signup", request);
  };

  const signin = () => {};

  // value format could be either email / phonenumber. But the field name must be email
  const requestOtp = (username) => {
    const { server_url_report } = configs;

    async function request(captchaToken) {
      const url =
        server_url_report +
        `/send-otp/${username}?g-recaptcha-response=${captchaToken}`;
      const res = await fetcher({ url });
      if (res?.error) {
        return;
      }

      otpResponse.current = res;

      startCountdown();
      toggleVerifyOtpModal();
      return res;
    }

    handleCaptchaMiddleware("SENDOTP", request);
  };

  const requestOtpAgain = () => {};

  const verifyOtp = async (otpCode, callback) => {
    const { _id, otp } = otpResponse.current;

    if (!_id || !otpCode) {
      onError("Lỗi xác thực mã OTP");
      return;
    }
    const { server_url_report, id_app, group_id } = configs;
    async function request() {
      const url =
        server_url_report +
        `/verify-otp/${_id}/${otp}?id_app=${id_app}&group_id=${group_id}`;

      const data = await fetcher({
        url,
        callbackOnSuccess: () => {
          onSignupCompleted(data?.token);
          toggleVerifyOtpModal();
          // onSuccess("Đăng ký tài khoản thành công");
        },
        callbackOnError: () => {
          onError("Đăng ký tài khoản không thành công. Vui lòng thử lại");
          toggleVerifyOtpModal();
        },
      });

      console.log("data", data);

      if (callback) {
        await callback(data);
      }

      return data;
    }
    return request();
  };

  const verifyIntroduceCode = (introduce_code, callback) => {
    const { server_url, id_app } = configs;
    async function request() {
      const url = `${server_url}/public/${id_app}/introducecode/${introduce_code}`;
      const codeInfo = await fetcher({ url });

      const expiry_date = new Date(codeInfo?.expiry_date);
      if (codeInfo?.error) {
        return undefined;
      }
      if (!codeInfo?.status) {
        onError("Mã giới thiệu này không còn hiệu lực");
        return undefined;
      }
      if (codeInfo?.trang_thai !== "0") {
        onError("Mã giới thiệu này đã được sử dụng");
        return undefined;
      }
      if (expiry_date?.getTime() < new Date().getTime()) {
        onError("Mã giới thiệu này đã hết hạn sử dụng");
        return undefined;
      }

      if (callback) callback(codeInfo);

      introduceCodeInfo.current = codeInfo;
      introduceCodeInfo.current.isApplied = false;
      return codeInfo;
    }
    return request();
  };

  const applyIntroduceCode = (data) => {
    if (!introduceCodeInfo.current || introduceCodeInfo.current?.isApplied)
      return;

    const { token, email } = data || { token: null, email: null };
    const { introduce_code, user_created } = introduceCodeInfo.current || {};
    const { server_url, id_app } = configs;

    async function makeRequest() {
      if (!token) return;
      const introducer = {
        be_introduced: email,
        be_introduced_by: user_created,
        introduce_code: introduce_code,
      };

      const url = `${server_url}/api/${id_app}/introducer?access_token=${token}`;

      await fetcher({
        url,
        method: "POST",
        data: introducer,
      });
    }

    return makeRequest();
  };

  const resetPassword = () => {};

  const changePassword = () => {};

  const getProfile = () => {};

  const updateProfile = () => {};

  const initCustomerAccount = (data, callback) => {
    const { token, email } = data;
    const { server_url, id_app } = configs;

    async function makeRequest() {
      let url = `${server_url}/api/${id_app}/customer?q=${JSON.stringify({
        of_user: email,
      })}&access_token=${token}`;

      await fetcher({
        url,
        callbackOnSuccess: callback(data),
      });
    }

    makeRequest();
  };

  const getUserInfoByToken = ({ token }, callback) => {
    const { server_url } = configs;
    let userToken = token;
    if (!userToken && window) {
      userToken = JSON.parse(window.localStorage.getItem("token"));
    }
    if (!userToken) return;

    async function makeRequest() {
      const url = `${server_url}/api/user?access_token=${userToken}`;
      const userInfoRes = await fetcher({ url });

      if (callback) {
        await callback(userInfoRes);
      }

      return userInfoRes;
    }

    makeRequest();
  };

  const loadGoogleCaptcha = () => {
    const { GOOGLE_RECAPTCHA_SITE_KEY } = configs;
    try {
      if (window && !window.grecaptcha) {
        loadScript(
          `https://www.google.com/recaptcha/api.js?render=${GOOGLE_RECAPTCHA_SITE_KEY}`,
          { async: true },
          (err) => {
            if (err) return console.log("Can't load google recaptcha");
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpFormSubmit = async (e) => {
    e.preventDefault();
    if (otpInput?.length < 4) return;

    await verifyOtp(otpInput, (data) =>
      getUserInfoByToken(data, (props) =>
        initCustomerAccount(props, applyIntroduceCode)
      )
    );
  };

  const renderVerifyForm = React.useCallback(() => {
    return (
      <div className="verify-form">
        <form onSubmit={handleOtpFormSubmit} className="form">
          <div className="form__message-wrapper">
            <p className="form__message">
              Quý khách vui lòng nhập mã OTP đã được gửi về{" "}
              <strong>{otpResponse.current?.phone}</strong>
            </p>
          </div>
          <div className="form__input-wrapper">
            <label className="form__input-label" htmlFor="otpCode">
              Mã xác thực
            </label>
            <input
              name="otpCode"
              id="otpCode"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="form__input"
            />
          </div>

          <div className="form__button-wrapper">
            <button className="form__button">Xác nhận</button>
          </div>
        </form>
        <div className="form__resend-wrapper">
          <div className="form__countdown">
            <button disabled={!isExpired} className="form__resend-button">
              Chưa nhận được mã OTP, gửi lại
            </button>
            {Math.floor(durationLeftInSeconds / 60)} :
            {durationLeftInSeconds % 60 < 10
              ? `0${durationLeftInSeconds % 60}`
              : durationLeftInSeconds % 60}
          </div>
        </div>
      </div>
    );
  }, [otpInput, durationLeftInSeconds, isExpired]);

  return {
    loadGoogleCaptcha,
    signin,
    signup,
    requestOtp,
    requestOtpAgain,
    resetPassword,
    changePassword,
    getProfile,
    updateProfile,
    verifyOtp,
    renderVerifyForm,
    verifyIntroduceCode,
    applyIntroduceCode,
  };
};

export default useAuth;
