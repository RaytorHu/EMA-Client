import React, { Component } from "react";
import { Table } from "antd";
import UserServer from '../../server/users';
import UserTableService from './UserTableService';

class UserTable extends Component {
    constructor() {
        super();

        UserServer.getAllUsers().then(users => {
            this.setState({
                dataSource: UserTableService.formatUsers(users),
            });
        });

        this.state = {
            dataSource: [],
        };
    }

    render() {
        return <Table dataSource={this.state.dataSource} columns={UserTableService.columns}></Table>;
    }
}

export default UserTable;
