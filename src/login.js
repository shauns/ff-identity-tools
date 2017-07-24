// @flow
import "whatwg-fetch";
import { SubmissionError } from "redux-form";
import type {
  PermanentCredentialAuth,
  CredentialAuth,
  Messages,
} from "./types";

async function login(
  identityApi: string,
  usernameOrEmail: string,
  password: string,
  deviceId: ?string,
  messages: Messages
) {
  let url = `${identityApi}/login-with-credentials`;
  let body = {
    usernameOrEmail,
    password,
  };
  if (deviceId) {
    url = `${identityApi}/login-permanent-with-credentials`;
    body = {
      usernameOrEmail,
      password,
      deviceId,
    };
  }
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    // Unable to reach the platform
    throw new SubmissionError({
      _error: messages.LOGIN_FAILED_SERVICE_UNAVAILABLE,
    });
  }

  if (!res.ok) {
    // Log-in failed
    if (res.status === 403 || res.status === 401) {
      // The user enter an incorrect password.
      throw new SubmissionError({
        password: messages.LOGIN_FAILED_BAD_PASSWORD_FIELD,
        _error: messages.LOGIN_FAILED_BAD_PASSWORD,
      });
    }
    if (res.status === 409) {
      // The user should prefer social media
      throw new SubmissionError({
        _error: messages.LOGIN_FAILED_PREFER_SOCIAL,
      });
    }
    // Can also fail from bad input data
    throw new SubmissionError({
      _error: messages.LOGIN_FAILED_BAD_INPUT_DATA,
    });
  }
  if (deviceId) {
    const body: PermanentCredentialAuth = await res.json();
    return body;
  } else {
    const body: CredentialAuth = await res.json();
    return body;
  }
}

export default login;
