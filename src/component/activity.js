import React, { Component } from "react";
import storage from '../utils/Storage';
import config from '../config.js';
import axios from 'axios';
import { List, Card, Tooltip  } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";

var user = storage.getUserInfo();

// testing data
const data = [
    'you play a dog',
    'you play a dog',
    'you play a dog',
    'you play a dog',
    'you play a dog',
  ];

class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            logs: [],
            loading: true
        }

        this.getUserLog = this.getUserLog.bind(this);

        this.getUserLog();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            url: newProps.url
        });

        this.getUserLog();

        this.forceUpdate();
    }

    getUserLog() {
        
        axios({
            method: 'get',
            url: config.base_url + this.state.url + user.id,
            headers: {
                'Authorization': 'Bearer ' + storage.getAuthToken()
            }
        }).then( (response) => {

            this.setState({
                loading: false,
                logs: response.data.data
            });
            console.log(response.data.data[0].at);
            this.forceUpdate();

        }).catch( (error) => {

            this.setState({
                loading: false
            });

            this.forceUpdate();

        });
    }

    render() {

        return (
            <div>
                <Card loading={this.state.loading} style={{width: '70%', margin: '0 auto'}}>
                    <List
                        header={<div>Your Activities</div>}
                        footer={<div>Oh no, no more activities</div>}
                        bordered
                        dataSource={this.state.logs}
                        renderItem={item => (
                            <List.Item>
                                 <div style={{fontSize: '18pt', color: '#7a7a7a'}}> 
                                        <span style={{fontWeight: 'bold'}}> <Tooltip title={item.from.email}>{item.from.username}  </Tooltip></span>  <span> </span>
                                        <span style={{color: '#029cfc', fontWeight: 'bold'}}>{item.activity}</span><span> </span>
                                        <span style={{fontWeight: 'bold'}}><Tooltip title={item.to.email}>{item.to.username}</Tooltip></span> at <span> </span>
                                        <span style={{fontWeight: 'bold'}}>{moment.unix(parseInt(item.at)).format("YYYY-MM-DD HH:MM:SS")}</span>
                                </div>
                            </List.Item>)}
                    />
                </Card>
            </div>
        );
    }


}

export default Activity;
