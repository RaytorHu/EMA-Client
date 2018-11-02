import React, { Component } from "react";
import { Menu, Button, Icon, Tooltip, Layout } from "antd";
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
              <Tooltip title="Logout">
                <Button
                  shape="circle"
                  size="small"
                  type="dashed"
                  onClick={storage.logOutUser}
                  style={{ textAlign: "center", backgroundColor: "#efefef" }}
                >
                  <Icon type="logout" />
                </Button>
              </Tooltip>
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
