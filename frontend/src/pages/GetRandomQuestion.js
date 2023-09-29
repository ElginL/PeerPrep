import { useEffect, useState } from 'react';
import { getRandomQuestion } from '../api/questions';
import styles from '../styles/pages/QuestionPage.module.css';
import Navbar from '../components/Navbar';
import DOMPurify from 'dompurify';

const GetRandomQuestion = () => {
    const [question, setQuestion] = useState({});

    useEffect(() => {
        const fetchQuestion = async () => {
            const res = await getRandomQuestion();

            setQuestion(res);
        };

        fetchQuestion();
    }, []);

    return (
        <div>
            <h1>{question.title}</h1>
            <h3>{question.complexity}</h3>
            <h3>{question.category}</h3>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.description) }} />
        </div>
    );
};

export default GetRandomQuestion;