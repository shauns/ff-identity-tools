// @flow

export type CredentialAuth = { token: string, user: any };

export type PermanentCredentialAuth = {
  token: string,
  user: any,
  refreshToken: { id: string, deviceId: string },
};
