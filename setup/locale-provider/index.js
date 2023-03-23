import { asyncPost } from "@/apis/fetch";
// import { useFetchLabels } from "@/apis/labels";
import { isEmpty } from "@/utils/lodash";
// import compareVietnameseString from "@/utils/compareVietnameseString";
// import slugify from "@/utils/slugifyString";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/router";
import * as React from "react";

const LocaleContext = React.createContext();

export const useLocalContext = () => {
  const context = React.useContext(LocaleContext);
  return context;
};

// function localeReducer(state, { type, payload }) {
//   switch (type) {
//     case "SET_LABELS": {
//       return { ...state, labels: payload };
//     }

//     case "UPDATE_LABEL": {
//       return { ...state, labels: [...state.labels, payload] };
//     }

//     default: {
//       throw new Error(`Unhandled action type: ${type}`);
//     }
//   }
// }

function LocaleProvider({ children }) {
  // const queryClient = useQueryClient();
  // const [state, dispatch] = React.useReducer(localeReducer, { labels: {} });
  // const { mutate, isLoading, isError, isSuccess } = useMutation(createLabel, {
  //   retry: 0,
  //   onMutate: (variables) => {
  //     return {
  //       variables,
  //     };
  //   },
  //   onSuccess: (data, variables, context) => {
  //     queryClient.setQueriesData(["labels"], (old) => [...old, variables]);
  //   },
  // });
  const server_url_report = process.env.server_url_report;
  const public_token = process.env.public_token;
  const trustkey = process.env.trustkey;
  // const app_code = process.env.app_code;

  // const { locale } = useRouter();
  // const { data: fetchedLabels } = useFetchLabels();
  const fetchedLabels = [];

  async function createLabel(postData) {
    // console.log("postData 1");
    let url = `${server_url_report}/api/labelinfo?access_token=${public_token}&trustkey=${trustkey}`;

    return asyncPost({
      url,
      data: postData,
      method: "POST",
    });
  }

  const retrieveLocaleItem = (textid) => {
    return fetchedLabels.find((el) => el.textid === textid);
  };

  // console.log("isLoading", isLoading);
  // console.log("isError", isError);
  // console.log("isSuccess", isSuccess);

  const getLabel = (_label, defaultVi = "", defaultEn = "", lang = "vi") => {
    if (!fetchedLabels || isEmpty(fetchedLabels) || !_label) return _label;
    // console.log("1", 1);
    const label = _label.normalize("NFD");
    return label;
    // const textid = label.toUpperCase();

    // const labelObj = retrieveLocaleItem(textid);

    // if (isLoading || isError) return label;
    // // console.log("2", 2);

    // if (!labelObj) {
    //   // console.log("3", 3);
    //   const postData = {
    //     labelid: app_code,
    //     textid,
    //     texte: defaultEn || defaultVi || label,
    //     textv: defaultVi || defaultEn || label,
    //   };

    //   // create in the server
    //   mutate(postData);
    //   return label;
    // }
    // if (locale === "en") {
    //   // console.log("4", 4);
    //   return labelObj?.texte;
    // }
    // // console.log("5", 5);
    // return labelObj?.textv;
  };

  const value = {
    // state,
    // dispatch,
    getLabel,
  };
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export { LocaleProvider };
