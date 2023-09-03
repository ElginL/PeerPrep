import { useEffect, useState } from 'react';
import QuestionsNav from "./QuestionsNav";
import { fetchAllQuestions } from "../api/questions";
import styles from '../styles/components/Questions.module.css';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const res = await fetchAllQuestions();
            setQuestions(res);
        };

        getQuestions();
    }, []);

    return (
        <div className={styles["container"]}>
            <QuestionsNav 
                setQuestions={setQuestions} 
            />
            <hr className={styles["horizontal-line"]} />
            <table className={styles["questions-table"]}>
                <thead>
                    <tr>
                        <th className={styles["id-column"]}>Id</th>
                        <th className={styles["title-column"]}>Title</th>
                        <th className={styles["category-column"]}>Category</th>
                        <th className={styles["complexity-column"]}>Complexity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions && questions.map(question => (
                            <tr key={question.id}>
                                <td className={styles["id-column"]}>{question.id}</td>
                                <td className={styles["title-column"]}>
                                    
                                    {question.title}
                                </td>
                                <td className={styles["category-column"]}>{question.category}</td>
                                <td className={styles["complexity-column"]}>{question.complexity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Questions;