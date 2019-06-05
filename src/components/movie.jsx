import React from "react";
import Like from "./common/like";

const Movie = ({ data, onClick, onLike }) => {
  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.genre.name}</td>
      <td>{data.numberInStock}</td>
      <td>{data.dailyRentalRate}</td>
      <td>
        <Like liked={data.liked} onClick={() => onLike(data._id)} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onClick(data._id)}
        >
          Detele
        </button>
      </td>
    </tr>
  );
};

export default Movie;
