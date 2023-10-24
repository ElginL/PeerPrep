import React, { useState, useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/ruby/ruby";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../api/actions";
import styles from "../styles/components/Editor.module.css";

const Editor = ({
    socketRef,
    roomId,
    onCodeChange,
    codeTemplate,
    language,
    setLanguage,
}) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setOption("mode", {
                name: language,
                json: true,
            });
        }
    }, [language]);

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

        init();
    }, []);

    useEffect(() => {
        if (codeTemplate) {
            if (editorRef.current.getValue() !== '') {
                return;
            }

            editorRef.current.setValue(codeTemplate);
        }
    }, [codeTemplate]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
            socketRef.current.on(ACTIONS.CHANGE_LANGUAGE, ({ language }) => {
                if (language !== null) {
                    editorRef.current.setOption("mode", {
                        name: language,
                        json: true,
                    });
                    setLanguage(language);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
            socketRef.current.off(ACTIONS.CHANGE_LANGUAGE);
        };
    }, [socketRef.current]);

    return (
        <div className={styles["container"]}>
            <textarea id="realtimeEditor" />
        </div>
    );
};

export default Editor;
