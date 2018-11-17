import React, { Component } from "react";
import { Input, Table, Button, Avatar } from 'antd';

const Search = Input.Search;
const columns = [{
    render: () => <Avatar icon="user" />
}, {
    title: 'Username',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
},
{
    title: 'User id',
    dataIndex: "id",
    render: text => <p>#{text}</p>

}, {
    render: () => <Button icon="user-add" />
}];
const data = [{
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    id: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
}];


class FindUser extends Component {
    render() {
        return <div>
            <Search
                placeholder="name/email/id"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </div>;
    }
}

export default FindUser;
