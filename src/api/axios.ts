import axios from "axios";
import Qs from "qs";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.paramsSerializer = (params) => {
  return Qs.stringify(params, { arrayFormat: "repeat" });
};

export const client = axios;;