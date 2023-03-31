import { fetchAPI } from "../api";

export const postSubscriber = async (data) => {
  try {
    return await fetchAPI(
      "/subscribers",
      {},
      {
        method: "post",
        body: JSON.stringify({ data: data }),
      }
    );
  } catch (error) {
    return error;
  }
};
