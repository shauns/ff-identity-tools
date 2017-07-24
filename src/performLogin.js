// @flow
import type { CredentialAuth, Messages } from "./types";
import login from "./login";

/**
 * DEPRECATED: Prefer `login` instead.
 *
 * Logs a user in using credential based authentication
 *
 */
export default (async function performLogin(
  identityApi: string,
  usernameOrEmail: string,
  password: string,
  messages: Messages
): Promise<CredentialAuth> {
  return login(identityApi, usernameOrEmail, password, null, messages);
});
