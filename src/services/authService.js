import http from "./httpService";
import config from "../config.json";

const authUrl = `${config.apiEndPoint}/auth`;

export function login(email, password) {
  return http.post(authUrl, { email, password });
}
