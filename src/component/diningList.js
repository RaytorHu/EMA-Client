import React, { Component } from "react";
import axios from "axios";
import config from '../config';
import myData from "../container/data/demoRestaurant.json";
import { List, Avatar, Icon, Rate, Input, Select, Button } from "antd";
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
            loading: true,
            theme: '',
            isFav: 'Add to Favourite'
        };
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            listData: newProps.listData,
            loading: newProps.loading
        });

        this.forceUpdate();
    }

    setFavor = () => {
        let newTheme = (this.state.theme !== 'filled' ? 'filled' : '')
        let newMsg = (this.state.isFav === 'Add to Favourite' ? 'Remove' : 'Add to Favourite')
        this.setState({
            theme: newTheme,
            isFav: newMsg,
        })
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
                                <Rate allowHalf disabled defaultValue={item.rating} />,
                                <p>{item.price || "N/A"}</p>,
                                <Button onClick={this.setFavor} >
                                    <Icon type="heart" theme={this.state.theme} />
                                    {this.state.isFav}
                                </Button>
                            ]}
                            extra={<img width={272} alt="logo" src={item.image_url} />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.image_url} />}
                                title={<a href={item.url}>{item.name}</a>}
                                description={item.phone}
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
