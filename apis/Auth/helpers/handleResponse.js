const handleResponse = async (response, callbackOnSuccess, callbackOnError) => {
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
    // onError(
    //   data?.message || data?.error || textString || "Thao tác không thành công"
    // );

    if (callbackOnError && typeof callbackOnError === "function") {
      callbackOnError();
    }
  }

  return data;
};

export default handleResponse;
