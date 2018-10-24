import React, { Component } from "react";
import Routing from "./layout/routing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#4286f4" }}>
        <Routing />
      </div>
    );
  }
}

export default App;
