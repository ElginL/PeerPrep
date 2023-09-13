const amqp = require('amqplib/callback_api');
require('dotenv').config();

// Define a function to consume a single message from a queue
const consumeSingleMessage = (queue) => {
    amqp.connect(process.env.AMQP_URL, (err, connection) => {
        if (err) {
            console.error("Error connecting:", err);
            return;
        }

        connection.createChannel((err, channel) => {
            if (err) {
                console.error("Error creating channel:", err);
                connection.close();
                return;
            }

            channel.assertQueue(queue);

            // Use channel.get to retrieve a single message
            channel.get(queue, (err, message) => {
                if (err) {
                    console.error("Error retrieving message:", err);
                    channel.close(() => connection.close());
                    return;
                }

                if (!message) {
                    console.log("No messages in the queue");
                } else {
                    const content = message.content.toString();
                    console.log("Received message:", content);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);
                }

                channel.close(() => connection.close());
            });
        });
    });
};

// Usage: Call consumeSingleMessage with the name of the queue
module.exports = consumeSingleMessage;
