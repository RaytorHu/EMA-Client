import React, { Component } from "react";
import { List, Avatar, Icon } from 'antd';
import storage from "../utils/Storage";

const IconText = ({ type, text }) => (
  <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
      </span>
);
class Review extends Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.reviews
        };
    }

    componentWillReceiveProps(newProps) {
      this.setState({
          data: newProps.reviews,
      });
      this.forceUpdate();
  }
    render() {
        return (
          <div className="reviews-container">
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                pageSize: 4,
              }}
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item
                  key={this.props.movie_id + this.state.data[1]}
                  actions={[
                    <IconText type="close" text="Delete this comment" />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={storage.getUserInfo().avatarUrl} />}
                    title={storage.getUserInfo().username}
                    description={"title: " + item[0]}
                  />
                  {item[1]}
                </List.Item>
              )}
            />
          </div>
        );
      }
}

export default Review;