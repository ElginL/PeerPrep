import { useState, useEffect } from 'react';
import RetryModal from './RetryModal';
import MatchFoundModal from './MatchFoundModal';
import styles from '../styles/components/Matching.module.css';
import { connectMatchingSocket, socket } from '../sockets/matchingServiceSocket';

const maxQueueTime = 10;

const Matching = () => {
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [queueComplexity, setQueueComplexity] = useState("");
    const [seconds, setSeconds] = useState(maxQueueTime);
    const [timerRunning, setTimerRunning] = useState(false);
    const [retryModalVisible, setRetryModalVisible] = useState(false);
    const [matchFoundModalVisible, setMatchFoundModalVisible] = useState(false);

    const noMatchFoundHandler = (disconnectSocket) => {
        setTimerRunning(false);
        setSeconds(maxQueueTime);
        setButtonsDisabled(false);
        
        if (disconnectSocket) {
            setRetryModalVisible(true);
            socket.disconnect();
        }
    }

    useEffect(() => {
        let interval;
        if (timerRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        noMatchFoundHandler(true);
                        clearInterval(interval);
                    }

                    return prevSeconds - 1
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [timerRunning])

    const matchFoundHandler = matchedUsername => {
        setButtonsDisabled(false);
        noMatchFoundHandler(false);

        setMatchFoundModalVisible(true);

        console.log("matched with: ", matchedUsername);
    }

    const clickHandler = queueComplexity => {
        if (buttonsDisabled) {
            return;
        }
        
        setTimerRunning(true);
        setQueueComplexity(queueComplexity);

        connectMatchingSocket(queueComplexity, localStorage.getItem('sessionToken'), matchFoundHandler);
        setButtonsDisabled(true);
    };

    return (
        <div className={styles["container"]}>
            <h3 className={styles["header"]}>Match with another user</h3>
            <div className={styles["button-group"]}>
                <button className={styles["easy-btn"]} onClick={() => clickHandler("Easy")} disabled={buttonsDisabled}>
                    Queue Easy
                </button>
                <button className={styles["medium-btn"]} onClick={() => clickHandler("Medium")} disabled={buttonsDisabled}>
                    Queue Medium
                </button>
                <button className={styles["hard-btn"]} onClick={() => clickHandler("Hard")} disabled={buttonsDisabled}>
                    Queue Hard
                </button>
            </div>
            {
                timerRunning && (
                    <div className={styles["timer-container"]}>
                        <p>Finding {queueComplexity} match...</p>
                        <p className={styles["seconds"]}>{seconds} seconds remaining</p>
                    </div>
                )
            }
            <RetryModal 
                isVisible={retryModalVisible} 
                setIsVisible={setRetryModalVisible}
                queueComplexity={queueComplexity}
                retryButtonHandler={clickHandler}
            />
            <MatchFoundModal
                isVisible={matchFoundModalVisible}
                setIsVisible={setMatchFoundModalVisible}
            />
        </div>
    );
};

export default Matching;