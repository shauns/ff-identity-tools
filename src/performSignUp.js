// @flow
import type { CredentialAuth, Messages } from "./types";
import signUp from "./signUp";

/**
 * DEPRECATED: Prefer `signUp` instead.
 *
 * Signs a user up using credential based authentication
 *
 */
export default (async function performSignUp(
  identityApi: string,
  email: string,
  password: string,
  communityId: ?string,
  messages: Messages,
  passedAgeConfirmation: ?boolean
): Promise<CredentialAuth> {
  return signUp(
    identityApi,
    email,
    password,
    communityId,
    null,
    messages,
    passedAgeConfirmation
  );
});
