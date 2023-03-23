import handleResponse from "./handleResponse";

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

    const data = await handleResponse(res, callbackOnSuccess, callbackOnError);

    return data;
  } catch (error) {
    const msg = error?.message || error?.error || error;
    onError(msg);
  }
};

export default fetcher;
