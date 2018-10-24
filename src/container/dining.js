import React, { Component } from "react";
import { SideBar } from "../layout/contentTemplate";

class Dining extends Component {
  render() {
    return (
      <div>
        <SideBar>
          {" "}
          <h3>Left panel</h3>
          <p>Find restaurant</p>
          <p>heat map</p>
        </SideBar>
        Dining page
      </div>
    );
  }
}

export default Dining;
