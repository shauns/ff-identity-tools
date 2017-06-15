// @flow
import "whatwg-fetch";
import { SubmissionError } from "redux-form";
import * as messages from "./messages";

export default async function startForgotPassword(
  identityApi: string,
  email: string
) {
  const url = `${identityApi}/start-forgot-password-flow`;
  const body = {
    email,
  };

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
      _error: messages.FORGOT_PASSWORD_FAILED_SERVICE_UNAVAILABLE,
    });
  }

  if (!res.ok) {
    // Starting the reset process failed.
    // There's no docs on HTTP error codes for this call.
    throw new SubmissionError({
      _error: messages.FORGOT_PASSWORD_FAILED_BAD_INPUT,
    });
  }

  return true;
}
