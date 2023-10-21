import axios from 'axios';

const baseUrl = 'http://localhost:2358';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Modifies code in editor to have code that calls and prints the result of the function (python)
const attachPythonPrintReturnValue = (pythonCode, inputArgs) => {
    const pythonFunctionSignature = /^def [a-zA-Z_]\w*\([^)]*\):\n/;

    if (!pythonFunctionSignature.test(pythonCode)) {
        throw new Error("Missing Method Signature, or you have not made any changes to the code");
    }

    const methodName = pythonCode.substring(pythonCode.indexOf(" ") + 1, pythonCode.indexOf("("));

    return pythonCode + '\n' + 'print(' + methodName + '(' + inputArgs + '))';
}

const attachJsPrintReturnValue = (jsCode, inputArgs) => {
    const functionSignature = /function\s+([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{/;
    
    const match = jsCode.match(functionSignature);
    
    if (!jsCode.match(functionSignature)) {
        throw new Error("Missing function signature, or you have not made any changes to the code");
    }

    const methodName = match[1];
    const returnValue = `${methodName}(${inputArgs})`;

    return jsCode + '\n' + `console.log(${returnValue});`;
}

const attachRubyPrintReturnValue = (rubyCode, inputArgs) => {
    const methodSignature = /^def [a-zA-Z_]\w*\([^)]*\)\n/;

    const match = rubyCode.match(methodSignature);

    if (!match) {
        throw new Error("Missing method signature, or you have not made any changes to the code");
    }

    const methodName = rubyCode.substring(rubyCode.indexOf(" ") + 1, rubyCode.indexOf("("))
    const returnValue = `${methodName}(${inputArgs})`;

    return rubyCode + '\n' + `p ${returnValue}`;
}

const languageToIdMap = {
    'python': '71',
    'javascript': '63',
    'text/x-ruby': '72'
};

const attachPrintReturnValue = (language, code, inputArgs) => {
    return language === 'python'
        ? attachPythonPrintReturnValue(code, inputArgs)
        : language === 'javascript'
        ? attachJsPrintReturnValue(code, inputArgs)
        : language === 'text/x-ruby'
        ? attachRubyPrintReturnValue(code, inputArgs)
        : null;
};

// Executes function in editor
const executeCode = async (code, language, inputArgs) => {
    try {
        const content = {
            'language_id': languageToIdMap[language],
            'source_code': attachPrintReturnValue(language, code, inputArgs)
        };

        console.log(content.source_code);

        const tokenResponse = await axios.post(baseUrl + "/submissions", content);
        const submissionToken = tokenResponse.data.token;
        let submissionResponse;

        let retryCount = 0;
        while (retryCount <= 10) {
            submissionResponse = await axios.get(baseUrl + `/submissions/${submissionToken}`);

            if (submissionResponse.data.status.description !== 'In Queue' && submissionResponse.data.status.description !== 'Processing') {
                break;
            }

            await sleep(1000);
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
        console.error("Error executing code:", error);
        return {
            isSuccess: false,
            data: error.message
        };
    }
};

const runAllTestCases = async (code, language, allInputs, allExpectedOutputs) => {
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

        const result = await executeCode(code, language, stringifiedArgs.substring(0, stringifiedArgs.length - 1));

        if (!result.isSuccess) {
            return {
                status: 'Runtime Error',
                message: result.data
            }
        }
        
        if (result.data.status.description.startsWith('Runtime Error')) {
            console.log('runtime error');

            // halt all test cases the moment there is a runtime error.
            return {
                status: 'Runtime Error',
                message: result.data.stderr
            }
        }

        if (result.data.status.description.startsWith('Time Limit Exceeded')) {
            console.log("TLE");

            return {
                status: "Time Limit Exceeded",
                message: "Code took too long to run"
            }
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
                console.log("test case passed");

                allTestCaseResults.push({ status: 'Passed', message: result.data.stdout }); 
            } else {
                console.log("test case failed");

                allTestCaseResults.push({ status: 'Failed', message: result.data.stdout });
            }

            continue;
        }

        console.log('something terrible happened, not supposed to reach here');
        console.log(result);
    }

    return allTestCaseResults;
};

export {
    runAllTestCases
};