const attachPythonPrintReturnValue = (pythonCode, inputArgs) => {
    const pythonFunctionSignature = /^class [a-zA-Z_]\w*\(object\):\n\s*def [a-zA-Z_]\w*\(self, [^)]*\):\n/;

    if (!pythonFunctionSignature.test(pythonCode)) {
        throw new Error("Missing Method Signature, or you have not made any changes to the code");
    }

    const methodNameMatch = pythonCode.match(/^class [a-zA-Z_]\w*\(object\):\n\s*def ([a-zA-Z_]\w*)\(self, [^)]*\):/);
    if (!methodNameMatch) {
        throw new Error("Failed to extract method name");
    }

    const methodName = methodNameMatch[1];

    console.log(pythonCode + '\n' + `solution = Solution()\nprint(solution.${methodName}(${inputArgs}))`)

    return pythonCode + '\n' + `solution = Solution()\nprint(solution.${methodName}(${inputArgs}))`;
};


const attachJsPrintReturnValue = (jsCode, inputArgs) => {
    const functionSignature = /\/\*\*[^]*?@return\s+\{(\w+)\}\s*\*\/\s*var\s+([a-zA-Z_]\w*)\s*=\s*function\([^)]*\)\s*{/;

    const match = jsCode.match(functionSignature);

    if (!match) {
        throw new Error("Missing or incorrectly formatted function signature");
    }

    const returnType = match[1];
    const methodName = match[2];
    const returnValue = `${methodName}(${inputArgs})`;

    console.log(jsCode + '\n' + `console.log(${returnValue});`)

    return jsCode + '\n' + `console.log(${returnValue});`;
};

const attachRubyPrintReturnValue = (rubyCode, inputArgs) => {
    const methodSignature = /^def [a-zA-Z_]\w*\([^)]*\)\n/;

    const match = rubyCode.match(methodSignature);

    if (!match) {
        throw new Error("Missing method signature, or you have not made any changes to the code");
    }

    const methodName = rubyCode.substring(rubyCode.indexOf(" ") + 1, rubyCode.indexOf("("))
    const returnValue = `${methodName}(${inputArgs})`;

    return rubyCode + '\n' + `p ${returnValue}`;
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

module.exports = {
    attachPrintReturnValue
};