import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const fetchAllQuestions = async () => {
    try {
        const questions = await axios.get(baseUrl)

        return questions.data;

    } catch (error) {
        console.error("Error when trying to fetch all questions: ", error);
    }
}

export {
    fetchAllQuestions
};