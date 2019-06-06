import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import Movie from "./components/movie";
import Pagination from "./components/common/pagination";
import { paginate } from "./utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1
    };
  }

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

    const movies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="container">
        <p className="">{`Showing ${
          this.state.movies.length
        } movies in the database.`}</p>
        {this.state.movies.length > 0 && (
          <>
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
                    data={movie}
                    onClick={this.handleClickDelete}
                    onLike={this.HandleLike}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={this.state.movies.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.HandlePageChange}
            />
          </>
        )}
      </div>
    );
  }
}

export default Movies;
