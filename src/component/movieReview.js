import React, { Component } from "react";
import { List, Avatar, Icon, Button } from 'antd';
import storage from "../utils/Storage";
import 'antd/dist/antd.css';

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
            data: this.props.reviews,
        };
    }

    componentWillReceiveProps(newProps) {
      this.setState({
          data: newProps.reviews,
      });
      this.forceUpdate();
    }

    handleDelete(review_id){
        this.props.onDelete(review_id);
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
                  key={item.id}
                  extra={<Button type="danger" style={ {display: item.btnShow}} onClick={this.handleDelete.bind(this, item.id)}>Delete</Button>}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={storage.getUserInfo().avatarUrl} />}
                    title={
                      <div>
                        <p style={{textDecoration: "underline", fontWeight: "bold", fontSize: 16}}>{item.userName}</p>
                      </div>
                    }
                    description={
                      <div>
                        <p>
                          <strong style={{fontStyle:"italic", fontSize: 15}}>Title: {item.title}</strong>
                        </p>
                        <hr/>
                      </div>
                    }
                  />
                  {<p style={{fontSize: 14}}>{item.content}</p>}
                </List.Item>
              )}
            />
          </div>
        );
      }
}

export default Review;