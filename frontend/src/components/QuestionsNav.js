import styles from '../styles/components/QuestionsNav.module.css';
import { fetchAllQuestions } from "../api/questions";

const QuestionsNav = ({ setQuestions }) => {
    const allBtnHandler = async () => {
        setQuestions(await fetchAllQuestions());
    };

    const complexityBtnHandler = async (complexity) => {
        const questions = await fetchAllQuestions();
        setQuestions(questions.filter(question => question.complexity === complexity));
    };

    return (
        <nav className={styles["container"]}>
            <ul className={styles["left-buttons-container"]}>
                <li>
                    <button onClick={allBtnHandler}>All</button>
                </li>
                <li>
                    <button onClick={async () => complexityBtnHandler("Easy")}>
                        Easy
                    </button>
                </li>
                <li>
                    <button onClick={() => complexityBtnHandler("Medium")}>
                        Medium
                    </button>
                </li>
                <li>
                    <button onClick={() => complexityBtnHandler("Hard")}>
                        Hard
                    </button>
                </li>
            </ul>
            <ul className={styles["right-buttons-container"]}>
                <li>
                    <button>Add</button>
                </li>
                <li>
                    <button>Delete</button>
                </li>
            </ul>
        </nav>
    );
};

export default QuestionsNav;