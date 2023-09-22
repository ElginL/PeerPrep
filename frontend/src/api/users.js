import axios from "axios";

const baseUrl = "http://localhost:3002";

const loginUser = (username, password) => {
  const credentials = {
    username,
    password,
  };

  return axios
    .post(baseUrl + "/login", credentials)
    .then((response) => ({
      token: response.data.token,
      username: response.data.username,
      isManager: response.data.isManager,
      status: response.status,
    }))
    .catch((error) => ({
      message: error.response.data.msg,
      status: error.response.status,
    }));
};

const registerUser = (username, password) => {
  const credentials = {
    username,
    password,
  };

  return axios
    .post(baseUrl + "/register", credentials)
    .then((response) => ({
      message: response.data.msg,
      status: response.status,
    }))
    .catch((error) => ({
      message: error.response.data.msg,
      status: error.response.status,
    }));
};

const setAuthenticationHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("credentials")).sessionToken
      }`,
    },
  };
};

const deregisterUser = () => {
  return axios
    .delete(baseUrl + "/deregister", setAuthenticationHeader())
    .then((res) => ({ status: res.status }))
    .catch((error) => ({ status: error.response.status }));
};

const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.put(
      baseUrl + "/update/password",
      { 
        oldPassword,
        newPassword
      },
      setAuthenticationHeader()
    );

    console.log(response);

    return {
      message: response.data.msg,
      status: response.status,
    }
  } catch (error) {
    return {
      message: error.response.data.msg,
      status: error.response.status
    };
  }
};

export { 
  loginUser, 
  registerUser, 
  deregisterUser, 
  changePassword 
};
