import React, { Component, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/common/spinner";

import NavBar from "./components/navBar";
import Logout from "./components/user/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

const Movies = lazy(() => import("./components/movies/movies"));
const Rentals = lazy(() => import("./components/rentals/rentals"));
const RentalForm = lazy(() => import("./components/rentals/rentalForm"));
const Customers = lazy(() => import("./components/customers/customers"));
const CustomerForm = lazy(() => import("./components/customers/customerForm"));
const MovieForm = lazy(() => import("./components/movies/movieForm"));
const NotFound = lazy(() => import("./components/notFound"));
const LoginForm = lazy(() => import("./components/user/loginForm"));
const RegisterForm = lazy(() => import("./components/user/registerForm"));
const ProtectedRoute = lazy(() => import("./components/common/protectedRoute"));
const Profile = lazy(() => import("./components/user/profile"));

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Spinner />
        <NavBar user={this.state.user} />
        <main className="container">
          <Suspense fallback={<div>Loading page...</div>}>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movies user={this.state.user} {...props} />}
              />
              <ProtectedRoute path="/customers/:id" component={CustomerForm} />
              <Route
                path="/customers"
                render={props => (
                  <Customers user={this.state.user} {...props} />
                )}
              />
              <ProtectedRoute path="/rentals/:id" component={RentalForm} />
              <Route
                path="/rentals"
                render={props => <Rentals user={this.state.user} {...props} />}
              />
              <Route path="/profile" component={Profile} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </Suspense>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
