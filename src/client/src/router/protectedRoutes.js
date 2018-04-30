import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class ProtectedRoutes extends Component {
  componentWillReceiveProps(nextProps) {
    const { isLoggedIn, history } = nextProps;

    console.log("====================================");
    console.log(nextProps);
    console.log("====================================");

    if (isLoggedIn) return;

    history.push("/login");
  }

  render({ isLoading } = this.props) {
    return (
      !isLoading && <Switch>
        <Route path="/" component={route} />
      </Switch>
    );
  }
}

const route = () => {
  return <div>123</div>;
};

export default connect(({ auth }) => {
  return {
    isLoggedIn: auth.get("isLoggedIn"),
    isLoading: auth.get("isLoading")
  };
})(withRouter(ProtectedRoutes));
