import React, { Component } from "react";
import Movies from "./components/movies";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Movies />
      </div>
    );
  }
}

export default App;
