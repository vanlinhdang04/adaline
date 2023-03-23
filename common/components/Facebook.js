import loadScript from "load-script";

let initialized = false;
let queue = [];

export function fb(callback) {
  if (initialized) {
    callback(window.FB);
  } else {
    queue.push(callback);
    if (!window.fbAsyncInit) {
      window.fbAsyncInit = function () {
        FB.init({
          xfbml: true,
          version: "v14.0",
        });
      };
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
      const script =
        window.localStorage.getItem("fb:debug") === "true"
          ? "xfbml.customerchat/debug.js"
          : "xfbml.customerchat.js";
      loadScript(`https://connect.facebook.net/en_US/sdk/${script}`, {
        async: true,
      });
    }
  }
}
