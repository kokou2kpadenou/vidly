import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import Movie from "./components/movie";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies()
    };
  }

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

    return (
      <div className="container">
        <p className="">{`Showing ${
          this.state.movies.length
        } movies in the database.`}</p>
        {this.state.movies.length > 0 && (
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
              {this.state.movies.map(movie => (
                <Movie
                  key={movie._id}
                  data={movie}
                  onClick={this.handleClickDelete}
                  onLike={this.HandleLike}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Movies;
