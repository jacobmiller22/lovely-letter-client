import axios from "axios";
import keys from "../config/keys";

const auth = {
  Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
};

export default axios.create({
  baseURL: keys.ll_server,
  headers: { ...keys.additional_headers, auth },
});
