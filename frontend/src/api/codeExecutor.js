import axios from 'axios';

const baseUrl = 'http://localhost:2358';

const languageToIdMap = {
    'Python': '71',
    'JavaScript': '63',
    'Java': '62'
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const executeCode = async (code, language) => {
    const content = {
        'language_id': languageToIdMap[language],
        'source_code': code
    };

    try {
        const tokenResponse = await axios.post(baseUrl + "/submissions", content);
        const submissionToken = tokenResponse.data.token;
        
        let retryCount = 0;
        while (retryCount <= 10) {
            const submissionResponse = await axios.get(baseUrl + `/submissions/${submissionToken}`);

            if (submissionResponse.data.status.description === 'Accepted') {
                return {
                    success: true,
                    data: submissionResponse.data
                };
            }

            await sleep(1000);
            retryCount += 1;
        }

        return {
            success: false,
            error: "Timeout, in queue for too long. Try again later"
        };
    } catch (error) {
        console.error("Error executing code:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

export {
    executeCode
};