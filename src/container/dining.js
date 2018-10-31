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

function generateKeywordList(business) {
  let list = [];
  list.push(
    business.name.toLowerCase(),
    business.display_phone.replace(/[^0-9]/g, ""),
    business.location.address1.toLowerCase(),
    business.location.city.toLowerCase(),
    business.rating.toString(),
    business.price || "N/A"
  );
  return list;
}

function matchKeywordList(business, key) {
  key.replace(/[^0-9a-zA-Z]^\$/g, "");
  let keywordList = generateKeywordList(business);
  for (let i = 0; i < keywordList.length; i++) {
    if (keywordList[i].includes("$")) {
      return keywordList[i] === key;
    } else if (keywordList[i].includes(key)) {
      return true;
    }
  }
  return false;
}

function keywordSearch(list, key) {
  let result = [];
  for (let i = 0; i < list.businesses.length; i++) {
    if (matchKeywordList(list.businesses[i], key)) {
      result.push(list.businesses[i]);
    }
  }

  return result;
}

function getRestaurants(value) {
  let data = JSON.parse(JSON.stringify(myData));

  if (!value || value === "") {
    alert("Please enter your keyword");
    return data.businesses;
  } else {
    let result = keywordSearch(data, value);
    return result;
  }
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
