const publishMessage = require('../publish');
const waitingListRepo = require('../db/repositories/waitingListRepo');
const consumeSingleMessage = require('../consume');

const addToQueue = (req, res, next) => {
    publishMessage("Easy", "Elgin");
    res.json({
        "Message": "ello"
    });
};

const consumeFromQueue = async (req, res, next) => {
    consumeSingleMessage();
};

const attemptMatch = async (req, res, next) => {
    const { queueType } = req.body;

    try {
        const otherUser = await consumeMessage(queueType);
    
        if (!otherUser) {
            await publishMessage(queueType, req.username);
        } else {
            res.status(200).json({ message: "Match found!", otherUser });
        }
    
        res.json(queueType);
    } catch (e) {
        next(e);
    }
};

const saveSocketId = (req, res, next) => {
    const { socketId } = req.body;

    waitingListRepo.addUsernameAndSocketId(req.user, socketId);
}

module.exports = {
    addToQueue,
    attemptMatch,
    saveSocketId,
    consumeFromQueue
};