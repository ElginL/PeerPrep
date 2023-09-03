import { useState } from 'react';
import styles from '../styles/components/QuestionsNav.module.css';
import { fetchAllQuestions } from "../api/questions";
import AddQuestionModal from './AddQuestionModal';

const QuestionsNav = ({ setQuestions }) => {
    const [isVisible, setIsVisible] = useState(false);

    const allBtnHandler = async () => {
        setQuestions(await fetchAllQuestions());
    };

    const complexityBtnHandler = async (complexity) => {
        const questions = await fetchAllQuestions();
        setQuestions(questions.filter(question => question.complexity === complexity));
    };

    return (
        <div>
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
                        <button onClick={() => setIsVisible(true)}>Add</button>
                    </li>
                    <li>
                        <button>Delete</button>
                    </li>
                </ul>
            </nav>
            <AddQuestionModal isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
    );
};

export default QuestionsNav;