import React, { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../api/actions";
import styles from '../styles/components/Editor.module.css';
import { getRoomById } from "../api/collaboration";
import { fetchQuestionById } from "../api/questions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);

    const [defaultCode, setDefaultCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function init() {
            if (!document.getElementById("realtimeEditor")) {
                return;
            }

            editorRef.current = Codemirror.fromTextArea(
                document.getElementById("realtimeEditor"),
                {
                    mode: { name: "python", json: true },
                    theme: "dracula",
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on("change", (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== "setValue") {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }

        if (!isLoading) {
            init();
        }
    }, [isLoading]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const room = await getRoomById(roomId);
                if (!room) {
                    return;
                }

                const question = await fetchQuestionById(room.questionId);
                if (question && question.codeTemplate) {
                    setDefaultCode(question.codeTemplate);
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching question:", error);
                setIsLoading(false);
            }
        };

        fetchQuestion();
    }, [roomId]);

    if (isLoading) {
        return (
            <div className={styles["container"]}>
                Loading...
            </div>
        )
    }

    return (
        <div className={styles["container"]}>
            <textarea id="realtimeEditor" defaultValue={defaultCode} />
        </div>
    );
};

export default Editor;
