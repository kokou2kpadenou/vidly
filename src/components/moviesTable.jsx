import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTables extends Component {
  columns = [
    { key: "title", path: "title", label: "Title" },
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
    },
    {
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
    }
  ];

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
