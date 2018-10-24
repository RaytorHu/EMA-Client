import React, { Component } from "react";
import { Menu, Button, Icon, Tooltip } from "antd";
import { Link, withRouter } from "react-router-dom";

class Navigation extends Component {
  state = {
    username: "test user"
  };

  render() {
    return (
      <div
        className="Navigation"
        style={{
          minWidth: "720px",
          textAlign: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <Menu mode="horizontal">
          <Menu.Item
            style={{
              marginRight: "5px",
              marginLeft: "10px",
              borderBottom: "thin solid #ffffff"
            }}
          >
            <Link to="/dining">
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

          <Menu.Item>
            <Link to="/settings">
              <Icon type="setting" />
              Settings
            </Link>
          </Menu.Item>
          <Menu.Item
            style={{
              textAlign: "center",
              borderBottom: "thin solid #ffffff",
              float: "right",
              marginLeft: "-20px"
            }}
          >
            <Tooltip title="Logout">
              <Button
                shape="circle"
                size="small"
                type="dashed"
                onClick={this.logout}
                style={{ textAlign: "center", backgroundColor: "#efefef" }}
              >
                <Icon
                  type="logout"
                  style={{ textAlign: "center", marginLeft: "5px" }}
                />
              </Button>
            </Tooltip>
          </Menu.Item>

          <Menu.Item
            style={{
              textAlign: "right",
              borderBottom: "thin solid #ffffff",
              float: "right"
            }}
          >
            <p>{this.state.username}</p>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Navigation);
