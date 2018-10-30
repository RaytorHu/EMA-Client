import React, { Component } from "react";
import myData from "./data/demoRestaurant.json";
import { List, Avatar, Icon, Rate } from "antd";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class HeatMap extends Component {
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
        href: myData.businesses[i].url,
        title: myData.businesses[i].name,
        avatar: myData.businesses[i].image_url,
        description: myData.businesses[i].display_phone,
        content:
          myData.businesses[i].location.address1 +
          ", " +
          myData.businesses[i].location.city,
        rating: myData.businesses[i].rating,
        reviewCount: myData.businesses[i].review_count,
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

  render() {
    return (
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
            key={item.title}
            actions={[
              <IconText type="star-o" text={item.reviewCount} />,
              <Rate disabled defaultValue={item.rating} />,
              <p>{item.price || "N/A"}</p>
              // <IconText type="like-o" text="156" />,
              // <IconText type="message" text="2" />
            ]}
            extra={<img width={272} alt="logo" src={item.avatar} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  }
}

export default HeatMap;
