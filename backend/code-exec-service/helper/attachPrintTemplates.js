const attachPythonPrintReturnValue = (pythonCode, inputArgs) => {
    const pythonFunctionSignature = /^def [a-zA-Z_]\w*\([^)]*\):\n/;

    if (!pythonFunctionSignature.test(pythonCode)) {
        throw new Error("Missing Method Signature, or you have not made any changes to the code");
    }

    const methodName = pythonCode.substring(pythonCode.indexOf(" ") + 1, pythonCode.indexOf("("));

    return pythonCode + '\n' + 'print(' + methodName + '(' + inputArgs + '))';
};

const attachJsPrintReturnValue = (jsCode, inputArgs) => {
    const functionSignature = /function\s+([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{/;
    
    const match = jsCode.match(functionSignature);
    
    if (!jsCode.match(functionSignature)) {
        throw new Error("Missing function signature, or you have not made any changes to the code");
    }

    const methodName = match[1];
    const returnValue = `${methodName}(${inputArgs})`;

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