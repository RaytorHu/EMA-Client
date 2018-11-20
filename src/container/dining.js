import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "./data/demoRestaurant.json";
import storage from '../utils/Storage'
//import RefineResult from "../component/diningRefineResult";
import DiningList from "../component/diningList";
import { List, Avatar, Icon, Rate, Input, Select, Button } from "antd";
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

const header = {
  headers: {
    Authorization: 'Bearer ' + storage.getAuthToken()
  }
}

const Option = Select.Option;

class Dining extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      listLoading: true,
      loading: false,
      iconloading: false,
      location: "",
      price: "",
      categories: "",
      sort_by: "",
      open_now: true,
      attributes: "",
      iconloading: false,
    };
  }

  componentDidMount = () => {
    this.handleSearchRequest("Vancouver").then(Response => {
      console.log(Response);
      this.setState({
        listData: Array.from(Response),
        listLoading: false
      });
      this.forceUpdate();
    });
  };

  handleChange(value) {
    console.log(value);
  }

  handlePriceChange = (value) => {
    this.setState({ price: value });
  }

  handleCategoriesChange = (value) => {
    this.setState({ categories: value });
  }

  handleSortChange = (value) => {
    this.setState({ sort_by: value });
  }

  handleOpenNowChange = (value) => {
    this.setState({ open_now: value });
  }

  handleSpecialChange = (value) => {
    this.setState({ attributes: value });
  }

  handleSearchRequest = async (value) => {
    let string = JSON.stringify({
      location: value,
    });
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/restaurant_search/' + string,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      console.log("Got Response!")
      return response.data.data;
    });


    // try {
    //   // let string = JSON.stringify({
    //   //   location: value,
    //   // });
    //   // console.log(string);
    //   const res = await server.get(baseUrl + 'api/v1/dining/restaurant_search/' + string, header);
    //   return res.data.data;
    // } catch (err) {
    //   //console.log(Array.from(err));
    //   return false;
    // }
  };

  getRestaurantList = (value) => {
    let data = JSON.parse(JSON.stringify(myData));
    if (!value || value === "") {
      alert("Please enter your keyword");
      this.setState({
        location: "vancouver",
        listData: data.businesses,
        listLoading: false
      });
    } else {
      this.handleSearchRequest(value).then(Response => {
        this.setState({
          location: value,
          listData: Array.from(Response),
          listLoading: false
        });
      });
    }
  }

  enterLoading = () => {
    this.setState({ loading: true });
  }

  generateStateString = () => {
    let res = JSON.stringify({
      location: this.state.location,
      price: this.state.price,
      categories: this.state.categories,
      sort_by: this.state.sort_by,
      open_now: this.state.open_now,
      attributes: this.state.attributes,
    });
    return res;
  }

  handleRefineRequest = async () => {
    let state = this.generateStateString();
    axios({
      method: 'get',
      url: config.base_url + 'api/v1/dining/restaurant_search/' + state,
      headers: {
        Authorization: 'Bearer ' + storage.getAuthToken()
      }
    }).then(response => {
      return response.data.data;
    });


    // try {
    //   let state = this.generateStateString();
    //   console.log(state);
    //   const res = await server.get(baseUrl + 'api/v1/dining/restaurant_search/' + state, header);
    //   return res.data.data;
    // } catch (err) {
    //   console.log(Array.from(err));
    //   return false;
    // }
  }

  refineResult = () => {
    this.handleRefineRequest(this.state).then(Response => {
      this.setState({
        listData: Array.from(Response),
        listLoading: false,
        iconloading: false,
      });
    })
  }

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

        <Select
          showSearch
          style={{ width: 100 }}
          placeholder="Price"
          optionFilterProp="children"
          onChange={this.handlePriceChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="1">$</Option>
          <Option value="2">$$</Option>
          <Option value="3">$$$</Option>
          <Option value="4">$$$$</Option>
          <Option value="">Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="Category"
          optionFilterProp="children"
          onChange={this.handleCategoriesChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="japanese">Japanese Food</Option>
          <Option value="bakeries">Bakeries</Option>
          <Option value="hotdogs">Fast Food</Option>
          <Option value="chinese">Chinese Food</Option>
          <Option value="bars">Bars</Option>
          <Option value="">Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="Sort By"
          optionFilterProp="children"
          onChange={this.handleSortChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="best_match">Best Match</Option>
          <Option value="rating">Rating</Option>
          <Option value="review_count">Review Count</Option>
          <Option value="">Default</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="Open Now"
          optionFilterProp="children"
          onChange={this.handleOpenNowChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="true">Yes</Option>
          <Option value="false">No</Option>
        </Select>

        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="Special"
          optionFilterProp="children"
          onChange={this.handleSpecialChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value="hot_and_new">Hot&New</Option>
          <Option value="cashback">Yelp Cashback</Option>
          <Option value="reservation">Reservation Ready</Option>
          <Option value="">Default</Option>
        </Select>

        <Button
          type="primary"
          icon="sync"
          loading={this.state.iconloading}
          onClick={() => {
            this.setState({
              iconloading: true,
              listLoading: true,
            });
            this.refineResult();
          }}
          iconloading={this.iconloading}
        >
          Refine Result
          </Button>

        <DiningList
          listData={this.state.listData}
          loading={this.state.listLoading}
        />
      </div>
    );
  }
}

export default Dining;
