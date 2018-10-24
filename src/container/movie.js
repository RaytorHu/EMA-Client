import React, { Component } from "react";
import { SideBar } from "../layout/contentTemplate";
class Movie extends Component {
  render() {
    return (
      <div>
        <SideBar>
          {" "}
          <h3>Left panel</h3>{" "}
        </SideBar>
        Movie page
      </div>
    );
  }
}

export default Movie;
