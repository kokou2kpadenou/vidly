import http from "./httpService";

const rentalsURL = "rentals";

function rentalURL(rentalId) {
  return `${rentalsURL}/${rentalId}`;
}

export function getRentals() {
  return http.get(rentalsURL);
}

export function getRental(rentalId) {
  return http.get(rentalURL(rentalId));
}

export function saveRental(rental) {
  return http.post(rentalsURL, rental);
}
