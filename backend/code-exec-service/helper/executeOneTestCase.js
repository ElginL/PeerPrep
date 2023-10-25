const axios = require('axios');
const { languageToIdMap } = require('./languageToIdMap');
const { attachPrintReturnValue } = require('./attachPrintTemplates');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const executeOneTestCase = async (code, language, inputArgs) => {
    try {
        const content = {
            'language_id': languageToIdMap[language],
            'source_code': Buffer.from(attachPrintReturnValue(language, code, inputArgs)).toString('base64'),
        };

        const tokenResponse = await axios.post(process.env.CODE_EXECUTION_URL + "/submissions", content, {
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
            },
            params: {
                base64_encoded: true,
                fields: '*'
            }
        });

        const submissionToken = tokenResponse.data.token;
        let submissionResponse;

        let retryCount = 0;
        while (retryCount <= 10) {
            await sleep(1000);
            submissionResponse = await axios.get(process.env.CODE_EXECUTION_URL + `/submissions/${submissionToken}`, {
                headers: {
                    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
                },
                params: {
                    fields: '*'
                }
            });

            if (submissionResponse.data.status.description !== 'In Queue' && submissionResponse.data.status.description !== 'Processing') {
                break;
            }

            retryCount += 1;
        }

        if (retryCount === 10) {
            return {
                isSuccess: false,
                data: "Timeout, service is overloaded. Try again later"
            };
        }

        if (submissionResponse.data.status.description === 'Compilation Error') {
            throw new Error("Code cannot be compiled due to syntax error: " + submissionResponse.data.compile_output);
        }

        return {
            isSuccess: true,
            data: submissionResponse.data
        };

    } catch (error) {
        // console.error("Error executing code:", error);
        return {
            isSuccess: false,
            data: error.message
        };
    }
};

module.exports = {
    executeOneTestCase
}