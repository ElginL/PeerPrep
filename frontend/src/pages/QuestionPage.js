import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../api/questions';
import styles from '../styles/pages/QuestionPage.module.css';
import Navbar from '../components/Navbar';

const QuestionPage = () => {
    const { id } = useParams();

    const [question, setQuestion] = useState({});

    useEffect(() => {
        const fetchQuestion = async (id) => {
            const res = await fetchQuestionById(id);

            setQuestion(res);
        };

        fetchQuestion(id);
    }, []);

    return (
        <div>
            <Navbar />
            <div className={styles["container"]}>
                <h1>{question.id}. {question.title}</h1>
                <h3>{question.complexity}</h3>
                <h3>{question.category}</h3>
                <p>
                    {question.description}
                </p>
            </div>
        </div>
    );
};

export default QuestionPage;