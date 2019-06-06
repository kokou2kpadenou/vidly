import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import Pagination from "./components/common/pagination";
import ListGroup from "./components/common/listGroup";
import { paginate } from "./utils/paginate";
import MoviesTable from "./components/moviesTable";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenreId: "0"
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

  render() {
    if (this.state.movies.length === 0)
      return (
        <div className="container">
          <p>There are no movies in the database.</p>
        </div>
      );

    const filtered =
      this.state.selectedGenreId === "0"
        ? this.state.movies
        : this.state.movies.filter(
            movie => movie.genre._id === this.state.selectedGenreId
          );

    const movies = paginate(
      filtered,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenreId}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p className="">{`Showing ${
              filtered.length
            } movies in the database.`}</p>

            <MoviesTable
              movies={movies}
              onClick={this.handleClickDelete}
              onLike={this.HandleLike}
            />

            <Pagination
              itemsCount={filtered.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.HandlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
