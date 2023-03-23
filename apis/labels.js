import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { asyncGet, asyncGetItem, asyncGetList } from "./fetch";

export async function fetchLabels() {
  const server_url_report = process.env.server_url_report;
  const public_token = process.env.public_token;
  const app_code = process.env.app_code;
  const fetchCondition = {
    labelid: app_code,
  };

  const url = `${server_url_report}/api/labelinfo?access_token=${public_token}&q=${JSON.stringify(
    fetchCondition
  )}&trustkey=${process.env.trustkey}`;
  return await asyncGet(url);
}

export const useFetchLabels = () => {
  // const queryClient = useQueryClient();
  return useQuery(["labels"], fetchLabels, {
    // staleTime: DEFAULT_STALE_TIME,
    // onSuccess: (labels) => {
    //   labels.map((labelObj) => {
    //     queryClient.setQueriesData(["labels", labelObj.textId], labelObj);
    //   });
    // },
  });
};

/* -------------------------------------------------------------------------- */

export async function fetchLabel(label) {
  const textid = label.toUpperCase();
  const server_url_report = process.env.server_url_report;
  const public_token = process.env.public_token;
  const app_code = process.env.app_code;
  const fetchCondition = {
    labelid: app_code,
    textid,
  };

  const url = `${server_url_report}/api/labelinfo?access_token=${public_token}&q=${JSON.stringify(
    fetchCondition
  )}`;
  const data = await asyncGet(url);
  return data?.[0];
}

export const useLabel = (label) => {
  const { locale } = useRouter();
  const textId = label?.toUpperCase();
  const { data } = useQuery(["labels", textId], () => fetchLabel(textId), {
    // staleTime: DEFAULT_STALE_TIME,
    enabled: !!textId,
  });

  if (locale === "en") {
    return data?.texte;
  }
  return data?.textv;
};
