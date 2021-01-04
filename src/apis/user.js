import axios from "axios";
import keys from "../config/keys";

export default axios.create({
  baseURL: keys.ll_server,
  headers: keys.additional_headers,
});
