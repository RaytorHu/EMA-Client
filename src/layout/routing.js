import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navigation from "./navigation";
import { SingleContent } from "./contentTemplate.js";
import Dining from "../container/dining";
import Movie from "../container/movie";
import Expense from "../container/expense";
import Settings from "../container/settings";
import Login from "../container/authentication/login";
import storage from "../utils/Storage";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Content, Sider, Footer } = Layout;
const MenuItemGroup = Menu.ItemGroup;

export const BaseLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Layout>
            <Navigation matchProps={matchProps} />
            <Layout>
              <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
                width={170}
                style={{ background: "#fff" }}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  style={{ height: "100%", borderRight: 0 }}
                >
                  {matchProps.match.path.startsWith("/dining") && (
                    <MenuItemGroup title="Dining">
                      <Menu.Item key="1">
                        <Link to="/dining/find_restaurant">
                          Find Restaurants
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to="/dining/restaurant_heatmap">Heat Map</Link>
                        Heat Map
                      </Menu.Item>
                    </MenuItemGroup>
                  )}
                  {matchProps.match.path === "/movie" && (
                    <MenuItemGroup title="Movie">
                      <Menu.Item key="3">Find a movie</Menu.Item>
                    </MenuItemGroup>
                  )}
                  {matchProps.match.path === "/expense" && (
                    <MenuItemGroup title="Expense">
                      <Menu.Item key="4">Pie chart</Menu.Item>
                      <Menu.Item key="5">Line chart</Menu.Item>
                    </MenuItemGroup>
                  )}
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Content
                  style={{
                    background: "#fff",
                    padding: 24,
                    marginTop: "30px",
                    minHeight: 280
                  }}
                >
                  <Component {...matchProps} />
                </Content>

                <Footer id="footer">I don't know the app's name</Footer>
              </Layout>
              <Sider
                collapsible
                reverseArrow
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
                width={200}
                style={{ background: "#fff" }}
              >
                Message
              </Sider>
            </Layout>
          </Layout>
        </div>
      )}
    />
  );
};
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <SingleContent size="s">
        <h1
          style={{
            padding: "100px 0",
            color: "#bbb",
            fontWeight: "600"
          }}
        >
          The Page you are looking for does not exist!
        </h1>
      </SingleContent>
    </div>
  );
};

class PrivateRoute extends Component {
  render() {
    return (
      <div>
        <BaseLayout {...this.props} />
      </div>
    );
  }
}
export class ComponentRoutes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/dining/find_restaurant" component={Dining} />
        <PrivateRoute
          exact
          path="/dining/restaurant_heatmap"
          component={Dining}
        />

        <PrivateRoute exact path="/movie" component={Movie} />

        <PrivateRoute exact path="/expense" component={Expense} />

        <PrivateRoute exact path="/settings" component={Settings} />
        <Redirect from="/" to="/dining/find_restaurant" />

        <Redirect from="/dinings" to="/dining/find_restaurant" />
        <Redirect from="/movies" to="/movie" />
        <Redirect from="/expenses" to="/expense" />
        <Redirect from="/setting" to="/settings" />

        <PrivateRoute component={NotFoundPage} />
      </Switch>
    );
  }
}

class AuthRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect from="/" to="/login" />
      </Switch>
    )
  }
}

class Routing extends Component {
  render() {
    return (
      <div className="Routing">
        <Router>
          <div>
            {storage.isLoggedIn()
              ? <ComponentRoutes />
              : <AuthRoutes />
            }
          </div>
        </Router>
      </div>
    );
  }
}

export default Routing;
