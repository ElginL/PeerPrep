const amqp = require('amqplib/callback_api');
require('dotenv').config();

const publishMessage = (queue, message) => {
    try {
        amqp.connect(process.env.AMQP_URL, (err, connection) => {
            if (err) {
                throw new Error(err);
            }
            connection.createChannel((err, channel) => {
                if (err) {
                    throw new Error(err);
                }

                channel.assertQueue(queue);
                channel.sendToQueue(queue, Buffer.from(message));
                console.log('Message sent: ', message);

                channel.close(() => {
                    connection.close();
                });
            });
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = publishMessage;