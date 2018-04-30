import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { GRAPHQL_API } from "../../config";
import reduxStore from "../../redux/store";
import Routes from "../../router";

const { store } = reduxStore;

const client = new ApolloClient({
  uri: GRAPHQL_API,
  credentials: "same-origin"
});

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
