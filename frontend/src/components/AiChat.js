import React, { useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import styles from "../styles/components/AiChat.module.css";

function AiChat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    // ... your mock chat history remains unchanged
  ]);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isAwaitingReply, setIsAwaitingReply] = useState(false);

  const handleChat = async () => {
    try {
      const userMessage = { role: "user", content: message };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);
      setMessage("");
      setIsAwaitingReply(true);

      const response = await axios.post("http://localhost:3006/chatgpt", {
        messages: chatHistory.concat(userMessage),
      });

      setIsAwaitingReply(false);
      const systemReply = {
        role: "system",
        content: response.data.reply.content,
      };
      setChatHistory((prevHistory) => [...prevHistory, systemReply]);
    } catch (error) {
      console.error(error);
      setIsAwaitingReply(false);
    }
  };

  const toggleChatVisibility = () => {
    setChatVisible((prev) => !prev);
  };

  if (!isChatVisible) {
    return <button onClick={toggleChatVisibility}>Open Chat</button>;
  }

  return (
    <div className={styles.overlay}>
      <Draggable>
        <div className={styles["chat-container"]}>
          <div className={styles.header}>
            <span className={styles.title}>Chat Bot</span>
            <button
              className={styles["close-btn"]}
              onClick={toggleChatVisibility}
            >
              &times;
            </button>
          </div>
          <div>
            {chatHistory.map((msg, index) => (
              <p key={index} className={styles[msg.role]}>
                {msg.role === "user" ? "You: " : "System: "}
                {msg.content}
              </p>
            ))}
            {isAwaitingReply && (
              <p className={styles.system}>System: Please wait...</p>
            )}
          </div>
          <div className={styles["message-input"]}>
            <textarea
              className={styles["textarea-field"]}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <button className={styles["send-btn"]} onClick={handleChat}>
              Send
            </button>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default AiChat;
