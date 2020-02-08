import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import ListGroup from "./common/listGroup";
import { paginate, getDescendantProp } from "../utils/utils";

class Shape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      genres: [],
      pageSize: 6,
      currentPage: 1,
      selectedGenreId: "0",
      sortColumn: { path: "title", order: "asc" },
      searchField: "",
      deleteData: { deleteFnc: "", deleteItem: "" },
      searchFieldName: ""
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

  HandleLike = elementID => {
    this.setState(oldState => ({
      elements: oldState.elements.map(elt => {
        if (elt._id === elementID) {
          elt.liked = !elt.liked;
        }
        return elt;
      })
    }));
  };

  handleDelete = async elementID => {
    const originalelements = { ...this.state.elements };
    const originalCurrentPage = { ...this.state.currentPage };
    this.setState(oldState => ({
      elements: oldState.elements.filter(element => element._id !== elementID),
      currentPage:
        this.getSettings().elements.length === 1 &&
        oldState.currentPage === this.getSettings().totalPages
          ? oldState.currentPage - 1
          : oldState.currentPage
    }));

    try {
      await this.state.deleteData.deleteFnc(elementID);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error(
          `this ${this.state.deleteData.deleteItem} has already been deleted.`
        );
      this.setState({
        elements: originalelements,
        currentPage: originalCurrentPage
      });
    }
  };

  handleReturn = async rental => {
    const originalelements = { ...this.state.elements };

    this.setState(oldState => ({
      elements: oldState.elements.map(element =>
        element.customer._id === rental.customerId &&
        element.movie._id === rental.movieId
          ? { ...element, dateReturned: new Date() }
          : element
      )
    }));

    try {
      await this.state.deleteData.deleteFnc(rental);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error(`Rental not found.`);
      if (error.response && error.response.status === 400)
        toast.error(`Rental already processed.`);
      this.setState({
        elements: originalelements
      });
    }
  };

  HandleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSettings = () => {
    let filtered;

    switch (this.state.selectedGenreId) {
      case "":
        filtered = this.state.elements.filter(element =>
          new RegExp("^" + this.state.searchField.toLowerCase(), "i").test(
            getDescendantProp(element, this.state.searchFieldName).toLowerCase()
          )
        );
        break;
      case "0":
        filtered = this.state.elements;
        break;
      case "1":
        filtered = this.state.elements.filter(
          element => element.isGold === true
        );
        break;
      case "2":
        filtered = this.state.elements.filter(
          element => element.isGold === false
        );
        break;
      case "3":
        filtered = this.state.elements.filter(element => !element.dateReturned);
        break;
      case "4":
        filtered = this.state.elements.filter(element => element.dateReturned);
        break;

      default:
        filtered = this.state.elements.filter(
          element => element.genre._id === this.state.selectedGenreId
        );
        break;
    }

    const sorted = _.orderBy(
      filtered,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    );

    const elements = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );

    const totalPages = Math.ceil(filtered.length / this.state.pageSize);

    return {
      item: "",
      groups: (
        <ListGroup
          items={this.state.genres}
          selectedItem={this.state.selectedGenreId}
          onItemSelect={this.handleGenreSelect}
        />
      ),
      count: filtered.length,
      group: {
        genreId: this.state.selectedGenreId,
        genres: this.state.genres
      },
      searchField: {
        value: this.state.searchField,
        onChange: this.handleSearch
      },
      totalPages: totalPages,
      currentPage: this.state.currentPage,
      onPageChange: this.HandlePageChange,
      buttons: "",
      elements
    };
  };
}

export default Shape;
