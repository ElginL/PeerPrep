import React, { useState, useEffect, useRef } from "react";
import ACTIONS from "../api/actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { createSocketConnection } from "../sockets/collaborationServiceSocket";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import styles from "../styles/pages/Room.module.css";
import RoomQuestion from "../components/RoomQuestion";
import CodeExecutor from '../components/CodeExecutor';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';

const Room = () => {
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [question, setQuestion] = useState({});

    useEffect(() => {
        const init = async () => {
            const token = JSON.parse(localStorage.getItem('credentials')).sessionToken;

            socketRef.current = createSocketConnection(token, roomId);
            socketRef.current.on("connect_error", (err) => handleErrors(err));
            socketRef.current.on("connect_failed", (err) => handleErrors(err));

            function handleErrors(e) {
                console.log("socket error", e);
                alert("Unauthorized");
                reactNavigator("/");
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId
            });

            socketRef.current.on(
                ACTIONS.JOIN_FAILED,
                () => {
                    alert("Full capacity reached");
                    reactNavigator('/');
                }
            );

            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    console.log(`${username} joined the room.`);

                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );

            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    console.log(`${username} left the room.`);
                    setClients((prevClients) =>
                        prevClients.filter(
                            (client) => client.socketId !== socketId
                        )
                    );
                }
            );

            socketRef.current.on('disconnect', () => {
                console.log('Collaboration WebSocket disconnected');
                socketRef.current.close();
            });
        };

        if (socketRef.current === null) {
            init();
        }
    }, []);

    useEffect(() => {
        const fetchQuestion = async () => {
            const room = await getRoomById(roomId);
            if (!room) {
                return;
            }

            const question = await fetchQuestionById(room.questionId);
            setQuestion(question);
        };

        fetchQuestion();
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            console.log("Room ID copied to clipboard!");
        } catch (error) {
            console.log("Failed to copy room ID to clipboard!");
            console.log(error);
        }
    }

    function leaveRoom() {
        reactNavigator("/");
        socketRef.current.disconnect();
    }

    return (
        <div className={styles["container"]}>
            <nav className={styles["header"]}>
                <div className={styles["clients-list"]}>
                    {clients.map((client) => (
                        <Client
                            key={client.socketId}
                            username={client.username}
                        />
                    ))}
                </div>
                <div className={styles["btn-group"]}>
                    <button
                        className={`${styles["btn"]} ${styles["copy-btn"]}`}
                        onClick={copyRoomId}
                    >
                        Copy Room ID
                    </button>
                    <button
                        className={`${styles["btn"]} ${styles["leave-btn"]}`}
                        onClick={leaveRoom}
                    >
                        Leave Room
                    </button>
                </div>
            </nav>
            <div className={styles["main-wrap"]}>
                <div className={styles["left-column"]}>
                    <RoomQuestion question={question} />
                </div>
                <div className={styles["right-column"]}>
                    <Editor
                        socketRef={socketRef}
                        roomId={roomId}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                        codeTemplate={question.codeTemplate}
                    />
                    <CodeExecutor 
                        codeRef={codeRef}
                        question={question}
                    />
                </div>
            </div>
        </div>
    );
};

export default Room;
