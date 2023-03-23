import axios from "redaxios";

const instance = axios.create({
  baseURL: process.env.server_url,
  header: {
    "content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": true,
    Accept: "application/json",
  },
  withCredentials: true,
});

export default instance;
