import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import AuthLayout from './layout';
import AuthServer from '../../server/authentication';

const FormItem = Form.Item;

class RegisterForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        AuthServer.register(values.username, values.email, values.password);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;

    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    // TODO: Add more validation in form
    const registerForm = (
      <Form onSubmit={this.handleSubmit} style={{ width: '500px', margin: '0 auto' }}>
        {/* Username */}
        <FormItem label="Username" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [
              {required: 'true', message: 'Username is required'},
            ],
          })(
            <Input />
          )}
        </FormItem>
        {/* Email */}
        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {type: 'email', message: 'The input is not valid email!'},
              {required: 'true', message: 'Email is required'},
            ],
          })(
            <Input />
          )}
        </FormItem>
        {/* Password */}
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {required: true, message: 'Password is required'},
              {validator: this.validateToNextPassword},
            ]
          })(
            <Input type="password" />
          )}
        </FormItem>
        {/* Confirm Password */}
        <FormItem label="Confirm Password" {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              {required: true, message: 'Please confirm your password!'},
              {validator: this.compareToFirstPassword},
            ],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        {/* Submit */}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Register</Button>
        </FormItem>
        Already have an account? <a href="/login">Login now!</a>
      </Form>
    );

    return AuthLayout(registerForm);
  }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;
