import styles from '../styles/components/Matching.module.css';

const Matching = () => {
    return (
        <div className={styles["container"]}>
            <h3 className={styles["header"]}>Match with another user</h3>
            <div className={styles["button-group"]}>
                <button className={styles["easy-btn"]}>
                    Queue Easy
                </button>
                <button className={styles["medium-btn"]}>
                    Queue Medium
                </button>
                <button className={styles["hard-btn"]}>
                    Queue Hard
                </button>
            </div>
        </div>
    );
};

export default Matching;