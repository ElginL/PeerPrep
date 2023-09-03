import styles from '../styles/components/AddQuestionModal.module.css';

const AddQuestionModal = ({ isVisible, setIsVisible }) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["form"]} onClick={e => e.stopPropagation()}>

            </div>
        </div>
    )
};

export default AddQuestionModal;