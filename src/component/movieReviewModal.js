import React, { Component } from "react";
import { Input, Modal } from "antd";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            error: this.props.error,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visible: newProps.visible,
            error: newProps.error
        });

        this.forceUpdate();
    }

    render(){
        return(
            <div>
                <Modal
                    title="New Movie Review"
                    visible = {this.state.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
           
                <Input
                    label="Title"
                    onChange={this.props.onTitleChange}
                /><br/><br/>

                <TextArea rows={6}
                    label="Content"
                    onChange={this.props.onContentChange}
                /><br/><br/>
                </Modal>
            </div>
        );
    }
}

export default ReviewModal;