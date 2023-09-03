import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const fetchAllQuestions = async () => {
    try {
        const questions = await axios.get(baseUrl)

        return questions.data;

    } catch (error) {
        console.error("Error when trying to fetch all questions: ", error);
    }
};

const fetchQuestionById = async (id) => {
    try {
        const question = await axios.get(baseUrl + `/questions/${id}`);

        return question.data;
    } catch (error) {
        console.error("Error when trying to fetch question by id: ", error);
    }
};

export {
    fetchAllQuestions,
    fetchQuestionById
};