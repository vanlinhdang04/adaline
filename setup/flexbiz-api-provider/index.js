import PropTypes from "prop-types";
import React, { useEffect } from "react";
// import openSocket from "socket.io-client";
import APIs from "./APIs";

import { getFromStorage, setToStorage } from "@/utils/localStorage";
import { useSetState } from "@mantine/hooks";
import { appAlert } from "../mantine-provider/notifications";
// import { EmitEvents } from "./utils";
// let socket;

const APIContext = React.createContext();

export const useApiContext = () => {
  return React.useContext(APIContext);
};

const loaded_configs = {
  server_url_report: process.env.server_url_report,
  server_url: process.env.server_url,
  GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  id_app: process.env.id_app,
  group_id: process.env.group_id,
  trustkey: process.env.trustkey,
  system_code: process.env.system_code,
  public_token: process.env.public_token,
  app_code: process.env.app_code,
  again_link: process.env.again_link,
};

const APIProvider = ({ children }) => {
  const [{ userInfo, appInfo, config, apis, token }, setState] = useSetState({
    userInfo: null,
    appInfo: null,
    config: loaded_configs || {},
    apis: new APIs(loaded_configs) || {},
    token: null,
    progressStatus: false,
  });

  useEffect(() => {
    let token;
    // const params = queryString.parse(window.location.search);
    // token = params.access_token;

    setToStorage("id_app", config?.id_app);
    if (!token) {
      token = getFromStorage("token");
      setState({ token });
    } else {
      // setToStorage("token", token);
      // setState({ token });
    }
  }, []);

  React.useEffect(() => {
    async function getAppInfo() {
      let appInfo = await apis.asyncGetAppInfo(
        process.env.public_token,
        process.env.id_app
      );

      setToStorage("appInfo", appInfo);
      setState({ appInfo });
    }
    getAppInfo();
  }, []);

  React.useEffect(() => {
    async function verifyUserToken() {
      if (!token || !config.id_app) return;
      try {
        let userInfo = await apis.asyncGetUserInfoByToken(token);

        userInfo.token = token;
        setState({
          userInfo,
        });
        setToStorage("userInfo", userInfo);
      } catch (e) {
        setToStorage("token", null);
      }
    }
    verifyUserToken();
  }, [token, config.id_app]);

  React.useEffect(() => {
    if (!userInfo || !appInfo) return;
    //socket
    // initSocket(userInfo);
    //register endpoint
    // registerEndpoint(userInfo);
  }, [userInfo]);

  function initSocket(user) {
    // socket = EmitEvents.socket.socket;
    // if (socket) {
    //   try {
    //     socket.close();
    //   } catch (e) {
    //     console.error(e.message);
    //   }
    // }
    // if (!user) return;
    // console.log("socket connecting");
    // EmitEvents.socket.socket = socket = openSocket(config.server_url);
    // socket.on("connect", function () {
    //   console.log("socket Connected");
    //   socket.emit("login", {
    //     token: user.token,
    //     email: user.email,
    //   });
    // });
    // socket.io.on("reconnect", function () {
    //   console.log("socket reconnected");
    //   socket.emit("login", {
    //     token: user.token,
    //     email: user.email,
    //   });
    // });
    // socket.io.on("reconnect_error", function () {
    //   console.error("socket reconnect error");
    // });
    // socket.io.on("reconnect_failed", function () {
    //   console.error("socket reconnect failed");
    // });
    // socket.on("disconnect", function () {
    //   console.error("socket disconnected");
    // });
    // socket.on("connect_error", function () {
    //   console.error("socket connect error");
    // });
    // socket.on("connect_timeout", (timeout) => {
    //   console.error("socket connect timeout", timeout);
    // });
    // socket.on("login", () => {
    //   console.log("Socket logined");
    // });
    // socket.on("notify:count", function (data) {
    //   EmitEvents.dispatch("notify:count", data);
    // });
    // socket.on("notify:new", function (data) {
    //   EmitEvents.dispatch("notify:new", data);
    // });
  }
  // eslint-disable-next-line no-unused-vars
  // function registerSocketEvents(socket, user) {
  //   //pbl event
  //   socket.on("pbl:payment", function (data) {
  //     //console.log("event pbl:payment",data)
  //     EmitEvents.dispatch("pbl:payment", data);
  //   });
  //   socket.on("pbl:update", function (data) {
  //     //console.log("event pbl:update",data)
  //     EmitEvents.dispatch("pbl:update", data);
  //   });
  //   socket.on("pbl:new", function (data) {
  //     //console.log("event pbl:new",data)
  //     EmitEvents.dispatch("pbl:new", data);
  //   });
  //   socket.on("pbl:delete", function (data) {
  //     //console.log("event so1:new",data)
  //     EmitEvents.dispatch("so1:delete", data);
  //   });
  // }

  // async function registerEndpoint(user) {
  //   let endpoint = endpoint;
  //   // eslint-disable-next-line no-undef
  //   if (!endpoint) return;
  //   //console.log("register endpoint for user",user?user.email:'public',"...");
  //   let url = `${config.server_url}/api/register-endpoint?access_token=${
  //     user ? user.token : config.public_token
  //     // eslint-disable-next-line no-undef
  //   }&ep=${encodeURIComponent(endpoint)}`;
  //   try {
  //     await apis.asyncGet(url);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  function setProgressStatus(status, callback, title) {
    // setState({ progressStatus: status });
  }

  function alert(message, callback, type = "info") {
    appAlert({
      type: "info",
      message,
      onClose: callback,
    });
  }

  function prompt(title, default_value, callback, options) {}

  function toast(message) {
    appAlert({
      type: "info",
      message,
    });
  }

  return (
    <APIContext.Provider
      value={{
        userInfo,
        appInfo,
        config,
        apis,
        token,
        toast,
        alert,
        setProgressStatus,
        prompt,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

APIProvider.propTypes = {
  children: PropTypes.any,
  handleSocketEvents: PropTypes.func,
  // registerSocketEvents: PropTypes.func,
};
export default APIProvider;
