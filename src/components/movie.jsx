import React from "react";
import Like from "./common/like";

const Movie = ({ movie, onClick, onLike }) => {
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <Like liked={movie.liked} onClick={() => onLike(movie._id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onClick(movie._id)}
        >
          Detele
        </button>
      </td>
    </tr>
  );
};

export default Movie;
