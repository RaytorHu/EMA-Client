import React, { Component } from "react";
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import storage from '../utils/Storage';
import config from '../config.js';
import axios from 'axios';

class TransactionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visible: newProps.visible
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div>
              <Modal
                title="Edit Transaction"
                visible={this.state.visible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          );
    }
    

}

export default TransactionModal;
