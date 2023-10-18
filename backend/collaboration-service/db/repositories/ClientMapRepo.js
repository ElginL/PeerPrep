const ClientMap = require("../models/ClientMap");

const addEntry = (socketId, username) => {
    ClientMap.create({
        socketId,
        username,
    });
};

const getBySocketId = async (socketId) => {
    const clientMapping = await ClientMap.findByPk(socketId);
    if (clientMapping == null) {
        return null;
    }
    console.log("FOUND USERNAME");
    console.log(clientMapping.username);
    return clientMapping;
};

const deleteBySocketId = async (socketId) => {
    try {
        const clientMapping = await getBySocketId(socketId);

        if (clientMapping == null) {
            return false;
        }

        await clientMapping.destroy();

        return true;
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    addEntry,
    getBySocketId,
    deleteBySocketId,
};
