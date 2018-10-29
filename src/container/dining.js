import React, { Component } from "react";
import myData from "./data/demoRestaurant.json";

class Dining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: Array(9)
    };
  }

  render() {
    return (
      <div>
        <h3>Dining page</h3>
        <p />
      </div>
    );
  }
}

class demoRestaurantList extends Component {
  constructor(props, i) {
    super(props);
    this.state = myData.business[i];
  }
}

export default Dining;
