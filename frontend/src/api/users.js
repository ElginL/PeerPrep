import axios from 'axios';

const baseUrl = 'http://localhost:3002';

const loginUser = (username, password) => {
    const credentials = {
        username,
        password
    };

    return axios.post(baseUrl + "/login", credentials)
        .then(response => ({ token: response.data.token, username: response.data.username, status: response.status }))
        .catch(error => ({ message: error.response.data.msg, status: error.response.status }));
};

const registerUser = (username, password) => {
    const credentials = {
        username,
        password
    };

    return axios.post(baseUrl + '/register', credentials)
        .then(response => ({ message: response.data.msg, status: response.status }))
        .catch(error => ({ message: error.response.data.msg, status: error.response.status }));
};

const setAuthenticationHeader = () => {
    return {
        headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}`}
    };
};

const deregisterUser = () => {
    return axios.delete(baseUrl + '/deregister', setAuthenticationHeader())
        .then(res => ({ status: res.status }))
        .catch(error => ({ status: error.response.status }));
};

const isLoggedIn = async () => {
    try {
        await axios.get(baseUrl + '/verifytoken', setAuthenticationHeader());

        return true;
    } catch (e) {
        return false;
    }
};


export {
    loginUser,
    isLoggedIn,
    registerUser,
    deregisterUser
};