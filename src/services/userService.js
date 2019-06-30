import http from "./httpService";
import config from "../config.json";

const usersUrl = `${config.apiEndPoint}/users`;

export function register(user) {
  return http.post(usersUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
