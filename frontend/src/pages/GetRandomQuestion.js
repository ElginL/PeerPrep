import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';

const GetRandomQuestion = ({ roomId }) => {
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
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.description) }} />
        </div>
    );
};

export default GetRandomQuestion;