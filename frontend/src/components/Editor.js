import React, { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../api/actions";
import styles from "../styles/components/Editor.module.css";

const Editor = ({ socketRef, roomId, onCodeChange, codeTemplate }) => {
    const editorRef = useRef(null);

    const [defaultCode, setDefaultCode] = useState("");
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

            editorRef.current.on("change", (instance, changes) => {
                const language = instance.getMode();
                socketRef.current.emit(ACTIONS.CHANGE_LANGUAGE, {
                    roomId,
                    language,
                });
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
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CHANGE_LANGUAGE, ({ language }) => {
                console.log("change language");
                if (language !== null) {
                    editorRef.current.setOption("mode", {
                        name: language,
                        json: true,
                    });
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CHANGE_LANGUAGE);
        };
    }, [socketRef.current]);

    useEffect(() => {
        if (codeTemplate) {
            setDefaultCode(codeTemplate);
            setIsLoading(false);
        }

        const timeout = setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
            }
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, [codeTemplate]);

    if (isLoading) {
        return <div className={styles["container"]}>Loading...</div>;
    }

    var option = document.getElementById("language-swap");
    option.addEventListener("change", function () {
        // console.log(option.value);
        editorRef.current.setOption("mode", {
            name: option.value,
            json: true,
        });
    });

    return (
        <div className={styles["container"]}>
            <textarea id="realtimeEditor" defaultValue={defaultCode} />
        </div>
    );
};

export default Editor;
