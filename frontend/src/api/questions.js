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

const addQuestion = async (title, category, complexity, description) => {
    const questionToAdd = {
        title,
        category,
        complexity,
        description
    };

    try {
        const response = await axios.post(baseUrl, questionToAdd);

        return {
            message: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            message: error.response.data.msg,
            status: error.response.status
        };
    }

};

const deleteQuestionsByIds = async (ids) => {
    try {
        const response = await axios.delete(baseUrl, { 
            data: { ids } 
        });

        return response.data;
    } catch (error) {
        console.error("Error when trying to delete questions by ids: ", error);
    }
}

export {
    fetchAllQuestions,
    fetchQuestionById,
    addQuestion,
    deleteQuestionsByIds
};