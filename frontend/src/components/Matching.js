import styles from '../styles/components/Matching.module.css';
import { connectMatchingSocket } from '../sockets/matchingServiceSocket';
import { useRecoilState } from 'recoil';
import { 
    secondsState, 
    timerRunningState, 
    matchFoundModalVisibleState,
    queueComplexityState,
    buttonsDisabledState
} from '../recoil/TimeManagerAtom';

const maxQueueTime = 10;

const Matching = () => {
    const [buttonsDisabled, setButtonsDisabled] = useRecoilState(buttonsDisabledState);
    const [queueComplexity, setQueueComplexity] = useRecoilState(queueComplexityState);
    const [seconds, setSeconds] = useRecoilState(secondsState);
    const [timerRunning, setTimerRunning] = useRecoilState(timerRunningState);
    const setMatchFoundModalVisible = useRecoilState(matchFoundModalVisibleState)[1];

    const matchFoundHandler = matchedUsername => {
        setButtonsDisabled(false);
        setTimerRunning(false);
        setSeconds(maxQueueTime);

        setMatchFoundModalVisible(true);

        console.log("matched with: ", matchedUsername);
    }

    const clickHandler = queueComplexity => {
        if (buttonsDisabled) {
            return;
        }
        
        setTimerRunning(true);
        setQueueComplexity(queueComplexity);

        connectMatchingSocket(queueComplexity, JSON.parse(localStorage.getItem('credentials')).sessionToken, matchFoundHandler);
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
        </div>
    );
};

export default Matching;