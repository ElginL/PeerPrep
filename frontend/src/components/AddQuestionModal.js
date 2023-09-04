import styles from '../styles/components/AddQuestionModal.module.css';

const AddQuestionModal = ({ isVisible, setIsVisible }) => {
    const containerStyle = isVisible ? "container-visible" : "container-not-visible";

    return (
        <div className={styles[containerStyle]} onClick={() => setIsVisible(false)}>
            <div className={styles["form-container"]} onClick={e => e.stopPropagation()}>
                <h2>Add Question</h2>
                <form className={styles["form"]}>
                    <div className={styles["input-container"]}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" placeholder="New Title" name="title" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="category">Category:</label>
                        <input type="text" placeholder="Category (e.g. Binary Search)" name="category" />
                    </div>
                    <div className={styles["input-container"]}>
                        <label htmlFor="complexity">Complexity:</label>
                        <select name="complexity">
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                </form>
            </div>
        </div>
    )
};

export default AddQuestionModal;