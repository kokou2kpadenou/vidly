import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import StatusMessage from "./statusMessage";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenreId: "0",
      sortColumn: { path: "title", order: "asc" },
      searchField: ""
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "0" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleSearch = query => {
    this.setState({
      searchField: query,
      selectedGenreId: query === "" ? "0" : "",
      currentPage: 1
    });
  };

  handleGenreSelect = genreId => {
    this.setState({
      selectedGenreId: genreId,
      currentPage: 1,
      searchField: ""
    });
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

  handleDelete = movieID => {
    this.setState(oldState => ({
      movies: oldState.movies.filter(movie => movie._id !== movieID),
      currentPage:
        this.getSettings().movies.length === 1 &&
        oldState.currentPage === this.getSettings().totalPages
          ? oldState.currentPage - 1
          : oldState.currentPage
    }));
  };

  HandleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSettings = () => {
    const filtered =
      this.state.selectedGenreId === ""
        ? this.state.movies.filter(movie =>
            new RegExp("^" + this.state.searchField.toLowerCase(), "i").test(
              movie.title.toLowerCase()
            )
          )
        : this.state.selectedGenreId === "0"
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

    const totalPages = Math.ceil(filtered.length / this.state.pageSize);

    return {
      actualMovieCount: filtered.length,
      totalPages,
      movies
    };
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
          <Link className="btn btn-primary mb-3" to="/movies/new">
            New Movie
          </Link>
          <StatusMessage
            count={this.getSettings().actualMovieCount}
            group={{
              genreId: this.state.selectedGenreId,
              genres: this.state.genres
            }}
            searchField={{
              value: this.state.searchField,
              onChange: this.handleSearch
            }}
          >
            <MoviesTable
              movies={this.getSettings().movies}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.HandleLike}
              onSort={this.HandleSort}
            />

            <Pagination
              totalPages={this.getSettings().totalPages}
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
