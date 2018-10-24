import React, { Component } from "react";
import { SideBar } from "../layout/contentTemplate";
class Settings extends Component {
  render() {
    return (
      <div>
        <SideBar>
          <h3>Left panel</h3>{" "}
        </SideBar>
        User settings page
      </div>
    );
  }
}

export default Settings;
