import { Input, Form, Button } from "antd";
import gql from "graphql-tag";
import { connect } from "react-redux";
import React, { Component } from "react";
import { compose, Mutation } from "react-apollo";
import styled from "styled-components";
import { getUserData } from "../../redux/auth/actions";

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

    getUserData(token);
  };

  onChangeCredentials = (val, prop) => {
    this.setState({
      [prop]: val
    });
  };

  render({ form } = this.props) {
    const { getFieldDecorator } = form;

    return (
      <Wrapper>
        <Mutation mutation={LOGIN_QUERY}>
          {(loginUser, { data }) => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.handleSubmit(loginUser);
              }}
            >
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "Please input email!" }]
                })(
                  <Input
                    htmlType="email"
                    placeholder="Email"
                    onChange={e =>
                      this.onChangeCredentials(e.target.value, "email")
                    }
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Please input password!" }]
                })(
                  <Input
                    htmlType="password"
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
    );
  }
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export default compose(Form.create(), connect(null, { getUserData }))(Login);
