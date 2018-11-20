import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "./data/demoRestaurant.json";
import RefineResult from "../component/diningRefineResult";
import DiningList from "../component/diningList";
import { List, Avatar, Icon, Rate, Input, Select } from "antd";
//import DiningSearch from "../component/restaurantSearch";
//import { getRestaurants } from "../api/diningAPI";
const Search = Input.Search;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);



const baseUrl = config.base_url;

const server = axios.create({
  baseURL: config.base_url,
});

class Dining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listLoading: true
    };
  }

  componentDidMount = () => {
    this.handleSearchRequest("Vancouver").then(Response => {
      this.setState({
        listData: Array.from(Response),
        listLoading: false
      });
      this.forceUpdate();
    });
  };

  handleSearchRequest = async (value) => {
    try {
      const res = await server.get(baseUrl + 'api/v1/dining/restaurant_search/' + value);
      return res.data.data;
    } catch (err) {
      console.log(Array.from(err));
      return false;
    }
  };

  getRestaurants = (value) => {
    let data = JSON.parse(JSON.stringify(myData));
    if (!value || value === "") {
      alert("Please enter your keyword");
      this.setState({
        listData: data.businesses,
        listLoading: false
      });
    } else {
      this.handleSearchRequest(value).then(Response => {
        this.setState(({
          listData: Array.from(Response),
          listLoading: false
        }));
      });

    }
  }

  getRestaurantList = value => {
    let a = this.getRestaurants(value);
    this.setState({
      listData: a
    });
  };

  render() {
    return (
      <div>
        <Search style={{
          alignContent: "left",
          width: "100%",
          display: "block"
        }}
          placeholder="Location (Road Number, City)"
          onSearch={value => {
            this.setState({ listLoading: true });
            this.getRestaurantList(value);
          }}
          enterButton
        />

        <RefineResult
        />
        <DiningList
          listData={this.state.listData}
          loading={this.state.listLoading}
        />
      </div>
    );
  }
}

export default Dining;
