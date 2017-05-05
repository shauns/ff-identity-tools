// @flow
import "whatwg-fetch";
import { SubmissionError } from "redux-form";
import * as messages from "./messages";

export default (async function performLogin(
  identityApi: string,
  usernameOrEmail: string,
  password: string
): Promise<{ token: string, user: any }> {
  let res;
  try {
    res = await fetch(`${identityApi}/login-with-credentials`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        usernameOrEmail,
        password,
      }),
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
    // TODO Can also fail from bad input data
    throw new SubmissionError({
      _error: messages.LOGIN_FAILED_BAD_INPUT_DATA,
    });
  }

  const { token, user }: { token: string, user: any } = await res.json();
  console.log({ token, user });
  return { token, user };
});
