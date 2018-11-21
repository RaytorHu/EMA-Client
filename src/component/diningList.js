import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "../container/data/demoRestaurant.json";
import { List, Avatar, Icon, Rate, Input, Select } from "antd";
const Search = Input.Search;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class DiningList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            loading: true
        };
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            listData: newProps.listData,
            loading: newProps.loading
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div>

                <List
                    itemLayout="vertical"
                    size="large"
                    loading={this.state.loading}
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

export default DiningList;
