import React, { useState, useRef } from "react";
import styles from "../styles/components/Video.module.css";
import Draggable from "react-draggable";
function Video() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const modalRef = useRef(null); // New reference for modal

  const handleClick = () => {
    if (buttonRef.current && modalRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      setPosition({
        x: 0,
        y: -100,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={styles["button"]}
      >
        Video<span> ^ </span>
      </button>

      {isOpen && (
        <Draggable position={null} scale={1} defaultPosition={position}>
          <div ref={modalRef} className={styles["video-modal"]}>
            {/* Your chat content here */}
            Chat content...
            <button onClick={handleClick} className={styles["close-button"]}>
              Close
            </button>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Video;
