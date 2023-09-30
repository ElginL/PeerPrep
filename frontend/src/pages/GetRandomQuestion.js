import { useEffect, useState } from 'react';
import { getRandomQuestion } from '../api/questions';
import DOMPurify from 'dompurify';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';

const GetRandomQuestion = ({ roomId }) => {
    const [question, setQuestion] = useState({});

    useEffect(() => {
        const fetchQuestion = async () => {
            // const res = await getRandomQuestion();
            
            const room = await getRoomById(roomId);
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