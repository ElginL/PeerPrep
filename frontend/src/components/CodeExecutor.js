import { useState, useEffect } from 'react';
import { runAllTestCases } from '../api/codeExecutor';
import styles from '../styles/components/CodeExecutor.module.css';
import TestCase from './TestCase';
import CodeExecutionBar from './CodeExecutionBar';
import RunTimeErrorResult from './RunTimeErrorResult';
import CodeExecutionNavigator from './CodeExecutionNavigator';
import TestCaseNavigator from './TestCaseNavigator';

const CodeExecutor = ({ codeRef, question }) => {
    const [resultsVisible, setResultsVisible] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [selectedTestCase, setSelectedTestCase] = useState(0);
    const [testCaseBtnSelected, setTestCaseBtnSelected] = useState(true);

    const [executionResults, setExecutionResults] = useState(null);

    const executeCodeHandler = async () => {
        const result = await runAllTestCases(codeRef.current, 'Python', inputs, outputs);

        setExecutionResults(result);
        setResultsVisible(true);
    };

    useEffect(() => {
        if (question && question.testCases) {
            setInputs(question.testCases.map(obj => obj.input));
            setOutputs(question.testCases.map(obj => obj.output));
        }
    }, [question]);

    return (
        <div className={styles["container"]}>
            {
                executionResults && executionResults.status === 'Runtime Error'
                    ? (
                        <RunTimeErrorResult 
                            resultsVisible={resultsVisible}
                            executionResults={executionResults}
                        />
                    ) : (
                        <div className={styles["results-bar"]} style={{ display: resultsVisible ? 'block' : 'none' }}>
                            <CodeExecutionNavigator 
                                testCaseBtnSelected={testCaseBtnSelected}
                                setTestCaseBtnSelected={setTestCaseBtnSelected}
                            />
                            <hr />
                            <TestCaseNavigator
                                inputs={inputs}
                                executionResults={executionResults}
                                selectedTestCase={selectedTestCase}
                                setSelectedTestCase={setSelectedTestCase}
                            />
                            <div>
                                {
                                    inputs.map((inputObject, index) => (
                                        <div key={index}>
                                            <TestCase
                                                input={inputObject}
                                                isVisible={selectedTestCase === index}
                                                testCaseResult={executionResults ? executionResults[index] : null}
                                                showExpected={!testCaseBtnSelected}
                                                expected={outputs[index]}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
            <CodeExecutionBar 
                resultsVisible={resultsVisible}
                setResultsVisible={setResultsVisible}
                executeCodeHandler={executeCodeHandler}
            />
        </div>
    );
};

export default CodeExecutor;