export const getEarlierRoute = (location) => {
  const currRoute = location.pathname.substring(
    location.pathname.lastIndexOf("/"),
    location.pathname.length
  );

  return location.pathname.substring(
    0,
    location.pathname.length - currRoute.length
  );
};

export const decodeJWT = (token) => {
  if (token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    const claims = JSON.parse(window.atob(base64));

    const { exp } = claims;

    if (Date.now() > exp * 1000) {
      return null;
    }
    return claims;
  }
};
