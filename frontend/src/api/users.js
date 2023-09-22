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

const isLoggedIn = async () => {
  try {
    await axios.get(baseUrl + "/verifytoken", setAuthenticationHeader());

    return true;
  } catch (e) {
    return false;
  }
};

const changePassword = async (password) => {
  try {
    const headers = setAuthenticationHeader();
    const response = await axios.put(
      baseUrl + "/update/password",
      { 
        newPassword: password,
      },
      headers
    );
  } catch (e) {
    console.log(e);
  }
};
export { loginUser, isLoggedIn, registerUser, deregisterUser, changePassword };
