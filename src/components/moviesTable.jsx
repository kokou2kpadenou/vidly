import React from "react";
import Movie from "./movie";

const MoviesTable = ({ movies, onClick, onLike }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <Movie
            key={movie._id}
            movie={movie}
            onClick={onClick}
            onLike={onLike}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
