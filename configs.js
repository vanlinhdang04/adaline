export const isDevelopment = process.env.NODE_ENV === "development";

export const MOCK_USER_SIGNUP =
  isDevelopment && process.env.ENABLE_MOCK_USER_SIGNUP;
