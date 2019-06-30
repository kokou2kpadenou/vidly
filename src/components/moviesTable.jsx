import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTables extends Component {
  columns = [
    {
      key: "title",
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { key: "genre", path: "genre.name", label: "Genre" },
    { key: "stock", path: "numberInStock", label: "Stock" },
    { key: "rate", path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      path: "",
      label: "",
      content: data => (
        <Like liked={data.liked} onClick={() => this.props.onLike(data._id)} />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    path: "",
    label: "",
    content: data => (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => this.props.onDelete(data._id)}
      >
        Detele
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTables;
