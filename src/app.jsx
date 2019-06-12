import React, { Component } from "react";
import Movies from "./components/movies";
import NavBar from "./components/navBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Movies />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
