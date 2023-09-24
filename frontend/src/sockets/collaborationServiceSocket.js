import socketIOClient from "socket.io-client";

const collaborationServiceURL = "http://localhost:3004";

export const createSocketConnection = (token) => {
    console.log("client side", token);
    const socket = socketIOClient(collaborationServiceURL, {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
        query: { token }
    });

    return socket;
};
