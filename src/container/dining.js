import React, { Component } from "react";
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

function getRestaurants(value) {
  let data = JSON.parse(JSON.stringify(myData));
  console.log(data.businesses[0].alias);
  return data.businesses;
}

class Dining extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    };
  }

  initList = () => {
    const listData = [];

    for (let i = 0; i < Object.keys(myData.businesses).length; i++) {
      listData.push({
        url: myData.businesses[i].url,
        name: myData.businesses[i].name,
        image_url: myData.businesses[i].image_url,
        display_phone: myData.businesses[i].display_phone,
        location: {
          address1: myData.businesses[i].location.address1,
          city: myData.businesses[i].location.city
        },

        rating: myData.businesses[i].rating,
        review_count: myData.businesses[i].review_count,
        price: myData.businesses[i].price
      });
    }

    return listData;
  };

  componentDidMount = () => {
    var listData = this.initList();
    this.setState({
      listData
    });
  };

  getRestaurantList = value => {
    let a = getRestaurants(value);
    this.setState({
      listData: a
    });

    // return await getRestaurants(value).then(data => {
    //   return this.setState({ listData: data });
    // });
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
                // <IconText type="like-o" text="156" />,
                // <IconText type="message" text="2" />
              ]}
              extra={<img width={272} alt="logo" src={item.image_url} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image_url} />}
                title={<a href={item.url}>{item.name}</a>}
                description={item.display_phone}
              />
              {item.location.address1 + ", " + item.location.city}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Dining;
