import axios from "@/setup/axios";
import { setToStorage } from "@/utils/localStorage";
import { Buffer } from "buffer";
import localStorageDB from "./localStorageDB";

if (typeof window !== "undefined") {
  if (!window?.ldb) {
    window.ldb = localStorageDB();
  }
}

const cachedData = {};

const list_not_require_id_app_default = [
  "user",
  "users",
  "notification",
  "message",
  "listinfo",
  "moduleinfo",
  "reportinfo",
  "tableinfo",
  "labelinfo",
  "rptobject",
  "trangthai",
  "app",
  "sysgroup",
  "sysconfig",
  "schedule",
  "templatestore",
  "tinhthanh",
  "quanhuyen",
  "xaphuong",
  "token",
  "importexceltemplate",
  "exportexceltemplate",
];
export default class APIs {
  constructor(config = {}) {
    if (!config.server_url_report) config.server_url_report = config.server_url;
    if (!config.list_not_require_id_app) config.list_not_require_id_app = [];
    this.config = config;
    this.config.get = (name) => {
      return config[name];
    };
    this.labels = null;
    this.lang = "vi";
    this.list_not_require_id_app = [
      ...list_not_require_id_app_default,
      ...config.list_not_require_id_app,
    ];

    this.cachedData = cachedData;
    this.get = this.get.bind(this);
    this.getLocal = this.getLocal.bind(this);
    this.asyncGet = this.asyncGet.bind(this);
    this.post = this.post.bind(this);
    this.asyncPost = this.asyncPost.bind(this);
    this.asyncDelete = this.asyncDelete.bind(this);
    this.asyncGetDataById = this.asyncGetDataById.bind(this);
    this.asyncGetData = this.asyncGetData.bind(this);
    this.asyncGetDataShared = this.asyncGetDataShared.bind(this);
    this.asyncGetList = this.asyncGetList.bind(this);
    this.asyncGetDataByIdShared = this.asyncGetDataByIdShared.bind(this);
    this.asyncGetListShared = this.asyncGetListShared.bind(this);
    this.asyncPostList = this.asyncPostList.bind(this);
    this.asyncDeleteList = this.asyncDeleteList.bind(this);
    // this.asyncGetReport = this.asyncGetReport.bind(this);
    this.asyncFiles = this.asyncFiles.bind(this);
    this.asyncGetLogById = this.asyncGetLogById.bind(this);

    this.loginAPI = this.loginAPI.bind(this);
    this.asyncLoginAPI = this.asyncLoginAPI.bind(this);
    this.logoutAPI = this.logoutAPI.bind(this);
    this.asyncLoginSms = this.asyncLoginSms.bind(this);
    this.asyncLoginSmsVerify = this.asyncLoginSmsVerify.bind(this);

    this.asyncLogoutAPI = this.asyncLogoutAPI.bind(this);
    this.asyncSign = this.asyncSign.bind(this);
    this.signup = this.signup.bind(this);
    this.asyncSignup = this.asyncSignup.bind(this);
    this.asyncResetPassword = this.asyncResetPassword.bind(this);
    this.asyncChangePasswordByAdmin =
      this.asyncChangePasswordByAdmin.bind(this);
    this.asyncChangePassword = this.asyncChangePassword.bind(this);
    this.getUserInfoByToken = this.getUserInfoByToken.bind(this);
    this.asyncGetUserInfoByToken = this.asyncGetUserInfoByToken.bind(this);
    this.asyncGetProfile = this.asyncGetProfile.bind(this);

    this.asyncJoinApp = this.asyncJoinApp.bind(this);
    this.asyncGetAppInfo = this.asyncGetAppInfo.bind(this);
    this.asyncBackup = this.asyncBackup.bind(this);
    this.asyncRestore = this.asyncRestore.bind(this);

    this.getWalletByAddress = this.getWalletByAddress.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.getLabelsList = this.getLabelsList.bind(this);
    this.asyncCountShared = this.asyncCountShared.bind(this);
    this.asyncLoadLang = this.asyncLoadLang.bind(this);
    this.asyncSetLang = this.asyncSetLang.bind(this);
    this.asyncGetCustomerByEmail = this.asyncGetCustomerByEmail.bind(this);
    this.asyncGetPaymentMethods = this.asyncGetPaymentMethods.bind(this);
    // this.downloadFile = this.downloadFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    // this.asyncGetMenu = this.asyncGetMenu.bind(this);
    this.asyncUpdateRight = this.asyncUpdateRight.bind(this);
    this.addNotifySchedule = this.addNotifySchedule.bind(this);
    this.deleteNotifySchedule = this.deleteNotifySchedule.bind(this);

    this.addSchedule = this.addSchedule.bind(this);
    this.deleteSchedule = this.deleteSchedule.bind(this);
  }
  convertModel(model_name) {
    if (model_name === "dmtk") model_name = "account";
    if (model_name === "dmkh") model_name = "customer";
    if (model_name === "dmnt") model_name = "currency";
    return model_name;
  }
  getLocal(url, headers, callback, options = {}) {
    if (typeof window === "undefined") return;
    window.ldb.getItem(url, (error, data) => {
      if (data) {
        //console.log("get from local",options,data);
        if (options.stringifyData == false && typeof data !== "object") {
          try {
            data = JSON.parse(data);
          } catch (e) {
            console.error(e, data);
            data = undefined;
          }
        }
        this.get(
          url,
          headers,
          (error, rs) => {
            if (error) {
              if (data === undefined) {
                callback(error);
              }
              return console.error(error);
            }
            window.setImmediate(() => {
              window.ldb.setItem(
                url,
                typeof rs == "object" ? JSON.stringify(rs) : rs,
                (e) => {
                  if (e) {
                    window.ldb.removeItem(url);
                    console.error(e);
                  }
                }
              );
              if (data === undefined) {
                callback(null, rs);
              }
            });
          },
          { cache: true, stringifyData: options.stringifyData }
        );

        if (data != undefined) {
          callback(null, data);
        }
      } else {
        this.get(
          url,
          headers,
          (error, rs) => {
            if (error) return callback(error);
            window.setImmediate(() => {
              window.ldb.setItem(
                url,
                typeof rs == "object" ? JSON.stringify(rs) : rs,
                (e) => {
                  if (e) {
                    window.ldb.removeItem(url);
                    console.error(e);
                  }
                }
              );
            });
            callback(null, rs);
          },
          { cache: true, stringifyData: options.stringifyData }
        );
      }
    });
  }
  get(url, headers, callback, options = { cache: false, stringifyData: true }) {
    let trustkey = this.config.get("trustkey");
    if (trustkey) {
      if (url.indexOf("?") < 0) {
        url = url + "?trustkey=" + trustkey;
      } else {
        url = url + "&trustkey=" + trustkey;
      }
    }

    if (
      cachedData[url] &&
      cachedData[url] != "[]" &&
      cachedData[url] != "{}" &&
      options.cache
    ) {
      let text = cachedData[url];
      //console.log("get from cache",options,text)
      if (options.stringifyData === false && typeof text != "object") {
        try {
          text = JSON.parse(text);
        } catch (e) {
          console.error(e, text);
        }
      }
      return callback(null, text);
    }
    //let _headers ={"Accept-Encoding":"gzip"};
    let _headers = {};
    if (headers) {
      _headers = {};
      if (Array.isArray(headers)) {
        headers.forEach((h) => {
          _headers[h.name] = h.value;
        });
      } else {
        _headers = Object.assign(_headers, headers);
      }
    }

    axios
      .get(url, { headers: _headers })
      .then((response) => {
        let text =
          options.stringifyData != false && typeof response.data === "object"
            ? JSON.stringify(response.data)
            : response.data;
        callback(null, text);
        if (options.cache) {
          if (options.stringifyData == false) {
            cachedData[url] = response.data;
          } else {
            cachedData[url] =
              typeof response.data === "object"
                ? JSON.stringify(response.data)
                : response.data;
          }
        }
      })
      .catch((e) => {
        let error = (e.response ? e.response.data : e) || e;
        //console.error("Error get data:",error);
        callback(error);
      });

    /*fetch(url,{
      method: 'GET',
      headers: _headers
    }).then( response => {
      response.text().then((text)=>{
        if(response.ok) {
          callback(null,text);
          if(options.cache){
            cachedData[url] = text;
            //console.log("cached data",url);
          } 
        }else{
          console.error("error fetch data",text);
          try{
            if(typeof(text)!=="object"){
              if(text.indexOf("{")===0){
                text = JSON.parse(text)
              }else{
                text ={message:text,code:400}
              }
            }
          }catch(e){
            text ={message:text,code:400}
          }
          if(!text.message){
            text.message = text.error || "Đã có lỗi xảy ra"
          }
          callback(text);
        }
      })
    })
    .catch(e=>callback(e))*/
  }
  async post(
    url,
    headers,
    data,
    callback,
    method = "POST",
    options = { stringifyData: true }
  ) {
    let trustkey = this.config.get("trustkey");
    if (trustkey) {
      if (url.indexOf("?") < 0) {
        url = url + "?trustkey=" + trustkey;
      } else {
        url = url + "&trustkey=" + trustkey;
      }
    }

    let _headers = {};
    _headers["Content-Type"] = "application/json";
    //_headers['Content-Encoding']= 'deflate';
    if (headers) {
      if (Array.isArray(headers)) {
        headers.forEach((h) => {
          _headers[h.name] = h.value;
        });
      } else {
        _headers = Object.assign(_headers, headers);
      }
    }
    /*if(!cache_module.zipLib){
      const {default:pako} = await import("pako");
      cache_module.zipLib = pako;
    } 
    let zippedData = cache_module.zipLib.deflate(JSON.stringify(data));*/

    axios({
      method: method.toLowerCase(),
      url: url,
      data: data,
      //data: zippedData,

      headers: _headers,
    })
      .then((response) => {
        //console.log(options.stringifyData,response.data);
        let text =
          options.stringifyData != false && typeof response.data === "object"
            ? JSON.stringify(response.data)
            : response.data;
        callback(null, text, response);
      })
      .catch((e) => {
        let error = (e.response ? e.response.data : e) || e;
        //console.error("Error get data:",error);
        callback(error);
      });
  }
  deleteRequest(url, headers, callback, options = { stringifyData: true }) {
    let trustkey = this.config.get("trustkey");
    if (trustkey) {
      if (url.indexOf("?") < 0) {
        url = url + "?trustkey=" + trustkey;
      } else {
        url = url + "&trustkey=" + trustkey;
      }
    }

    let _headers = {};
    if (headers) {
      if (Array.isArray(headers)) {
        headers.forEach((h) => {
          _headers[h.name] = h.value;
        });
      } else {
        _headers = Object.assign(_headers, headers);
      }
    }

    axios({
      method: "delete",
      url: url,

      headers: _headers,
    })
      .then((response) => {
        let text =
          options.stringifyData != false && typeof response.data === "object"
            ? JSON.stringify(response.data)
            : response.data;
        callback(null, text, response);
      })
      .catch((e) => {
        let error = (e.response ? e.response.data : e) || e;
        //console.error("Error get data:",error);
        callback(error);
      });
  }

