import React, { Component } from "react";
import Customers from "./search/searchCustomers";
import Movies from "./search/searchMovies";
import SimpleInput from "../../components/common/simpleInput";
import SelectDialog from "../../components/common/selectDialog";
import ButtonCancel from "../common/buttonCancel";
import { saveRental, getRental } from "../../services/rentalService";
import { saveReturn } from "../../services/returnService";
import { dateFormating, feeUpToday } from "../../utils/utils";

class RentalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rental: {
        customer: { _id: "Choose Customer...", name: "", phone: "" },
        movie: {
          _id: "Choose movie...",
          title: "",
          genre: { name: "" },
          numberInStock: ""
        }
      }
    };
  }

  selectCustomer = customer => {
    this.setState({ rental: { ...this.state.rental, customer } });
  };

  selectMovie = movie => {
    this.setState({ rental: { ...this.state.rental, movie } });
  };

  handleSubmit = async () => {
    await saveRental({
      customerId: this.state.rental.customer._id,
      movieId: this.state.rental.movie._id
    });

    this.props.history.push("/rentals");
  };

  handleReturn = async () => {
    await saveReturn({
      customerId: this.state.rental.customer._id,
      movieId: this.state.rental.movie._id
    });

    this.props.history.push("/rentals");
  };

  async componentDidMount() {
    try {
      const rentalId = this.props.match.params.id;
      this.setState({ new: rentalId === "new" });
      if (rentalId === "new") return;

      const { data: rental } = await getRental(rentalId);
      this.setState({ rental });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const {
      _id,
      customer,
      movie,
      dateOut,
      dateReturned,
      rentalFee
    } = this.state.rental;
    return (
      <div>
        <h2>Rental Form</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          {!this.state.new && (
            <SimpleInput
              value={_id}
              label="Rental Reference"
              visibleLabel={true}
            />
          )}
          {this.state.new && (
            <SelectDialog
              title="Select Customer"
              value={customer._id}
              id="customer"
              label="Customer Details"
            >
              <Customers selectCustomer={this.selectCustomer} />
            </SelectDialog>
          )}
          <SimpleInput
            value={customer.name}
            label="Customer Name"
            visibleLabel={!this.state.new}
          />
          <SimpleInput
            value={customer.phone}
            label="Customer Phone"
            visibleLabel={!this.state.new}
          />

          {this.state.new && (
            <SelectDialog
              title="Select Movie"
              value={movie._id}
              id="movie-dlg"
              label="Movie details"
            >
              <Movies selectMovie={this.selectMovie} />
            </SelectDialog>
          )}
          <SimpleInput
            value={movie.title}
            label="Movie title"
            visibleLabel={!this.state.new}
          />
          <SimpleInput
            value={movie.dailyRentalRate}
            label="Daily Rental Rate"
            visibleLabel={!this.state.new}
          />
          {!this.state.new && (
            <>
              <SimpleInput
                value={dateFormating(dateOut)}
                label="Date out"
                visibleLabel={true}
              />
              <SimpleInput
                value={dateFormating(dateReturned)}
                label="Date Returned"
                visibleLabel={true}
              />
              <SimpleInput
                value={`$ ${
                  dateReturned
                    ? rentalFee
                    : feeUpToday(dateOut, movie.dailyRentalRate)
                }.00`}
                label={dateReturned ? "Fee" : "Fee when return now"}
                visibleLabel={true}
                contrast={!dateReturned}
              />
            </>
          )}

          {this.state.new && (
            <button
              type="button"
              disabled={
                customer._id === "Choose Customer..." ||
                movie._id === "Choose movie..."
              }
              className="btn btn-primary mr-3"
              onClick={() => this.handleSubmit()}
            >
              Rent
            </button>
          )}
          {!this.state.new && !dateReturned && (
            <button
              type="button"
              className="btn btn-primary mr-3"
              onClick={() => this.handleReturn()}
            >
              Return
            </button>
          )}
          <ButtonCancel back={() => this.props.history.push("/rentals")} />
        </form>
      </div>
    );
  }
}

export default RentalForm;
