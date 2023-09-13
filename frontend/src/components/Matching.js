import { useState } from 'react';
import styles from '../styles/components/Matching.module.css';
import connectMatchingSocket from '../sockets/matchingServiceSocket';

const Matching = () => {
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const matchFoundHandler = matchedUsername => {
        setButtonsDisabled(false);

        console.log("matched with: ", matchedUsername);
    }

    const clickHandler = queueComplexity => {
        if (buttonsDisabled) {
            return;
        }

        setButtonsDisabled(true);
        connectMatchingSocket(queueComplexity, localStorage.getItem('sessionToken'), matchFoundHandler);
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
        </div>
    );
};

export default Matching;