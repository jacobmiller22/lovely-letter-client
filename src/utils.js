import { noAuthRoutes } from "./constants";

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
  if (token && token !== "undefined") {
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

export const backRoute = (location) => {
  return location && location.prevRoute
    ? location.prevRoute
    : getEarlierRoute(location);
};

export const renderPlaceholder = () => {
  return (
    <div className='ui placeholder'>
      <div className='ui header'>
        <div className='large line'></div>
      </div>
      <div className='ui paragraph'>
        <div className='large line'></div>
        <div className='medium line'></div>
        <div className='large line'></div>
      </div>
    </div>
  );
};

export const routeRequiresAuth = (win) => {
  return !noAuthRoutes.includes(win.location.pathname);
};
