import styles from '../styles/components/MatchFoundModal.module.css';

const MatchFoundModal = ({ 
    isVisible, 
    setIsVisible,
}) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    return (
        <div className={styles[containerStyle]}>
            <div className={styles["main-container"]}>
                <h1>Match Found</h1>
                <p>Redirecting to room...</p>
            </div>
        </div>
    )
};

export default MatchFoundModal;