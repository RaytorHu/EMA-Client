import React, { Component } from "react";
import { Menu, Icon, Layout, Avatar } from "antd";
import { Link, withRouter } from "react-router-dom";
import storage from "../utils/Storage";
const { Header } = Layout;

class Navigation extends Component {
  state = {
    username: storage.getUserInfo().username,
  };

  render() {
    return (
      <div className="Navigation">
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item>
              <Link to="/dining/find_restaurant">
                <Icon type="shop" />
                Dining
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/movie">
                <Icon type="video-camera" />
                Movie
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/expense">
                <Icon type="pie-chart" />
                Expenses
              </Link>
            </Menu.Item>

            <Menu.Item
              style={{
                float: "right",
                marginLeft: "-20px"
              }}
            >
              <Link to="/settings">
                <Icon type="setting" />
                Settings
              </Link>
            </Menu.Item>
            <Menu.Item
              style={{
                float: "right",
                marginLeft: "-20px"
              }}
            >
              <Link to="/settings">
                <Icon type="logout" />
                Logout
              </Link>
            </Menu.Item>
            
            <Menu.Item
              style={{
                float: "right",
                marginLeft: "-20px",
              }}
              disabled
            >
              <Avatar 
                src={storage.getUserInfo()['avatarUrl']}
              >
              {this.state.username[0]}
              </Avatar>
            </Menu.Item>
            <Menu.Item
              style={{
                textAlign: "right",
                float: "right"
              }}
            >
              {this.state.username}
            </Menu.Item>
          </Menu>
        </Header>
      </div>
    );
  }
}

export default withRouter(Navigation);