  async asyncGet(url, headers, options = {}) {
    //console.log("asyncget",options);
    let p = new Promise((resovle, reject) => {
      if (options.cache_local) {
        this.getLocal(
          url,
          headers,
          (e, rs) => {
            if (e) return reject(e);
            resovle(rs);
          },
          options
        );
      } else {
        this.get(
          url,
          headers,
          (e, rs) => {
            if (e) return reject(e);
            resovle(rs);
          },
          options
        );
      }
    });
    return p;
  }
  async asyncGetList(access_token, model_name, options = {}) {
    options.stringifyData = false;
    model_name = this.convertModel(model_name);
    let _id_app =
      this.list_not_require_id_app.indexOf(model_name) >= 0
        ? ""
        : options.id_app ||
          (options.condition || {}).id_app ||
          this.config.get("id_app");

    //if(!options.notfields && !options.count) options.notfields = 'mieu_ta,mieu_ta_goc,mieu_ta_en,mieu_ta_goc_en';
    let rs;
    if (options.cache || options.cache_local || !_id_app) {
      let url = `${this.config.get("server_url_report")}/api${
        _id_app ? "/" + _id_app : ""
      }/${model_name}?page=${
        options.page || 1
      }&access_token=${access_token}&trustkey=${process.env.trustkey}`;
      if (options.query_string) url = `${url}&${options.query_string}`;
      if (options.buildUrl) {
        url = options.buildUrl(url);
      }

      if (options.sort) url = `${url}&sort=${JSON.stringify(options.sort)}`;
      if (options.condition && Object.keys(options.condition).length > 0) {
        url = `${url}&q=${JSON.stringify(options.condition)}`;
      }
      if (options.fields) url = `${url}&fields=${options.fields}`;
      if (options.limit) url = `${url}&limit=${options.limit}`;
      if (options.notfields) url = `${url}&notfields=${options.notfields}`;
      if (options.count) url = `${url}&count=1`;
      if (options.log) {
        options.log("fetch: " + url);
      }
      rs = await this.asyncGet(url, null, options);
    } else {
      let url = `${this.config.get(
        "server_url_report"
      )}/api/search/${_id_app}/${model_name}?access_token=${access_token}`;
      if (options.query_string) url = `${url}&${options.query_string}`;
      if (options.buildUrl) {
        url = options.buildUrl(url);
      }
      if (options.log) {
        options.log("fetch: " + url);
      }
      let body = { ...options };

      if (options.condition) body.q = body.condition;
      delete body.condition;

      if (!options.count) body.page = body.page || 1;
      else {
        delete body.fields;
        delete body.notfields;
        delete body.page;
        body.count = 1;
      }
      delete body.query_string;
      delete body.buildUrl;
      delete body.log;
      delete body.cache_local;
      delete body.cache;
      //console.log(url,body);
      rs = await this.asyncPost(url, null, body, "POST", "GETLIST", false, {
        stringifyData: false,
      });
    }
    if (!rs) return [];
    try {
      if (!options.fields && !options.count) {
        rs.forEach((r) => {
          r.is_full_data = true;
        });
      }
      return rs;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async asyncPost(
    url,
    headers,
    data,
    method = "POST",
    action = "POST",
    require_recaptcha = true,
    options = {}
  ) {
    //console.log("asyncpost",options);
    const config = this.config;
    const post = this.post;
    return new Promise((resolve, reject) => {
      if (
        config.get("GOOGLE_RECAPTCHA_SITE_KEY") &&
        typeof grecaptcha !== "undefined" &&
        require_recaptcha
      ) {
        grecaptcha.ready(function () {
          grecaptcha
            .execute(config.get("GOOGLE_RECAPTCHA_SITE_KEY"), {
              action: action,
            })
            .then(
              function (token) {
                data["g-recaptcha-response"] = token;
                post(
                  url,
                  headers,
                  data,
                  (e, rs) => {
                    if (e) return reject(e);
                    resolve(rs);
                  },
                  method,
                  options
                );
              },
              function (e) {
                reject({
                  message: e || "Lỗi khi tải google recaptcha",
                  code: 400,
                });
              }
            );
        });
      } else {
        //console.time(`${method}: ${url}`);
        post(
          url,
          headers,
          data,
          (e, rs) => {
            if (e) return reject(e);
            //console.timeEnd(`${method}: ${url}`);
            resolve(rs);
          },
          method,
          options
        );
      }
    });
  }
  async asyncPostList(access_token, model_name, data, options = {}) {
    options.stringifyData = false;
    model_name = this.convertModel(model_name);
    let _id_app =
      this.list_not_require_id_app.indexOf(model_name) >= 0
        ? ""
        : options.id_app || data.id_app || this.config.get("id_app");
    let url = `${this.config.get("server_url_report")}/api${
      _id_app ? "/" + _id_app : ""
    }/${model_name}`;
    let method = "POST";
    if (data._id) {
      url = `${url}/${data._id}`;
      method = "PUT";
    } else {
      delete data._id;
    }
    url = `${url}?access_token=${access_token}`;
    // setImmediate(() => {
    //   for (let key in cachedData) {
    //     if (key.indexOf(model_name) >= 0) delete cachedData[key];
    //   }
    // });
    return await this.asyncPost(
      url,
      null,
      data,
      method,
      method,
      false,
      options
    );
  }

  async asyncDeleteList(access_token, model_name, _id, options = {}) {
    // setImmediate(() => {
    //   for (let key in cachedData) {
    //     if (key.indexOf(model_name) >= 0) delete cachedData[key];
    //   }
    // });
    model_name = this.convertModel(model_name);
    let _id_app =
      this.list_not_require_id_app.indexOf(model_name) >= 0
        ? ""
        : options.id_app || this.config.get("id_app");
    let url = `${this.config.get("server_url_report")}/api${
      _id_app ? "/" + _id_app : ""
    }/${model_name}/${_id}`;
    url = `${url}?access_token=${access_token}`;

    if (options.otp_id) url = `${url}&otp-id=${options.otp_id}`;
    if (options.otp_code) url = `${url}&otp-code=${options.otp_code}`;

    return await this.asyncDelete(url);
  }
  async asyncGetListShared(access_token, model_name, options = {}) {
    options.stringifyData = false;
    model_name = this.convertModel(model_name);
    //if(!options.notfields) options.notfields = 'exfields,mieu_ta,mieu_ta_goc,mieu_ta_en,mieu_ta_goc_en';
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${model_name}/shared?page=${
      options.page || 1
    }&access_token=${access_token}&trustkey=${process.env.trustkey}`;
    if (options.sort) url = `${url}&sort=${JSON.stringify(options.sort)}`;
    if (options.condition && Object.keys(options.condition).length > 0)
      url = `${url}&q=${JSON.stringify(options.condition)}`;
    if (options.limit) url = `${url}&limit=${options.limit}`;
    if (options.fields) url = `${url}&fields=${options.fields}`;
    if (options.notfields) url = `${url}&notfields=${options.notfields}`;
    if (options.count) url = `${url}&count=1`;

    if (options.log) {
      options.log("fetch: " + url);
    }

    let rs = await this.asyncGet(url, null, options);
    return rs;
  }
  async asyncGetDataById(access_token, model_name, id, _id_app, options = {}) {
    options.stringifyData = false;
    if (!_id_app) _id_app = this.config.get("id_app");
    model_name = this.convertModel(model_name);
    _id_app =
      this.list_not_require_id_app.indexOf(model_name) >= 0
        ? ""
        : _id_app + "/";
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${_id_app}${model_name}/${id}?access_token=${access_token}`;
    let rs = await this.asyncGet(url, undefined, options);
    return rs;
  }
  async asyncGetDataByIdShared(access_token, model_name, id, options = {}) {
    options.stringifyData = false;
    model_name = this.convertModel(model_name);

    let url = `${this.config.get(
      "server_url_report"
    )}/api/${model_name}/shared/${id}?access_token=${access_token}`;
    let rs = await this.asyncGet(url, undefined, options);
    return rs;
  }

  async asyncGetData(
    access_token,
    model_name,
    condition,
    field,
    cache = false,
    cache_local = false,
    options = {}
  ) {
    let rs = await this.asyncGetList(access_token, model_name, {
      id_app: options.id_app || (condition || {}).id_app,
      condition: condition,
      fields: field,
      cache: cache,
      cache_local: cache_local,
      notfields: "__v",
    });
    if (rs.length > 0) {
      return field ? rs[0][field] : rs[0];
    } else {
      return null;
    }
  }
  async asyncGetDataShared(access_token, model_name, condition) {
    let rs = await this.asyncGetListShared(access_token, model_name, {
      condition: condition,
    });
    if (rs.length > 0) {
      return rs[0];
    } else {
      return null;
    }
  }

  async asyncGetLogById(access_token, model_name, id, _id_app, options = {}) {
    options.stringifyData = false;
    if (!_id_app) _id_app = this.config.get("id_app");
    model_name = this.convertModel(model_name);
    _id_app =
      this.list_not_require_id_app.indexOf(model_name) >= 0
        ? ""
        : _id_app + "/";
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${_id_app}${model_name}/g/history/${id}?access_token=${access_token}`;
    let rs = await this.asyncGet(url, undefined, options);
    return rs;
  }

  async asyncDelete(url, headers) {
    let p = new Promise((resovle, reject) => {
      this.deleteRequest(url, headers, (e, rs) => {
        if (e) return reject(e);
        resovle(rs);
      });
    });
    return p;
  }

  async asyncFiles(
    access_token,
    id_link,
    _id_app = "",
    _condition = {},
    limit = 0
  ) {
    let condition = {
      id_link: id_link,
    };
    condition = Object.assign(condition, _condition);
    if (!_id_app) _id_app = this.config.get("id_app");
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${_id_app}/file?q=${JSON.stringify(
      condition
    )}&access_token=${access_token}`;
    if (limit) url = url + "&limit=" + limit.toString();
    let files = await this.asyncGet(url, null, {
      cache: true,
      stringifyData: false,
    });
    return files;
  }
  //labels management
  async getLabelsList() {
    console.time("load label list");
    let public_token = this.config.get("public_token");
    if (!public_token) public_token = this.config.get("token");
    if (!public_token) {
      this.labels = {};
      return;
    }
    let condition = {
      labelid: this.config.get("app_code"),
    };
    let url = `${this.config.get(
      "server_url_report"
    )}/api/labelinfo?access_token=${public_token}&q=${JSON.stringify(
      condition
    )}`;
    try {
      let _rs = await this.asyncGet(url, null, {
        cache_local: true,
        stringifyData: false,
      });
      this.labels = {};
      _rs.forEach((r) => {
        this.labels[r.textid] = r;
      });
      console.timeEnd("load label list");
    } catch (e) {
      console.log("can't get labels list", e);
    }
  }
  async createLabel(condition) {
    if (!this.labels) return;
    let token = this.config.get("token");
    if (!token) {
      return;
    }
    let url = `${this.config.get(
      "server_url_report"
    )}/api/labelinfo?access_token=${token}`;
    try {
      await this.asyncPost(url, null, condition, "POST", "createLabel");
      this.labels[condition.textid] = condition;
    } catch (e) {
      //console.log("can't create default label",e,condition.textid);
    }
  }
  async asyncLoadLang() {
    try {
      this.lang = localStorage.getItem("lang");
    } catch (e) {
      this.lang = "vi";
    }
    try {
      if (!this.lang) this.lang = "vi";
    } catch (e) {
      this.lang = "vi";
    }
    return this.lang;
  }
  async asyncSetLang(_lang) {
    this.lang = _lang;
    try {
      setToStorage("lang", _lang);
    } catch (e) {
      if (e) console.error(e);
    }
  }
  getLanguage() {
    return this.lang;
  }
  getLabel(textid, defaultv = "", defaulte = "", lang = "") {
    if (!textid) return "";
    let _default, field;
    if (!lang) lang = this.getLanguage();
    if (lang === "vi") {
      _default = defaultv || defaulte || textid;
      field = "textv";
    } else {
      _default = defaulte || defaultv || textid;
      field = "texte";
    }
    try {
      let _label;
      if (this.labels && this.labels[textid.toUpperCase()]) {
        _label = this.labels[textid.toUpperCase()][field];
      }
      if (!_label) {
        _label = _default || textid;
        //create label default
        let condition = {
          labelid: this.config.get("app_code"),
          textid: textid.toUpperCase(),
        };
        condition.texte = defaulte || defaultv || textid;
        condition.textv = defaultv || defaulte || textid;
        // setImmediate(() => {
        //   this.createLabel(condition);
        // });
      }
      return _label || "";
    } catch (e) {
      console.log("error get label", e);
      return _default || textid || "";
    }
  }

  async asyncCountShared(access_token, condition, model_name) {
    try {
      let countFloor = await this.asyncGetListShared(access_token, model_name, {
        condition: condition,
        count: 1,
      });
      countFloor.condition = condition;
      return countFloor;
    } catch (e) {
      e.condition = condition;
      return e;
    }
  }
  getUserInfoByToken(token, callback) {
    let url =
      this.config.get("server_url_report") + "/api/user?access_token=" + token;
    this.get(
      url,
      null,
      (error, rs) => {
        if (error) return callback(error);
        let userInfo = JSON.parse(rs);
        //get app info
        callback(null, userInfo);
      },
      { cache_local: true }
    );
  }
  async asyncGetUserInfoByToken(token) {
    if (!token) {
      try {
        token = await localStorage.getItem("token");
      } catch (e) {
        if (e) console.error(e);
      }
    }
    if (!token) return null;
    let url = this.config.server_url_report + "/api/user?access_token=" + token;
    let rs = await this.asyncGet(url, null, { cache: true, cache_local: true });
    let userInfo = JSON.parse(rs);
    return userInfo;
  }
  async asyncGetProfile(
    token,
    userName,
    options = { cache: true, cache_local: true }
  ) {
    options.stringifyData = false;
    let url =
      this.config.server_url_report +
      "/api/profile?access_token=" +
      token +
      "&email=" +
      userName;
    let rs = await this.asyncGet(url, null, options);
    return rs;
  }
  async asyncGetAppInfo(
    token,
    _id_app = "",
    fields = "",
    options = { cache: true, cache_local: true }
  ) {
    // if (!_id_app) _id_app = this.config.get("id_app");
    options.stringifyData = false;

    let url =
      this.config.server_url_report +
      "/api/app/" +
      _id_app +
      "?access_token=" +
      token;
    // if (fields) url = url + "&fields=" + fields;

    // console.log("url", url);

    let rs = await this.asyncGet(url, null, options);

    return rs;
  }

  // async asyncGetReport(
  //   token,
  //   report,
  //   condition = {},
  //   options = { cache: true }
  // ) {
  //   const { default: moment } = await import("moment");
  //   const id_app = this.config.get("id_app");
  //   let url =
  //     this.config.get("server_url_report") +
  //     "/api/" +
  //     id_app +
  //     "/" +
  //     report +
  //     "?access_token=" +
  //     token;
  //   for (let key in condition) {
  //     if (condition[key]) {
  //       let c = condition[key];
  //       if (c.getTime) {
  //         c = moment(c).format("YYYY-MM-DD");
  //       }
  //       url = `${url}&${key}=${c}`;
  //     }
  //   }
  //   options.stringifyData = false;
  //   let rs = await this.asyncGet(url, null, options);
  //   return rs;
  // }
  loginAPI(username, password, callback, options = {}) {
    if (!options.id_app) options.id_app = this.config.get("id_app");
    if (!options.group_id) options.group_id = this.config.get("group_id");

    let url = this.config.get("server_url_report") + "/auth/local";
    if (options.id_app && options.group_id) {
      url = `${url}?id_app=${options.id_app}&group_id=${options.group_id}`;
    }
    if (options.once) {
      url = `${url}&once=1`;
    }

    let Authorization =
      "Basic " + Buffer.from(username + ":" + password).toString("base64");
    this.get(
      url,
      [{ name: "Authorization", value: Authorization }],
      (error, token) => {
        if (error) {
          console.log(error);
          try {
            error = JSON.parse(error);
            return callback(error);
          } catch (e) {
            return callback(error);
          }
        }
        try {
          token = JSON.parse(token);
          token = token.token;
        } catch (e) {
          token = JSON.parse(token);
        }

        if (!options.once) {
          this.getUserInfoByToken(token, (error, userInfo) => {
            if (error) {
              return callback(error);
            }
            userInfo.token = token;
            callback(null, userInfo);
          });
        } else {
          callback(null, { token: token });
        }
      }
    );
  }
  async asyncLoginAPI(username, password, options) {
    return new Promise((resolve, reject) => {
      this.loginAPI(
        username,
        password,
        (e, rs) => {
          if (e) return reject(e);
          resolve(rs);
        },
        options
      );
    });
  }
  async asyncLoginSms(phone) {
    let url = this.config.get("server_url_report") + `/send-otp/${phone}`;
    let self = this;
    return new Promise((resolve, reject) => {
      grecaptcha.ready(function () {
        grecaptcha
          .execute(self.config.get("GOOGLE_RECAPTCHA_SITE_KEY"), {
            action: "SENDOTP",
          })
          .then(
            function (token) {
              url = `${url}?g-recaptcha-response=${token}`;
              self
                .asyncGet(url)
                .then((rs) => {
                  resolve(rs);
                })
                .catch((e) => {
                  reject(e);
                });
            },
            function (e) {
              reject({
                message: e || "Lỗi khi tải google recaptcha",
                code: 400,
              });
            }
          );
      });
    });
  }
  async asyncLoginSmsVerify(id, otp, options = {}) {
    let url = this.config.get("server_url_report") + `/verify-otp/${id}/${otp}`;

    if (!options.id_app) options.id_app = this.config.get("id_app");
    if (!options.group_id) options.group_id = this.config.get("group_id");

    if (options.id_app && options.group_id) {
      url = `${url}?id_app=${options.id_app}&group_id=${options.group_id}`;
    }
    if (options.once) {
      url = `${url}&once=1`;
    }
    let token = await this.asyncGet(url);
    try {
      token = JSON.parse(token);
      token = token.token;
    } catch (e) {
      token = JSON.parse(token);
    }
    // sua doi
    return token;
    // let userInfo = {};
    // if (!options.once) {
    //   userInfo = await this.asyncGetUserInfoByToken(token);
    // }
    // userInfo.token = token;
    // return userInfo;
  }
  async asyncSign(username, password, data) {
    let url = this.config.get("server_url_report") + "/auth/sign";
    let Authorization =
      "Basic " + Buffer.from(username + ":" + password).toString("base64");
    return await this.asyncPost(
      url,
      [{ name: "Authorization", value: Authorization }],
      data,
      "POST",
      "POST",
      false
    );
  }

  async removeEndpoint(userInfo, callback) {
    if (endpoint) {
      let url =
        this.config.get("server_url_report") +
        "/api/remove-endpoint?access_token=" +
        userInfo.token +
        "&ep=" +
        endpoint;
      this.get(url, null, (error) => {
        callback(error);
      });
    } else {
      callback();
    }
  }
  logoutAPI(userInfo, callback) {
    this.removeEndpoint(userInfo, (error) => {
      if (error) return callback(error);
      let url =
        this.config.get("server_url_report") +
        "/api/user/logout?access_token=" +
        userInfo.token;
      if (endpoint) url = url + "&ep=" + endpoint;
      this.get(url, null, (error, rs) => {
        if (error) return callback(error);
        //clear cache
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (
            key.indexOf("labelinfo") < 0 &&
            key.indexOf("listinfo") < 0 &&
            key.indexOf("reportinfo") < 0
          ) {
            localStorage.removeItem(key);
          }
        }
        callback(null, rs);
      });
    });
  }
  async asyncLogoutAPI(userInfo) {
    return new Promise((resolve, reject) => {
      this.logoutAPI(userInfo, (e, rs) => {
        if (e) return reject(e);
        resolve(rs);
      });
    });
  }
  signup(data, callback, _id_app) {
    let _this = this;
    const config = this.config;
    if (!_id_app) _id_app = config.get("id_app");
    const group_id = this.config.get("group_id");
    if (
      config.get("GOOGLE_RECAPTCHA_SITE_KEY") &&
      typeof grecaptcha !== "undefined"
    ) {
      grecaptcha.ready(function () {
        grecaptcha
          .execute(config.get("GOOGLE_RECAPTCHA_SITE_KEY"), {
            action: "signup",
          })
          .then(
            function (token) {
              let url = config.get("server_url_report") + "/signup";
              data.group_id = group_id;
              data.id_app = _id_app;
              data["g-recaptcha-response"] = token;
              _this.post(url, null, data, (e, rs) => {
                if (e) return callback(e);
                callback(null, rs);
              });
            },
            function (error) {
              //console.error("google recaptcha",error,GOOGLE_RECAPTCHA_SITE_KEY);
              callback({
                message: error || "Lỗi khi tải google recaptcha",
                code: 400,
              });
            }
          );
      });
    } else {
      let url = config.get("server_url_report") + "/signup";
      data.group_id = group_id;
      data.id_app = _id_app;
      _this.post(url, null, data, (e, rs) => {
        if (e) return callback(e);
        callback(null, rs);
      });
    }
  }
  async asyncSignup(data) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.signup(data, (e, rs) => {
        if (e) {
          return reject(e);
        }
        resolve(rs);
      });
    });
  }
  async asyncResetPassword(email) {
    const config = this.config;
    const asyncGet = this.asyncGet;
    if (
      config.get("GOOGLE_RECAPTCHA_SITE_KEY") &&
      typeof grecaptcha !== "undefined"
    ) {
      return await new Promise((resolve, reject) => {
        grecaptcha.ready(function () {
          grecaptcha
            .execute(config.get("GOOGLE_RECAPTCHA_SITE_KEY"), {
              action: "resetPassword",
            })
            .then(
              async (_token_captcha) => {
                let url = `${config.get(
                  "server_url_report"
                )}/resetpassword?email=${email}&g-recaptcha-response=${_token_captcha}`;
                let rs = await asyncGet(url);
                resolve(rs);
              },
              function (error) {
                //console.error("google recaptcha",error,GOOGLE_RECAPTCHA_SITE_KEY);
                reject({
                  message: error || "Lỗi khi tải google recaptcha",
                  code: 400,
                });
              }
            );
        });
      });
    } else {
      let url = `${config.get(
        "server_url_report"
      )}/resetpassword?email=${email}`;
      let rs = await asyncGet(url);
      return rs;
    }
  }
  async asyncChangePasswordByAdmin(token, passwords) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/changepasswordByAdmin?access_token=${token}`;
    let rs = await this.asyncPost(
      url,
      null,
      passwords,
      "POST",
      "changePasswordByAdmin"
    );
    return rs;
  }

  async asyncChangePassword(token, passwords) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/changepassword?access_token=${token}`;
    let rs = await this.asyncPost(
      url,
      null,
      passwords,
      "POST",
      "changePassword"
    );
    return rs;
  }
  async asyncGetCustomerByEmail(access_token, email, fields, _id_app) {
    if (!_id_app) _id_app = this.config.get("id_app");
    let condition = { of_user: email };
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${_id_app}/customer?q=${JSON.stringify(
      condition
    )}&access_token=${access_token}`;
    if (fields) {
      url = url + "&fields=" + fields;
    }
    let rs = await this.asyncGet(url);
    rs = JSON.parse(rs);
    if (rs.length > 0) {
      return rs[0];
    } else {
      throw new Error(`Not found customer for user ${email}`);
    }
  }
  async asyncGetPaymentMethods(access_token, _id_app) {
    if (!_id_app) _id_app = this.config.get("id_app");
    let condition = { status: true, hinh_thuc: { $in: [1, 2, undefined] } };
    let url = `${this.config.get(
      "server_url_report"
    )}/api/${_id_app}/ptthanhtoan?access_token=${access_token}&q=${JSON.stringify(
      condition
    )}`;
    let rs = await this.asyncGet(url);
    return JSON.parse(rs).map((r) => {
      r.key = r._id;
      return r;
    });
  }
  async getWalletByAddress(address, access_token) {
    let condition = { address: address };
    let url = `${this.config.get(
      "server_url_report"
    )}/api/asskey?q=${JSON.stringify(condition)}&access_token=${access_token}`;
    let rs = JSON.parse(await this.asyncGet(url));
    if (rs.length === 1) return rs[0];
    return null;
  }
  // downloadFile(url, name, callback) {
  //   let trustkey = this.config.get("trustkey");
  //   if (trustkey) {
  //     if (url.indexOf("?") < 0) {
  //       url = url + "?trustkey=" + trustkey;
  //     } else {
  //       url = url + "&trustkey=" + trustkey;
  //     }
  //   }

  //   const req = new XMLHttpRequest();
  //   req.open("GET", url, true);
  //   req.responseType = "arraybuffer";
  //   req.onload = function () {
  //     const resp = req.response;
  //     if (resp) {
  //       if (req.status === 200) {
  //         const blob = new Blob([resp]);
  //         if (!name) name = "file";
  //         saveAs(blob, name);
  //         if (callback) callback();
  //       } else {
  //         if (callback) {
  //           let error = new TextDecoder("utf-8").decode(resp);
  //           if (error.indexOf("{") >= 0 && error.indexOf("}") >= 0) {
  //             try {
  //               error = JSON.parse(error);
  //             } catch (e) {}
  //           }
  //           callback(
  //             error || { error: "Không thể kết nối với máy chủ. Hãy thử lại." }
  //           );
  //         }
  //       }
  //     }
  //   };
  //   req.send(null);
  // }
  uploadFile(url, fileRaw, callback = () => {}, data = {}) {
    let trustkey = this.config.get("trustkey");
    if (trustkey) {
      if (url.indexOf("?") < 0) {
        url = url + "?trustkey=" + trustkey;
      } else {
        url = url + "&trustkey=" + trustkey;
      }
    }

    data.return = "JSON";
    data[data.name || "fileupload"] = fileRaw;
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    axios({
      method: "post",
      url: url,
      data: formData,

      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        let text =
          typeof response.data == "object"
            ? JSON.stringify(response.data)
            : response.data;
        callback(null, text, response);
      })
      .catch((e) => {
        let error = (e.response ? e.response.data : e) || e;
        //console.error("Error get data:",error);
        callback(error);
      });

    /*fetch(url, {method: "POST", body: formData}).then( response => {
      response.text().then((text)=>{
        if(response.ok) {
          callback(null,text);
        }else{
          try{
            if(typeof(text)!=="object"){
              if(text.indexOf("{")===0){
                text = JSON.parse(text)
              }else{
                text ={message:text,code:400}
              }
            }
          }catch(e){
            text ={message:text,code:400}
          }
          if(text.error && !text.message){
            text.message = text.error;
          }
          callback(text);
        }
      })
    })
    .catch(e=>callback(e))*/
  }
  // async asyncGetMenu(userInfo, group, id_app, log = () => {}, cache = true) {
  //   if (!id_app) id_app = this.config.get("id_app");
  //   let system_code = this.config.get("system_code");

  //   const menu = this.config.get("menu");
  //   let token;
  //   if (isObject(userInfo)) {
  //     token = userInfo.token;
  //   } else {
  //     token = userInfo;
  //   }
  //   if (!token) return [];
  //   let extra_funcs = [];
  //   //get menu on server
  //   if (system_code && !this.config.get("only_use_menu_local")) {
  //     log("Get module info:" + system_code);
  //     let condition = { app: system_code };
  //     let modules = await this.asyncGetList(token, "moduleinfo", {
  //       condition: condition,
  //       cache: cache,
  //       cache_local: cache,
  //     });
  //     modules = modules.filter((m) => {
  //       if (
  //         m.only_for_companies &&
  //         m.only_for_companies.length > 0 &&
  //         m.only_for_companies.indexOf(id_app) < 0
  //       ) {
  //         return false;
  //       }
  //       if (
  //         m.not_for_companies &&
  //         m.not_for_companies.length > 0 &&
  //         m.not_for_companies.indexOf(id_app) >= 0
  //       ) {
  //         return false;
  //       }
  //       return true;
  //     });
  //     extra_funcs = modules
  //       .map((m) => {
  //         return (m.items || []).map((item) => {
  //           delete item._id;
  //           item.group = m.title;
  //           item.group_code = item.active_require ? item.code : "";
  //           item.stt_module = m.stt;
  //           item.mother_module = m.mother_module;
  //           item.name_mother_module = m.name_mother_module;
  //           if (
  //             item.type &&
  //             !item.path &&
  //             !item.url &&
  //             item.type.toLowerCase() !== "other"
  //           ) {
  //             item.path = "/" + item.type.toLowerCase() + "/" + item.code;
  //           }
  //           return item;
  //         });
  //       })
  //       .reduce((a, b) => a.concat(b), []);
  //   }
  //   let _menu = cloneDeep(menu).filter((item) => {
  //     return !extra_funcs.find(
  //       (i) => i.code === item.code && i.group === item.group
  //     );
  //   });
  //   _menu.forEach((item) => {
  //     item.stt_module = item.stt_module || 9999;
  //     item.stt = item.stt || 0;
  //   });
  //   _menu = [...extra_funcs, ..._menu];
  //   _menu = _menu.sort((a, b) => a.stt_module - b.stt_module);
  //   //get api_code
  //   log("Get custom list apis");
  //   let listinfos = await this.asyncGetList(token, "listinfo", {
  //     cache: cache,
  //     cache_local: cache,
  //     condition: {
  //       create_model: true,
  //       api_code: { $nin: ["", null, undefined] },
  //     },
  //     fields: "code,api_code",
  //   });
  //   log("Get custom report apis");
  //   let reportInfos = await this.asyncGetList(token, "reportinfo", {
  //     cache: cache,
  //     cache_local: cache,
  //     condition: { api_code: { $nin: ["", null, undefined] } },
  //     fields: "code,api_code",
  //   });
  //   log("handle api code");
  //   _menu.forEach((item) => {
  //     let linfo = listinfos.find((l) => {
  //       return l.code === item.code;
  //     });
  //     if (!linfo) {
  //       linfo = reportInfos.find((l) => {
  //         return l.code === item.code;
  //       });
  //     }
  //     if (linfo) {
  //       item.api_code = linfo.api_code || item.code;
  //     } else {
  //       item.api_code = item.code;
  //     }
  //   });
  //   //
  //   if (!group) {
  //     if (!userInfo.email) {
  //       log("get user info");
  //       userInfo = await this.asyncGetUserInfoByToken(token);
  //     }
  //     log("get app info");
  //     const p = await this.asyncGetAppInfo(token, id_app, "name");
  //     if (!p) {
  //       console.error("company is not exists");
  //       return [];
  //     }
  //     if (p.appAdmin) {
  //       return (_menu || []).map((item) => {
  //         let _item = { ...item };
  //         _item.view = true;
  //         _item.viewOfOther = true;
  //         _item.add = true;
  //         _item.update = true;
  //         _item.delete = true;
  //         return _item;
  //       });
  //     } else {
  //       group = p.group_id;
  //     }
  //   }
  //   if (!group) return [];
  //   log("get rights");
  //   const rights = await this.asyncGetList(token, "right", {
  //     cache: cache,
  //     cache_local: cache,
  //     condition: { email: group },
  //     limit: 90000,
  //   });
  //   return (_menu || []).map((item) => {
  //     let _item = { ...item };
  //     let _right = rights.filter(
  //       (r) => r.module === _item.api_code.toLowerCase()
  //     );
  //     if (_right.length > 0) {
  //       if (_right.length > 1)
  //         console.log("error multi record", _item.api_code, _right);
  //       _item = { ..._item, ..._right[0] };
  //     } else {
  //       _item.view = false;
  //       _item.viewOfOther = false;
  //       _item.add = false;
  //       _item.update = false;
  //       _item.delete = false;
  //     }
  //     return _item;
  //   });
  // }
  async asyncUpdateRight(token, value) {
    let data = Object.assign({}, value);
    return this.asyncPostList(token, "right", data);
  }
  async asyncJoinApp(token, id_app, group_id) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/app/join/${id_app}/${group_id}?access_token=${token}`;
    return this.asyncGet(url);
  }
  /***
   * Backup data of a company
   */
  async asyncBackup(token, id_app, callback) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/app/backup/${id_app}?access_token=${token}`;
    this.downloadFile(url, "backup.zip", callback);
  }
  /***
   * restore data of a company
   */
  async asyncRestore(token, id_app, fileRaw, callback = () => {}, data = {}) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/app/restore/${id_app}?access_token=${token}`;
    data.return = "JSON";
    data["backup"] = fileRaw;
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    axios({
      method: "post",
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        let text =
          typeof response.data == "object"
            ? JSON.stringify(response.data)
            : response.data;
        callback(null, text, response);
      })
      .catch((e) => {
        let error = (e.response ? e.response.data : e) || e;
        //console.error("Error get data:",error);
        callback(error);
      });
    /*fetch(url, {method: "POST", body: formData}).then( response => {
      response.text().then((text)=>{
        if(response.ok) {
          callback(null,text);
        }else{
          try{
            if(typeof(text)!=="object"){
              if(text.indexOf("{")===0){
                text = JSON.parse(text)
              }else{
                text ={message:text,code:400}
              }
            }
          }catch(e){
            text ={message:text,code:400}
          }
          if(text.error && !text.message){
            text.message = text.error;
          }
          callback(text);
        }
      })
    })
    .catch(e=>callback(e))*/
  }
  /***
   * data require fields:_id,code,time_run,users_will_receive,title,repeat(option),finish_run(option)
   */
  async addNotifySchedule(token, data) {
    data.id_app = this.config.get("id_app");
    let url = `${this.config.get(
      "server_url_report"
    )}/api/schedule/add/notify?access_token=${token}`;
    return this.asyncPost(url, null, data, "POST", "POST", false);
  }
  async deleteNotifySchedule(token, id_link) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/schedule/delete/${id_link}?access_token=${token}`;
    return this.asyncGet(url);
  }
  /***
   * data require fields:time_run,data._id,data.id_app,data.module
   */
  async addSchedule(type, token, data) {
    data.id_app = this.config.get("id_app");
    let url = `${this.config.get(
      "server_url_report"
    )}/api/schedule/add/${type}?access_token=${token}`;
    return this.asyncPost(url, null, data, "POST", "POST", false);
  }
  async deleteSchedule(token, id_link) {
    let url = `${this.config.get(
      "server_url_report"
    )}/api/schedule/delete/${id_link}?access_token=${token}`;
    return this.asyncGet(url);
  }
}
