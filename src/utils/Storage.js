const STORAGE_TOKEN_KEY = 'authToken';
const STORAGE_USER_KEY  = 'user';

/**
 * Get current user's auth token
 * 
 * @returns {String} Current user auth token
 */
const getAuthToken = () => {
    return window.localStorage.getItem(STORAGE_TOKEN_KEY);
};

/**
 * Set current user's auth token
 * 
 * @param {String} authToken User's auth token coming from server
 */
const setAuthToken = (authToken) => {
    window.localStorage.setItem(STORAGE_TOKEN_KEY, authToken);
}

/**
 * Get current user's information
 * 
 * @returns {Object} The user object that contains user information
 */
const getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_USER_KEY));
};

/**
 * Set current user info
 * 
 * @param {Object} user The current user object
 */
const setUserInfo = (user) => {
    window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
};

/**
 * Check if user is in logged in state
 * 
 * @returns {Boolean} If user is logged in
 */
const isLoggedIn = () => {
    // TODO: Add token expire check here
    return !!getAuthToken();
};

/**
 * Log out an user
 */
const logOutUser = () => {
    window.localStorage.removeItem(STORAGE_TOKEN_KEY);
    window.localStorage.removeItem(STORAGE_USER_KEY);
    window.location.reload(); // TODO: Redirect to content page
};

export default {
    getAuthToken,
    setAuthToken,
    getUserInfo,
    setUserInfo,
    isLoggedIn,
    logOutUser,
};
