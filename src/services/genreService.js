import http from "./httpService";
import config from "../config.json";

const genresUrl = `${config.apiEndPoint}/genres`;

export function getGenres() {
  return http.get(genresUrl);
}
