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