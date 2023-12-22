import { getLoginToken } from "./API";
import { setCookie } from "./CookieManager";

export async function loginUser(loginPromise) {
  const tokenPromise = await getLoginToken(loginPromise.id);
  setCookie("token", tokenPromise.token, tokenPromise.expire);
  setCookie("userID", loginPromise.id, tokenPromise.expire);
  setCookie("tokenExpiry", tokenPromise.expire, tokenPromise.expire);
}

export function getErrorMessage(erroredLoginPromise) {
  switch(erroredLoginPromise.status) {
    case 500:
      return "Email or password incorrect";
    default:
      return "Unknown server error, please try again later";
  }
}