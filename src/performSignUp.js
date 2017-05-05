// @flow
import "whatwg-fetch";
import { SubmissionError } from "redux-form";
import * as messages from "./messages";

export default (async function performSignUp(
  identityApi: string,
  username: string,
  email: string,
  password: string,
  communityId: ?string
): Promise<{ token: string, user: any }> {
  // TODO build community ID
  // If one was provided, we should send it along

  // TODO build metadata
  const metadata = {};

  // TODO Do the sign-up call
  let res;

  const signUpBody: any = {
    username,
    email,
    password,
    metadata,
  };
  if (communityId) {
    signUpBody["communityId"] = communityId;
  }

  try {
    res = await fetch(`${identityApi}/sign-up-with-credentials`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(signUpBody),
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    // Unable to reach the platform
    throw new SubmissionError({
      _error: messages.SIGN_UP_FAILED_SERVICE_UNAVAILABLE,
    });
  }

  // TODO handle error cases
  if (!res.ok) {
    if (res.status === 403 || res.status === 401) {
      // The user signed-up, but already exists *with different details*
      const { detail } = await res.json();
      if (detail === "Username exists") {
        throw new SubmissionError({
          username: messages.SIGN_UP_FAILED_USERNAME_EXISTS_FIELD,
          _error: messages.SIGN_UP_FAILED_USERNAME_EXISTS,
        });
      } else {
        throw new SubmissionError({
          _error: messages.SIGN_UP_FAILED_USER_ALREADY_EXISTS_DIFFERENT_DETAILS,
        });
      }
    }
    if (res.status === 409) {
      // The user should prefer social media
      throw new SubmissionError({
        _error: messages.SIGN_UP_FAILED_PREFER_SOCIAL,
      });
    }
    // TODO can also fail from bad input data
    throw new SubmissionError({
      _error: messages.SIGN_UP_FAILED_BAD_INPUT_DATA,
    });
  }

  // return token and user
  const { token, user } = await res.json();
  console.log({ token, user });
  return { token, user };
});
