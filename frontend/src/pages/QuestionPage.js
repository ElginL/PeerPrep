import { useParams } from 'react-router-dom';

const QuestionPage = () => {
    const { id } = useParams();

    return (
        <div>
            This is the question page
        </div>
    );
};

export default QuestionPage;