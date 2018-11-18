import React, { Component } from "react";
import { Input, Modal, List } from "antd";

const { TextArea } = Input;

class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visible: newProps.visible,
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
                <label>Title</label>
                <Input
                    value={this.props.title}                    
                    onChange={this.props.onTitleChange}
                /><br/><br/>
                
                <label>Review</label>
                <TextArea rows={6}
                    value={this.props.content}
                    onChange={this.props.onContentChange}
                /><br/><br/>
                </Modal>
            </div>
        );
    }
}

export default ReviewModal;