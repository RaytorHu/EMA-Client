import React, { Component } from "react";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;
const FormItem = Form.Item;

class ReviewForm extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

    redner(){
        const { getFieldDecorator } = this.props.form;
        const reviewForm =(
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="Title"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input name="title"/>
                    )}
                    </FormItem>
                    <FormItem
                        label="Review"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                    {getFieldDecorator('Review', {
                        rules: [{ required: true, message: 'Please input your review!' }],
                    })(
                        <TextArea rows={10} name="content"/>
                    )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12, offset: 5 }}
                    >
                    <a href="/movie"><Button type="primary">Cancel</Button></a>
                    </FormItem>
                    <FormItem
                        wrapperCol={{ span: 12, offset: 5 }}
                    >
                    <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>
                </Form>
        );

        return 
    }
}

const WrappedReviewForm = Form.create()(ReviewForm);

export default WrappedReviewForm;