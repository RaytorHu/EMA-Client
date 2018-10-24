import React, { Component } from "react";
import { SideBar } from "../layout/contentTemplate";
class Expense extends Component {
  render() {
    return (
      <div>
        <SideBar>
          {" "}
          <h3>Left panel</h3>{" "}
        </SideBar>
        Expense page
      </div>
    );
  }
}

export default Expense;
