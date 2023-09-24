import socketIOClient from "socket.io-client";

const collaborationServiceURL = "http://localhost:3004";

export const createSocketConnection = (token, roomId) => {
    const socket = socketIOClient(collaborationServiceURL, {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
        query: { token, roomId }
    });

    return socket;
};
