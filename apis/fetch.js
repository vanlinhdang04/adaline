import axios from "@/setup/axios";
// import qs from "qs";
// import queryString from "query-string";
// import fetch from "isomorphic-unfetch";

import { appendOptionsToURL, getIdApp, prepareURL } from "./helpers";

export async function clearCookie() {
  await fetch(
    `${process.env.server_url_report}/api/updateprofile?access_token=${process.env.public_token}`,
    {
      method: "post",
      credentials: "omit",
      headers: {
        "content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
      },
    }
  );

  // return _axios.post(
  //   `${process.env.server_url_report}/api/updateprofile?access_token=${process.env.public_token}`,
  //   {
  //     withCredentials: false,
  //     headers: {
  //       withCredentials: false,
  //       Accept: "application/json",

  //       Cache: "no-cache",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Cookie: `uid=""; AAAAAAAAAAAA=abc`,
  //       Authorization: `uid=""`,
  //     },
  //   }
  // );
  // return axios({
  //   method: "POST",
  //   url: `${process.env.server_url_report}/api/updateprofile?access_token=${process.env.public_token}`,
  //   headers: {
  //     Cookie: `uid=""`,
  //   },
  // });
}

export async function asyncGetList({
  access_token = process.env.public_token,
  collection_name,
  options = {},
  signal,
}) {
  if (!collection_name) return;

  const id_app = getIdApp(collection_name, options);
  let url = prepareURL(collection_name, id_app, access_token);
  let appendedURL = appendOptionsToURL(url, options);

  try {
    const res = await axios({
      method: "GET",
      url: appendedURL,
      signal,
    });

    return res.data;
  } catch (error) {
    const errorMessage = error?.message || error.error || error;
    if (errorMessage) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error?.response?.data);
      console.log(error?.response?.status);

      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error?.config);
    // throw new Error(error);
  }
}

export async function asyncPost({ url, data, method, options }) {
  try {
    const res = await axios({
      method: method.toLowerCase(),
      url,
      data,
    });

    if (res.ok || res.status === 200) {
      return res.data;
    }

    throw new Error({
      message: "Something went wrong",
    });
  } catch (error) {
    return error.data.error;
  }
}
// export async function asyncPost({ url, data, method, options }) {
//   return await fetch(url, {
//     method,
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// }

export async function asyncSearchList({
  access_token = process.env.public_token,
  collection_name,
  options,
}) {
  let url = `${process.env.server_url_report}/api/search/${process.env.id_app}/${collection_name}?access_token=${access_token}&trustkey=${process.env.trustkey}`;
  // if (options.query_string) url = `${url}&${options.query_string}`;
  // if (options.buildUrl) {
  //   url = options.buildUrl(url);
  // }
  // if (options.log) {
  //   options.log("fetch: " + url);
  // }
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
  // return await this.asyncPost(url, null, body, "POST", "GETLIST", false, {
  //   stringifyData: false,
  // });
  return await asyncPost({ url, data: body, method: "post" });
}

export async function asyncPostList({
  access_token = process.env.public_token,
  collection_name,
  data,
  options,
}) {
  if (!collection_name) return;

  const id_app = getIdApp(collection_name, options);
  let url = prepareURL(collection_name, id_app, access_token);

  let method = "POST";
  if (data?._id) {
    method = "PUT";
    url = `${url}/${data._id}`;
  }

  return await asyncPost({
    url,
    data,
    method,
    options,
  });
}

export async function asyncGet(url, signal) {
  const res = await axios({
    method: "GET",
    url,
    signal,
  });
  return res.data;
}

export async function asyncGetListShared({
  access_token = process.env.public_token,
  collection_name,
  options = {},
}) {
  if (!collection_name) return;
  // const id_app = getIdApp(collection_name, options);
  // let url = prepareURL(collection_name, id_app, access_token);

  let url = `${
    process.env.server_url_report
  }/api/${collection_name}/shared?page=${
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

  let rs = await asyncGet(url);
  return rs;

  // let appendedURL = appendOptionsToURL(url, options);
  // return await asyncGet(appendedURL);
}
export async function asyncGetItem({
  access_token = process.env.public_token,
  collection_name,
  options = {},
  signal,
}) {
  const data = await asyncGetList({
    access_token,
    collection_name,
    options,
    signal,
  });

  if (data?.length === 0) return {};

  if (data?.length > 1) {
    console.error(
      `Received more than 1 ${collection_name} where it should receive 1 only`
    );
  }

  return data?.[0];
}

export function processImageUrl(imageUrl) {
  if (imageUrl == null) return "";
  if (imageUrl?.indexOf("http") < 0) return imageUrl;
  return `/api/imageproxy?url=${encodeURIComponent(imageUrl)}`;
}

export async function asyncDeleteList({
  access_token,
  collection_name,
  _id,
  options,
  signal,
}) {
  const id_app = getIdApp(collection_name, options);
  let url = `${process.env.server_url_report}/api${
    id_app ? "/" + id_app : ""
  }/${collection_name}/${_id}`;
  url = `${url}?access_token=${access_token}`;

  //TODO: refractor into axios
  // return await deleteRequest(url);
  const res = await axios({
    method: "DELETE",
    url,
    signal,
  });

  return res.data;
}

// async function deleteRequest(
//   url,
//   headers,
//   callback,
//   options = { stringifyData: true }
// ) {
//   let trustkey = process.env.trustkey;
//   if (trustkey) {
//     if (url.indexOf("?") < 0) {
//       url = url + "?trustkey=" + trustkey;
//     } else {
//       url = url + "&trustkey=" + trustkey;
//     }
//   }

//   let _headers = {};
//   if (headers) {
//     if (Array.isArray(headers)) {
//       headers.forEach((h) => {
//         _headers[h.name] = h.value;
//       });
//     } else {
//       _headers = Object.assign(_headers, headers);
//     }
//   }

//   try {
//     const res = await fetch(url, { method: "DELETE" });
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     throw new Error(error);
//   }
// }

// ------

// https://gist.github.com/odewahn/5a5eeb23279eed6a80d7798fdb47fe91
// export function makeRequest(url, options = {}) {
//   return new Promise((resolve, reject) => {
//     fetch(url, options)
//       .then(handleResponse)
//       .then((response) => JSON.parse(response))
//       .then((json) => resolve(json))
//       .catch((error) => {
//         try {
//           reject(JSON.parse(error));
//         } catch (e) {
//           reject(error);
//         }
//       });
//   });
// }

// export function handleResponse(response) {
//   return response.json().then((json) => {
//     // Modify response to include status ok, success, and status text
//     let modifiedJson = {
//       success: response.ok,
//       status: response.status,
//       statusText: response.statusText ? response.statusText : json.error || "",
//       response: json,
//     };

//     // If request failed, reject and return modified json string as error
//     if (!modifiedJson.success)
//       return Promise.reject(JSON.stringify(modifiedJson));

//     // If successful, continue by returning modified json string
//     return JSON.stringify(modifiedJson);
//   });
// }

// // sample usage
// //    makeRequest(/oauth/token, options)
// //      .then((data) => console.log(data)) // do something great with data
// //      .catch(error => console.log(error)) // do something useful with error
