import { asyncPostList } from "../fetch";

// submitting contact
export const postSubscribe = async (inputValues) => {
  try {
    return await asyncPostList({
      collection_name: "ecomsubscribed",
      data: inputValues,
    });
  } catch (error) {
    console.log("Error postContact", error);
    return error;
  }
};
