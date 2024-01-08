import { getLoginToken, validateLogin } from "./API";
import { setCookie } from "./CookieManager";

export async function loginUser(loginPromise) {
  const tokenPromise = await getLoginToken(loginPromise.id);
  setCookie("username", loginPromise.username, tokenPromise.expire);
  setCookie("token", tokenPromise.token, tokenPromise.expire);
  setCookie("userID", loginPromise.id, tokenPromise.expire);
  setCookie("tokenExpiry", tokenPromise.expire, tokenPromise.expire);
}

export async function loginAfterRegister(email, password) {
  const validateLoginPromise = await validateLogin(email, password);
  await loginUser(validateLoginPromise);
}

export function getErrorMessage(erroredLoginPromise) {
  switch (erroredLoginPromise.status) {
    case 500:
      return "Email or password incorrect";
    default:
      return "Server error, please try again later";
  }
}
