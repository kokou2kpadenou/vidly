import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const authUrl = `${config.apiEndPoint}/auth`;
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(authUrl, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  getCurrentUser,
  login,
  loginWithJwt,
  logout
};
