import React from "react";
import { Icon, Button } from 'antd';
import storage from '../../utils/Storage';
import BlockButton from './BlockButton';

const canBlockUser = storage.canBlockUser();
const canModifyUser = storage.canModifyUser();

const modifyTag = (<span key="modify" style={{margin: '0 10px'}}>
        <Button shape="circle">
            <Icon type="form"/>
        </Button>
    </span>);

const modifyRenderer = (user) => {
    const fields = [];

    if (canBlockUser) {
        fields.push(<BlockButton key="block" props={{user: user}}></BlockButton>);
    }

    if (canModifyUser) {
        fields.push(modifyTag);
    }

    return fields;
};

/**
 * Table columns
 */
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
    },
    {
        title: 'Modify User',
        key: 'modify',
        render: modifyRenderer,
    }
];

/**
 * @param {Array} users The users that is going to be formated
 * 
 * @returns {Array} Formatted users
 */
const formatUsers = (users) => {
    return users.map(user => {
        user.key = user.email;

        user.lastLogin = user.lastLogin 
            ? (new Date(user.lastLogin * 1000)).toDateString()
            : "Not yet logged in";
        
        return user;
    });
};

export default {
    columns,
    formatUsers,
};
