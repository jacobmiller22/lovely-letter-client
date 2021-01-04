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
