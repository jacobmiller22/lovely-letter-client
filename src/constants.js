export const initLoginCreds = {
  username: "",
  password: "",
};

export const initResetCreds = {
  username_email: "",
  new_password: "",
  new_password_2: "",
};

export const initRegisterCreds = {
  username: "",
  email: "",
  password: "",
  password_2: "",
};

export const noAuthRoutes = [
  "^/$",
  "^/auth/reset/?$",
  "^/auth/register/?$",
  "^/auth/reset/.*/?$",
];

export const resetTokExp = "20 mins";
