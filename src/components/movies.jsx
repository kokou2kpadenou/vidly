import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import StatusMessage from "./common/statusMessage";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenreId: "0",
      sortColumn: { path: "title", order: "asc" }
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "0" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenreSelect = genreId => {
    this.setState({ selectedGenreId: genreId, currentPage: 1 });
  };

  HandlePageChange = page => {
    this.setState({ currentPage: page });
  };

  HandleLike = movieID => {
    this.setState(oldState => ({
      movies: oldState.movies.map(elt => {
        if (elt._id === movieID) {
          elt.liked = !elt.liked;
        }
        return elt;
      })
    }));
  };

  handleClickDelete = movieID => {
    this.setState(oldState => ({
      movies: oldState.movies.filter(movie => movie._id !== movieID)
    }));
  };

  HandleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSettings = () => {
    const filtered =
      this.state.selectedGenreId === "0"
        ? this.state.movies
        : this.state.movies.filter(
            movie => movie.genre._id === this.state.selectedGenreId
          );

    const sorted = _.orderBy(
      filtered,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    );

    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    return { actualMovieCount: filtered.length, movies };
  };

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenreId}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <StatusMessage
            count={this.getSettings().actualMovieCount}
            group={this.state.selectedGenreId}
          >
            <MoviesTable
              movies={this.getSettings().movies}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleClickDelete}
              onLike={this.HandleLike}
              onSort={this.HandleSort}
            />

            <Pagination
              itemsCount={this.getSettings().actualMovieCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.HandlePageChange}
            />
          </StatusMessage>
        </div>
      </div>
    );
  }
}

export default Movies;
