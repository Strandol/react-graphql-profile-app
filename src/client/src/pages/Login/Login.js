import { Input, Form, Button } from "antd";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import React, { Component } from "react";
import { compose, Mutation } from "react-apollo";
import styled from "styled-components";
import { getUserData } from "../../redux/auth/actions";
import { setToken } from "../../utils";

const FormItem = Form.Item;

const LOGIN_QUERY = gql`
  mutation loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      status
      token
      message
    }
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentWillReceiveProps({ isLoggedIn, history }) {
    if (isLoggedIn) {
      history.push("/");
    }
  }

  handleSubmit = loginUserFn => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;

      this.handleLogIn(loginUserFn);
    });
  };

  handleLogIn = async loginUserFn => {
    const { email, password } = this.state;
    const { getUserData } = this.props;

    const { data } = await loginUserFn({
      variables: {
        email,
        password
      }
    });

    const { token } = data.loginUser;

    setToken(token);
    getUserData();
  };

  onChangeCredentials = (val, prop) => {
    this.setState({
      [prop]: val
    });
  };

  render({ form, isLoading } = this.props) {
    const { getFieldDecorator } = form;

    return (
      !isLoading && (
        <Wrapper>
          <Mutation mutation={LOGIN_QUERY}>
            {(loginUser, { data }) => (
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(loginUser);
                }}
              >
                <FormItem label={<p className="inputLabel">Email</p>}>
                  {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please input email!" }]
                  })(
                    <Input
                      type="email"
                      placeholder="Email"
                      onChange={e =>
                        this.onChangeCredentials(e.target.value, "email")
                      }
                    />
                  )}
                </FormItem>
                <FormItem label={<p className="inputLabel">Password</p>}>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input password!" }
                    ]
                  })(
                    <Input
                      type="password"
                      placeholder="Password"
                      onChange={e =>
                        this.onChangeCredentials(e.target.value, "password")
                      }
                    />
                  )}
                </FormItem>
                <Button htmlType="submit">Log in</Button>
              </Form>
            )}
          </Mutation>
        </Wrapper>
      )
    );
  }
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding-top: 100px;
  .ant-form-item {
    margin-bottom: 10px;
  }
  .ant-form-explain {
    color: red;
  }
  .inputLabel {
    margin-bottom: 5px;
  }
`;

export default compose(
  Form.create(),
  connect(
    ({ auth }) => {
      return {
        isLoggedIn: auth.get("isLoggedIn"),
        isLoading: auth.get("isLoading")
      };
    },
    { getUserData }
  ),
  withRouter
)(Login);
