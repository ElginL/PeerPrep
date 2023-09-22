import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/TempRoomJoiner.module.css";

const TempRoomJoiner = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            return;
        }

        navigate(`/editor/${roomId}`, { state: { username } });
    };

    const handleInputEnter = (e) => {
        if (e.code === "Enter") {
            joinRoom();
        }
    };

    return (
        <div className={styles["homePageWrapper"]}>
            <div className={styles["formWrapper"]}>
                <h4 className={styles["mainLabel"]}>
                    Paste invitation Room ID
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
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className={`${styles["btn"]} ${styles["joinBtn"]}`}
                        onClick={joinRoom}
                    >
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite, then create a &nbsp;{" "}
                        <a
                            onClick={createNewRoom}
                            href="/"
                            className={styles["createNewBtn"]}
                        >
                            new room!
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TempRoomJoiner;
