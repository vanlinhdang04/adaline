import { asyncPostList } from "../fetch";

// submitting contact
export const postContact = async (inputValues) => {
  try {
    // console.log(inputValues);
    return await asyncPostList({
      collection_name: "asssubscribe",
      data: inputValues,
    });
  } catch (error) {
    console.log("Error postContact", error);
    return error;
  }
};
