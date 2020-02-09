import React from "react";
import { trackPromise } from "react-promise-tracker";
import { getMovies } from "../../../services/movieService";
import MoviesTable from "./searchMoviesTable";
import Layout from "../../layout";
import Shape from "../../shape";

class Movies extends Shape {
  async componentDidMount() {
    this.setState({
      pageSize: 4,
      searchFieldName: "title"
    });

    const { data: elements } = await trackPromise(getMovies(), "search-movie");

    const genres = [{ name: "All Genres", _id: "0" }];
    this.setState({ elements, genres });
  }

  render() {
    const data = {
      ...this.getSettings(),
      item: "movie",
      groups: null
    };

    return (
      <Layout data={data} area="search-movie">
        <MoviesTable
          movies={this.getSettings().elements}
          sortColumn={this.state.sortColumn}
          onSort={this.HandleSort}
          selectMovie={this.props.selectMovie}
        />
      </Layout>
    );
  }
}

export default Movies;
