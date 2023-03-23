import { useApiContext } from "@/setup/flexbiz-api-provider";

export default function useUserInfo() {
  const { userInfo } = useApiContext();
  let isLogin = undefined;
  if (userInfo && userInfo.token) {
    isLogin = true;
  } else {
    isLogin = false;
  }

  return {
    isLogin,
    userInfo,
  };
}
