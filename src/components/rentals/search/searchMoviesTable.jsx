import React, { Component } from "react";
import Table from "../../common/table";

class MoviesTables extends Component {
  columns = [
    {
      key: "title",
      path: "title",
      label: "Title"
    },
    { key: "genre", path: "genre.name", label: "Genre" },
    { key: "stock", path: "numberInStock", label: "Stock" },
    {
      key: "select",
      path: "",
      label: "",
      content: movie => (
        <>
          {movie.numberInStock > 0 && (
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => {
                this.props.selectMovie(movie);
              }}
            >
              select
            </button>
          )}
        </>
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
