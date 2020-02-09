import React from "react";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { getMovies, deleteMovie } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import MoviesTable from "./moviesTable";
import Layout from "../layout";
import Shape from "../shape";

class Movies extends Shape {
  async componentDidMount() {
    this.setState({
      deleteData: { deleteFnc: deleteMovie, deleteItem: "movie" },
      searchFieldName: "title"
    });

    let { data: genres } = await trackPromise(getGenres(), "movies");
    const { data: elements } = await trackPromise(getMovies(), "movies");

    genres = [{ name: "All Genres", _id: "0" }, ...genres];
    this.setState({ elements, genres });
  }

  render() {
    const data = {
      ...this.getSettings(),
      item: "movie",
      buttons: this.props.user && (
        <Link className="btn btn-primary mb-3" to="/movies/new">
          New Movie
        </Link>
      )
    };

    return (
      <Layout data={data} area="movies">
        <MoviesTable
          movies={this.getSettings().elements}
          sortColumn={this.state.sortColumn}
          onDelete={this.handleDelete}
          onLike={this.HandleLike}
          onSort={this.HandleSort}
        />
      </Layout>
    );
  }
}

export default Movies;
