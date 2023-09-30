import socketIOClient from 'socket.io-client';
import { createRoom } from '../api/collaboration';
import { getRandomQuestion } from '../api/questions';

const matchingServiceURL = 'http://localhost:3003';

let socket;

const createSocketConnection = (token) => {
    socket = socketIOClient(matchingServiceURL, {
        query: { token }
    });
};

const handleSocketEvents = (queueComplexity, matchFoundHandler) => {
    socket.on('connect', () => {
        console.log('WebSocket connection established');

        // Join the queue with the specified complexity
        socket.emit('joinQueue', queueComplexity);
    });

    socket.on('createRoom', async roomId => {
        const randomQuestion = await getRandomQuestion();

        await createRoom(roomId, randomQuestion._id);
    });

    socket.on('matchfound', async roomId => {
        socket.disconnect();
        matchFoundHandler(roomId);
    });

    socket.on('connect_error', (err) => {
        console.error('WebSocket connection error:', err);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        socket.close();
    });
};

export const connectMatchingSocket = (queueComplexity, token, matchFoundHandler) => {
    createSocketConnection(token);
    handleSocketEvents(queueComplexity, matchFoundHandler);
};

export { socket };