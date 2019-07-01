import http from "./httpService";

const moviesURL = "movies";

function movieURL(movieId) {
  return `${moviesURL}/${movieId}`;
}

export function getMovies() {
  return http.get(moviesURL);
}

export function deleteMovie(movieId) {
  return http.delete(movieURL(movieId));
}

export function getMovie(movieId) {
  return http.get(movieURL(movieId));
}

export function saveMovie(movie) {
  // put if exist
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieURL(movie._id), body);
  }
  // push if not exist
  return http.post(moviesURL, movie);
}
