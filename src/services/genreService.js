import http from "./httpService";

const genresUrl = "/genres";

export function getGenres() {
  return http.get(genresUrl);
}
