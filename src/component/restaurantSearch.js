import React, { Component } from "react";
import { Input } from "antd";
import getRestaurants from "../api/diningAPI";

const Search = Input.Search;

class DiningSearch extends Component {
  getRestaurantList = value => {};

  render() {
    return (
      <Search
        placeholder="Please enter city, price level ($-$$$$) or name, etc."
        onSearch={value => this.getRestaurantList}
        enterButton
      />
    );
  }
}

export default DiningSearch;
