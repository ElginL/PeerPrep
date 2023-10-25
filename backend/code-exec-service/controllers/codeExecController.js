const { executeOneTestCase } = require('../helper/executeOneTestCase'); 

const runAllTestCases = async (req, res, next) => {
    const { code, language, allInputs, allExpectedOutputs } = req.body;

    const allTestCaseResults = [];
    
    for (let i = 0; i < allInputs.length; i += 1) {
        const input = allInputs[i];
        const args = Object.values(input);

        let stringifiedArgs = ""
        for (const arg of args) {
            if (Array.isArray(arg)) {
                stringifiedArgs += JSON.stringify(arg);
            } else if (typeof arg === 'string') {
                stringifiedArgs += `'${arg}'`;
            } else {
                stringifiedArgs += arg;
            }

            stringifiedArgs += ","
        }

        const result = await executeOneTestCase(code, language, stringifiedArgs.substring(0, stringifiedArgs.length - 1));

        if (!result.isSuccess) {
            // test case fails because of server error
            return res.status(500).json({
                status: 'Runtime Error',
                message: result.data
            });
        }
        
        if (result.data.status.description.startsWith('Runtime Error')) {
            // test case fails because of code error
            return res.status(400).json({
                status: 'Runtime Error',
                message: result.data.stderr
            })
        }

        if (result.data.status.description.startsWith('Time Limit Exceeded')) {
            return res.status(400).json({
                status: "Time Limit Exceeded",
                message: "Code took too long to run"
            });
        }

        if (result.data.status.description === 'Accepted') {
            let expectedOutput = allExpectedOutputs[i];

            if (Array.isArray(expectedOutput)) {
                expectedOutput = JSON.stringify(expectedOutput);
                result.data.stdout = result.data.stdout.replaceAll(" ", "");
            } else {
                expectedOutput = expectedOutput.toString();
            }

            if (result.data.stdout.trim() === expectedOutput) {
                allTestCaseResults.push({ status: 'Passed', message: result.data.stdout }); 
            } else {
                allTestCaseResults.push({ status: 'Failed', message: result.data.stdout });
            }

            continue;
        }

        return res.status(500).json({
            status: "something terrible happened. not supposed to reach here",
            message: result
        });
    }

    return res.status(200).json({
        status: "All test cases successfully executed",
        results: allTestCaseResults
    });
};

module.exports = {
    runAllTestCases
};