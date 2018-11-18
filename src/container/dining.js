import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "./data/demoRestaurant.json";
import { List, Avatar, Icon, Rate, Input } from "antd";
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
      listData: []
    };
  }

  initList = () => {
    const listData = [{
      url: "",
        name: "",
        image_url: "",
        phone: "",
        address: "",
        city: "",
        rating: "",
        review_count: "",
        price: ""
    }];

    // for (let i = 0; i < Object.keys(myData.businesses).length; i++) {
    //   listData.push({
    //     url: myData.businesses[i].url,
    //     name: myData.businesses[i].name,
    //     image_url: myData.businesses[i].image_url,
    //     phone: myData.businesses[i].display_phone,
    //     address: myData.businesses[i].address1,
    //     city: myData.businesses[i].city,

    //     rating: myData.businesses[i].rating,
    //     review_count: myData.businesses[i].review_count,
    //     price: myData.businesses[i].price
    //   });
    // }
    console.log(listData);
    return listData;
  };

  componentDidMount = () => {
    this.handleSearchRequest("Vancouver").then(Response=>{
      this.setState(({
        listData : Array.from(Response)
      }));
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
      this.setState({listData: data.businesses});
    } else {
      this.handleSearchRequest(value).then(Response=>{
        this.setState(({
          listData : Array.from(Response)
        }));
        this.forceUpdate();
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
        <Search
          placeholder="Please enter city, price level ($-$$$$) or name, etc."
          onSearch={value => {
            this.getRestaurantList(value);
          }}
          enterButton
        />

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5
          }}
          dataSource={this.state.listData}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={[
                <IconText type="star-o" text={item.review_count} />,
                <Rate disabled defaultValue={item.rating} />,
                <p>{item.price || "N/A"}</p>
                 //,<IconText type="like-o" text="156" />,
                 //<IconText type="message" text="2" />
              ]}
              extra={<img width={272} alt="logo" src={item.image_url} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image_url} />}
                title={<a href={item.url}>{item.name}</a>}
                description={item.display_phone}
              />
              {item.address + ", " + item.city}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Dining;
