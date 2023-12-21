//W3SCHOOLS.COM
export function setCookie(cookieName, cookieValue, expiryDate) {
  document.cookie = `${cookieName}=${cookieValue}; expires="${expiryDate}; path=/`;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}