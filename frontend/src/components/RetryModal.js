import styles from '../styles/components/RetryModal.module.css';

const RetryModal = ({ 
    retryModalVisible, 
    setRetryModalVisible,
    queueComplexity,
    retryButtonHandler
}) => {
    const containerStyle = retryModalVisible ? "container-visible" : "container-not-visible";

    return (
        <div className={styles[containerStyle]} onClick={() => setRetryModalVisible(false)}>
            <div className={styles["main-container"]}>
                <div className={styles["text-container"]}>
                    <h1>Timed Out</h1>
                    <p>There is too less people in the {queueComplexity} queue...</p>
                </div>
                <div className={styles["button-group"]}>
                    <button className={styles["retry-btn"]} onClick={() => retryButtonHandler(queueComplexity)}>
                        Retry
                    </button>
                    <button className={styles["cancel-btn"]} onProgress={() => setRetryModalVisible(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
};

export default RetryModal;