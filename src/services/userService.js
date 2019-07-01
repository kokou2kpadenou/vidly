import http from "./httpService";

const usersUrl = "/users";

export function register(user) {
  return http.post(usersUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
