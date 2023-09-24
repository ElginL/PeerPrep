import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/TempRoomJoiner.module.css";

const RoomJoiner = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    const joinRoomHandler = () => {
        navigate(`/editor/${roomId}`)
    }

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoomHandler();
        }
    };

    return (
        <div className={styles["homePageWrapper"]}>
            <div className={styles["formWrapper"]}>
                <h4 className={styles["mainLabel"]}>
                    Join Room
                </h4>
                <div className={styles["inputGroup"]}>
                    <input
                        className={styles["inputBox"]}
                        type="text"
                        placeholder="Room ID (Ask from your friend)"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className={`${styles["btn"]} ${styles["joinBtn"]}`}
                        onClick={joinRoomHandler}
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomJoiner;
