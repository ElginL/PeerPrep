import io from 'socket.io-client';

const matchingServiceURL = 'http://localhost:3003';

const connectMatchingSocket = (queueComplexity, token, matchFoundHandler) => {
    const socket = io(matchingServiceURL, {
        query: { token }
    });

    socket.on('connect', () => {
        console.log('WebSocket connection established');

        socket.emit('joinQueue', queueComplexity);
    });

    socket.on('matchfound', matchedUser => {
        matchFoundHandler(matchedUser);
    });

    socket.on('connect_error', err => {
        console.error('Websocket connection error: ', err);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        socket.close();
    })
};

export default connectMatchingSocket;