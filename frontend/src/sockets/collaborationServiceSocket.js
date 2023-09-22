import { io } from "socket.io-client";

const matchingServiceURL = "http://localhost:3004";

let socket;

export const createSocketConnection = () => {
    socket = io(matchingServiceURL, {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
    });

    return socket;
};
