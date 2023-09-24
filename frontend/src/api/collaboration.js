import axios from "axios";

const baseUrl = "http://localhost:3004";

const setAuthenticationHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("credentials")).sessionToken
      }`,
    },
  };
};

const createRoom = (roomId, username) => {
  const newRoom = {
    roomId,
    username,
  };

  return axios
    .post(baseUrl, newRoom, setAuthenticationHeader())
    .then((response) => ({
      message: response.data.msg,
      status: response.status,
    }))
    .catch((error) => ({
      message: error.response.data.msg,
      status: error.response.status,
    }));
};

export { 
    createRoom
};
