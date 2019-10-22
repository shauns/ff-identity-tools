// @flow

export type CredentialAuth = { token: string, user: any, exchangeCode: string };

export type PermanentCredentialAuth = {
  token: string,
  user: any,
  exchangeCode: string,
  refreshToken: { id: string, deviceId: string },
};

export type Messages = {
  INVALID_EMAIL_ADDRESS: string,
  SIGN_UP_FAILED_BAD_INPUT_DATA: string,
  SIGN_UP_FAILED_USER_ALREADY_EXISTS_DIFFERENT_DETAILS: string,
  SIGN_UP_FAILED_PREFER_SOCIAL: string,
  SIGN_UP_FAILED_SERVICE_UNAVAILABLE: string,
  LOGIN_FAILED_BAD_INPUT_DATA: string,
  LOGIN_FAILED_BAD_PASSWORD: string,
  LOGIN_FAILED_PREFER_SOCIAL: string,
  LOGIN_FAILED_BAD_PASSWORD_FIELD: string,
  LOGIN_FAILED_SERVICE_UNAVAILABLE: string,
  FINISH_AUTH_CALLBACK_BLOCKED: string,
  FINISH_AUTH_CALLBACK_UNRESPONSIVE: string,
  FINISH_AUTH_CALLBACK_FAILED: string,
  FINISH_AUTH_CALLBACK_NO_LANDING_PAGE: string,
  FORGOT_PASSWORD_FAILED_SERVICE_UNAVAILABLE: string,
  FORGOT_PASSWORD_FAILED_BAD_INPUT: string,
};
