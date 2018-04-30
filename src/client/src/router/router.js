import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import { connect } from "react-redux";
import reduxStore from "../redux/store";
import ProtectedRoutes from "./protectedRoutes";
import { getUserData } from "../redux/auth/actions";

import Login from "../pages/Login";

const { history } = reduxStore;

class Routes extends Component {
  componentDidMount({ getUserData } = this.props) {
    getUserData();
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoutes />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { getUserData })(Routes);
