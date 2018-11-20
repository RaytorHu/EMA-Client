import axios from 'axios';
import config from '../config';
import storage from '../utils/Storage';

const baseUrl = config.base_url;

const server = axios.create({
  baseURL: config.base_url,
});

/**
 * @returns {Array} User array
 */
const getAllUsers = async () => {
    const options = {
        headers: {
            Authorization: `Bearer ${storage.getAuthToken()}`
        }
    };

    const res = await server.get(baseUrl + 'api/v1/user', options);

    return res.data.data;
};

/**
 * Disable an user
 * 
 * @param {Number} userId The user id that is going to be disabled
 */
const disableUser = async (userId) => {
    const options = {
        headers: {
            Authorization: `Bearer ${storage.getAuthToken()}`
        }
    };

    const res = await server.put(baseUrl + 'api/v1/user/' + userId + '/disable', {}, options);

    return res.data.data;
};

/**
 * Enable an user
 * 
 * @param {Number} userId The user id that is going to be enabled
 */
const enableUser = async (userId) => {
    const options = {
        headers: {
            Authorization: `Bearer ${storage.getAuthToken()}`
        }
    };

    const res = await server.put(baseUrl + 'api/v1/user/' + userId + '/restore', {}, options);

    return res.data.data;
};

/**
 * Search a user
 * 
 * @param {String} input The fragment user want to search
 */
const searchUser = async (input) => {
    const options = {
        headers: {
            Authorization: `Bearer ${storage.getAuthToken()}`
        }
    };

    const res = await server.post(baseUrl + 'api/v1/user/search', {
        input: input,
        withTrashed: true,
    }, options);

    return res.data.data;
};

export default {
    getAllUsers,
    disableUser,
    enableUser,
    searchUser,
};
