import axios from "axios";

const baseUrl = process.env.REACT_APP_HISTORY_SERVICE_URL + "/history-service";

const addAnsweredQuestion = (questionId, questionTitle, complexity, username, answeredAt, isSolved) => {
    
    const details = {
        questionId,
        questionTitle,
        complexity,
        username,
        answeredAt,
        isSolved
    }
    return axios
        .post(baseUrl + '/add-answered-question', details)
        .then(response => ({
            message: response.data.msg,
            status: response.status,
        }))
        .catch((error) => ({
            message: error.response.data.msg,
            status: error.response.status,
        }));
};

const fetchAllAnsweredQuestionsByUsername = async (username) => {
    try {
        const finalUrl = baseUrl + `/history/${username}`
        const answeredQuestions = await axios.get(finalUrl);

        return answeredQuestions;
    } catch (error) {
        console.error("Error fetching user history!");
    }
}

export { addAnsweredQuestion, fetchAllAnsweredQuestionsByUsername };