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
          console.log("🚀 ~ file: index.js ~ line 125 ~ .then ~ error", error);
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

export default handleCaptchaMiddleware;
