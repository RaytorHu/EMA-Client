import React, { Component } from "react";
import { Layout } from "antd";
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

const { Header, Footer, Content } = Layout;

// the min width of the web app is set to be 720px
const minWid = "730px";

const backgroundColor = "#b1b8c6";

// determines if the footer text should be white or black depending on color of background
function getLuma(color) {
  var c = color.substring(1); // strip #
  var rgb = parseInt(c, 16); // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff; // extract red
  var g = (rgb >> 8) & 0xff; // extract green
  var b = (rgb >> 0) & 0xff; // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  var co;
  if (luma < 125) {
    // dark
    co = "rgb(" + (r + 70) + "," + (g + 70) + "," + (b + 80) + ")";
    return co;
  } else {
    // light
    co = "rgb(" + (r - 70) + "," + (g - 70) + "," + (b - 60) + ")";
    return co;
  }
}

var contentStyle = {
  backgroundColor: backgroundColor,
  minWidth: minWid,
  padding: "0 5px"
};
var footerStyle = {
  textAlign: "center",
  backgroundColor: backgroundColor,
  minWidth: minWid,
  color: getLuma(backgroundColor)
};

export const BaseLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Layout
            className="BaseLayout"
            style={{
              minHeight: "100vh",
              minWidth: minWid
            }}
          >
            <Navigation
              style={{ minWidth: minWid }}
              //color={backgroundColor}
            />
            <Header
              style={{
                backgroundColor: "rgba(55,59,70,0)",
                height: "0%"
              }}
            />
            <Content id="content" style={contentStyle}>
              <div style={{ minWidth: "700px" }}>
                <Component {...matchProps} />
              </div>
            </Content>
            <Footer id="footer" style={footerStyle}>
              wtf is the website's name
            </Footer>
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
        <PrivateRoute exact path="/dining" component={Dining} />

        <PrivateRoute exact path="/movie" component={Movie} />

        <PrivateRoute exact path="/expense" component={Expense} />

        <PrivateRoute exact path="/settings" component={Settings} />

        <Redirect from="/dinings" to="/dining" />
        <Redirect from="/movies" to="/movie" />
        <Redirect from="/expenses" to="/expense" />
        <Redirect from="/setting" to="/settings" />

        <PrivateRoute component={NotFoundPage} />
      </Switch>
    );
  }
}

class Routing extends Component {
  render() {
    return (
      <div className="Routing">
        <Router>
          <div>
            <ComponentRoutes />
          </div>
        </Router>
      </div>
    );
  }
}

export default Routing;
