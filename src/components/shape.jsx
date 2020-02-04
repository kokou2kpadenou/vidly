import { Component } from "react";
import { toast } from "react-toastify";

class Shape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      pageSize: 6,
      currentPage: 1,
      selectedGenreId: "0",
      sortColumn: { path: "title", order: "asc" },
      searchField: "",
      deleteData: { deleteFnc: "", deleteItem: "" }
    };
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

  handleDelete = async movieID => {
    const originalMovies = { ...this.state.movies };
    const originalCurrentPage = { ...this.state.currentPage };
    this.setState(oldState => ({
      movies: oldState.movies.filter(movie => movie._id !== movieID),
      currentPage:
        this.getSettings().movies.length === 1 &&
        oldState.currentPage === this.getSettings().totalPages
          ? oldState.currentPage - 1
          : oldState.currentPage
    }));

    try {
      await this.state.deleteData.deleteFnc(movieID);
    } catch (error) {
      if (error.reponse && error.response.status === 404)
        toast.error(
          `this ${this.state.deleteData.deleteItem} has already been deleted.`
        );
      this.setState({
        movies: originalMovies,
        currentPage: originalCurrentPage
      });
    }
  };

  HandleSort = sortColumn => {
    this.setState({ sortColumn });
  };
}

export default Shape;
