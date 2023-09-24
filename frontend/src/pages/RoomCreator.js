import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/pages/TempRoomJoiner.module.css";
import { createRoom } from "../api/collaboration";

const RoomCreator = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
    };

    const createRoomHandler = () => {
        if (!roomId || !username) {
            return;
        }

        createRoom(roomId, username)
            .then(() => navigate(`/editor/${roomId}`));
    };

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            createRoomHandler();
        }
    };

    return (
        <div className={styles["homePageWrapper"]}>
            <div className={styles["formWrapper"]}>
                <h4 className={styles["mainLabel"]}>
                    Create Room
                </h4>
                <div className={styles["inputGroup"]}>
                    <input
                        className={styles["inputBox"]}
                        type="text"
                        placeholder="Room ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        className={styles["inputBox"]}
                        type="text"
                        placeholder="Your Friend's Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className={`${styles["btn"]} ${styles["joinBtn"]}`}
                        onClick={createRoomHandler}
                    >
                        Create
                    </button>
                    <span className={styles["createInfo"]}>
                        <a
                            onClick={createNewRoom}
                            href="/"
                            className={styles["createNewBtn"]}
                        >
                            Generate a secure room id
                        </a>
                        <Link to="/joinRoom" className={styles["join-room-btn"]}>
                            Join a room
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RoomCreator;
