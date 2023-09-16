import { useEffect } from 'react';
import styles from '../styles/components/RetryModal.module.css';

const RetryModal = ({ 
    isVisible, 
    setIsVisible,
    queueComplexity,
    retryButtonHandler
}) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    const clickHandler = () => {
        retryButtonHandler(queueComplexity);
        setIsVisible(false);
    }

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
    }, [isVisible]);

    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["main-container"]} onClick={e => e.stopPropagation()}>
                <div className={styles["text-container"]}>
                    <h1>Timed Out</h1>
                    <p>There is too less people in the {queueComplexity} queue...</p>
                </div>
                <div className={styles["button-group"]}>
                    <button className={styles["retry-btn"]} onClick={clickHandler}>
                        Retry
                    </button>
                    <button className={styles["cancel-btn"]} onClick={() => setIsVisible(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
};

export default RetryModal;