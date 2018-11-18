import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "./data/demoRestaurant.json";
import { List, Avatar, Icon, Rate, Input, Menu, Dropdown, Button } from "antd";
//import DiningSearch from "../component/restaurantSearch";
//import { getRestaurants } from "../api/diningAPI";
const Search = Input.Search;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd</a>
    </Menu.Item>
  </Menu>
);
const menu1 = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">$</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">$$</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">$$$</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">$$$$</a>
    </Menu.Item>
  </Menu>
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

    console.log(listData);
    return listData;
  };

  componentDidMount = () => {
    if(!this.state.listData) {
      
    }
    this.handleSearchRequest("Vancouver").then(Response=>{
      this.setState({
        listData : Array.from(Response)
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
        <Search style={{
          float:"left",
          width: "30%"
        }}
          placeholder="Location (Road Number, City)"
          onSearch={value => {
            this.getRestaurantList(value);
          }}
          enterButton
        />
        <div style={{
          margin: "8px"
        }}>
          <Dropdown overlay={menu1} placement="bottomLeft">
            <Button>Price</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>Categories</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>Sort By</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Open Now</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Limit</Button>
          </Dropdown>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Special</Button>
          </Dropdown>
        </div>
  

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

        <Icon type="loading" />

      </div>

      
      );
  }
}

export default Dining;
