import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
import AuthLayout from './layout';
import AuthServer from '../../server/authentication';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        AuthServer.login(values.email, values.password);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const loginForm = (
      <Form onSubmit={this.handleSubmit} style={{ width: '300px', margin: '0 auto' }}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }], // TODO: Add more email validation rules
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }], // TODO: Add more password validation rules
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}> {/* TODO: Disable when validation failed */ }
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </FormItem>
      </Form>
    );

    return AuthLayout(loginForm);
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
