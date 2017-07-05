// @flow
import "whatwg-fetch";
import { SubmissionError } from "redux-form";
import * as messages from "./messages";
import type { PermanentCredentialAuth, CredentialAuth } from "./types";

async function signUp(
  identityApi: string,
  email: string,
  password: string,
  communityId: ?string,
  deviceId: ?string
) {
  // TODO build metadata
  const metadata = {};

  let url = `${identityApi}/sign-up-with-credentials`;
  let body: any = {
    email,
    password,
    metadata,
  };
  if (communityId) {
    body["communityId"] = communityId;
  }
  if (deviceId) {
    url = `${identityApi}/sign-up-permanent-with-credentials`;
    body["deviceId"] = deviceId;
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
      _error: messages.SIGN_UP_FAILED_SERVICE_UNAVAILABLE,
    });
  }

  // handle error cases
  if (!res.ok) {
    if (res.status === 403 || res.status === 401) {
      // The user signed-up, but already exists *with different details*
      throw new SubmissionError({
        _error: messages.SIGN_UP_FAILED_USER_ALREADY_EXISTS_DIFFERENT_DETAILS,
      });
    }
    if (res.status === 409) {
      // The user should prefer social media
      throw new SubmissionError({
        _error: messages.SIGN_UP_FAILED_PREFER_SOCIAL,
      });
    }
    // can also fail from bad input data
    throw new SubmissionError({
      _error: messages.SIGN_UP_FAILED_BAD_INPUT_DATA,
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

export default signUp;
