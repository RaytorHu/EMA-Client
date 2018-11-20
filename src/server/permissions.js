import axios from 'axios';
import config from '../config';
import storage from '../utils/Storage';

const baseUrl = config.base_url;

const server = axios.create({
  baseURL: config.base_url,
});

/**
 * Get all permissions from server
 * 
 * @returns {Array} The permissions
 */
const getAllPermissions = async () => {
    const res = await server.get(baseUrl + 'api/v1/permissions');

    storage.setPermissionList(res.data.data);

    return res.data.data;
};

export default {
    getAllPermissions,
};
