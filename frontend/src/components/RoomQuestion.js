import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';
import styles from '../styles/components/GetRandomQuestion.module.css';

const RoomQuestion = ({ roomId }) => {
    const [question, setQuestion] = useState({ title: '', complexity: '', category: '' });

    useEffect(() => {
        const fetchQuestion = async () => {
            const room = await getRoomById(roomId);
            if (!room) {
                return;
            }

            const question = await fetchQuestionById(room.questionId);
            setQuestion(question);
        };

        fetchQuestion();
    }, []);

    return (
        <div>
            <h1>{question.title}</h1>
            <h3>{question.complexity}</h3>
            <h3>{question.category}</h3>
            <div 
                className={styles["content"]}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.description) }} 
            />
        </div>
    );
};

export default RoomQuestion;