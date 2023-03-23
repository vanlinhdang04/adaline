import { useQuery } from "@tanstack/react-query";
import { asyncGet } from "../fetch";

const DEFAULT_STALE_TIME = 60000; // 1min

export const fetchAppInfo = async () => {
  const url = `${process.env.server_url_report}/api/app/${process.env.id_app}?access_token=${process.env.public_token}&notfields=dieu_khoan_su_dung,chinh_sach_dau_tu`;
  return await asyncGet(url);
};

export const useFetchAppInfo = ({ options = {} }) => {
  return useQuery(["appInfo"], () => fetchAppInfo({ options }), {
    staleTime: DEFAULT_STALE_TIME,
  });
};
