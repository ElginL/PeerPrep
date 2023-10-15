import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/components/Chat.module.css";
import Draggable from "react-draggable";
import io from "socket.io-client";
function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState("");
  const socketRef = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && buttonRef.current && modalRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      setPosition({
        x: 0,
        y: -modalRect.height - buttonRect.height - 5,
      });
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const [messages, setMessages] = useState([]);
  const roomId = "YOUR_ROOM_ID"; // This should be dynamically set based on your application logic

  useEffect(() => {
    socketRef.current = io("http://localhost:3005"); // Assign socket instance to ref

    socketRef.current.on("connect", () => {
      console.log("Connected to the server.");
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection failed:", error);
    });

    socketRef.current.emit("join", roomId);

    socketRef.current.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.off("connect");
      socketRef.current.off("connect_error");
      socketRef.current.off("receive-message");
      socketRef.current.disconnect();
    };
  }, []);
  const sendMessage = () => {
    if (!currentMessage) return; // Prevent sending empty messages
    const message = {
      type: "sent",
      text: currentMessage,
    };
    socketRef.current.emit("message", { roomId, message });
    setMessages((prevMessages) => [...prevMessages, message]);
    setCurrentMessage("");
  };
  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={styles["button"]}
      >
        Chat <span> ^ </span>
      </button>

      {isOpen && (
        <Draggable position={null} scale={1} defaultPosition={position}>
          <div ref={modalRef} className={styles["chat-modal"]}>
            <div className={styles["button-holder"]}>
              {" "}
              <button onClick={handleClick} className={styles["close-button"]}>
                x
              </button>
            </div>

            {/* Your chat content here */}
            <div className={styles["chat-box"]}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.type === "sent"
                      ? styles["message-sent"]
                      : styles["message-received"]
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className={styles["message-input"]}>
              <input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Chat;
