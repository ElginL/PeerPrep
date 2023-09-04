import { useEffect, useState } from 'react';
import QuestionsNav from "./QuestionsNav";
import { Link } from 'react-router-dom';
import { fetchAllQuestions } from "../api/questions";
import styles from '../styles/components/Questions.module.css';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [addFormVisible, setAddFormVisible] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            const res = await fetchAllQuestions();
            setQuestions(res);
        };

        getQuestions();
    }, [addFormVisible]);

    return (
        <div className={styles["container"]}>
            <QuestionsNav
                addFormVisible={addFormVisible}
                setAddFormVisible={setAddFormVisible}
                setQuestions={setQuestions} 
            />
            <hr className={styles["horizontal-line"]} />
            <table className={styles["questions-table"]}>
                <thead>
                    <tr>
                        <th className={styles["id-column"]}>
                            Id
                        </th>
                        <th className={styles["title-column"]}>
                            Title
                        </th>
                        <th className={styles["category-column"]}>
                            Category
                        </th>
                        <th className={styles["complexity-column"]}>
                            Complexity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions && questions.map(question => (
                            <tr key={question.id}>
                                <td className={styles["id-column"]}>
                                    {question.id}
                                </td>
                                <td className={styles["title-column"]}>
                                    <Link to={`/questions/${question.id}`} className={styles["question-link"]}>
                                        {question.title}
                                    </Link>
                                </td>
                                <td className={styles["category-column"]}>
                                    {question.category}
                                </td>
                                <td className={styles["complexity-column"]}>
                                    <span className={complexityColorStyles[question.complexity]}>
                                        {question.complexity}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

const complexityColorStyles = {
    "Easy": styles["easy-complexity"],
    "Medium": styles["medium-complexity"],
    "Hard": styles["hard-complexity"]
};

export default Questions;