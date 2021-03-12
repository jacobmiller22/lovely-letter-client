import axios from "axios";
import keys from "../config/keys";

const user = axios.create({
  baseURL: keys.ll_server,
  headers: { ...keys.additional_headers },
});

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
    },
  };
};

export const sendUserResetLink = (params) => {
  const { username_email } = params;

  return user.put("/auth", {}, { params: { username_email } });
};

export const resetUser = (params) => {
  const { tok, new_password } = params;

  return user.patch("/auth", {}, { params: { tok, new_password } });
};

export const loginUser = (params) => {
  return user.get("/auth", { params });
};

export const registerUser = (body) => {
  const { username, email, password } = body;
  return user.post("/auth", { username, email, password }, {});
};
