import React, { Component } from "react";
import { Input, Table, Button, Avatar, Tooltip } from 'antd';
import storage from '../utils/Storage';
import config from '../config.js';
import axios from 'axios';

const Search = Input.Search;
const columns = [{
    render: (text) => <Avatar src={text.avatarUrl} />
}, {
    title: 'Username',
    dataIndex: 'username',
    render: text => <a href="javascript:;">{text}</a>,
},
{
    title: 'User id',
    dataIndex: "id",
    render: text => <p>#{text}</p>

}, {
    render: () => <div><Tooltip placement="right" title="follow">
        <Button icon="star" />
    </Tooltip></div>
}];

class FindUser extends Component {
    state = {
        users: []
    }
    getUserList = async value => {
        axios({
            method: 'get',
            url: config.base_url + 'api/v1/user/' + value,
            headers: {
                'Authorization': 'Bearer ' + storage.getAuthToken()
            }

        })
            .then((response) => {
                this.setState({
                    users: response.data.data,
                    loading: false
                });
            })
    }

    render() {
        return <div>
            <h1>Find User</h1>
            <Search
                placeholder="name/email/id"
                onSearch={value => this.getUserList(value)}
                style={{ width: 200 }}
            />
            <br /><br />
            <Table columns={columns} dataSource={this.state.users} />
        </div>;
    }
}

export default FindUser;
