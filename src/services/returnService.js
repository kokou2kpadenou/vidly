import http from "./httpService";

const returnsURL = "returns";

export function saveReturn(rental) {
  return http.post(returnsURL, rental);
}
