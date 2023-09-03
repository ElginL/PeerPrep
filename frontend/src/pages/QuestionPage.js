import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestionById } from '../api/questions';
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
    });

    return (
        <div>
            <Navbar />
            {question.title}
        </div>
    );
};

export default QuestionPage;