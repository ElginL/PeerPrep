import { useState, useEffect } from 'react';
import { runAllTestCases } from '../api/codeExecutor';
import styles from '../styles/components/CodeExecutor.module.css';
import TestCase from './TestCase';
import CodeExecutionBar from './CodeExecutionBar';
import RunTimeErrorResult from './RunTimeErrorResult';
import CodeExecutionNavigator from './CodeExecutionNavigator';
import TestCaseNavigator from './TestCaseNavigator';
import ACTIONS from '../api/actions';
import AllPassModal from './AllPassModal';

const CodeExecutor = ({ 
    socketRef,
    roomId,
    codeRef,
    question, 
    language 
}) => {
    const [resultsVisible, setResultsVisible] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [selectedTestCase, setSelectedTestCase] = useState(0);
    const [testCaseBtnSelected, setTestCaseBtnSelected] = useState(true);
    const [allPassModalVisible, setAllPassModalVisible] = useState(false);

    const [executionResults, setExecutionResults] = useState(null);

    const executeCodeHandler = async () => {
        const result = await runAllTestCases(codeRef.current, language, inputs, outputs);

        if (Array.isArray(result)) {
            const allPassed = result.every(item => item.status === "Passed");
            if (allPassed) {
                setAllPassModalVisible(true);
            }
        }

        setExecutionResults(result);
        setResultsVisible(true);
        setTestCaseBtnSelected(false);

        socketRef.current.emit(ACTIONS.EXECUTE_CODE, {
            roomId,
            result
        });
    };

    useEffect(() => {
        if (question && question.testCases) {
            setInputs(question.testCases.map(obj => obj.input));
            setOutputs(question.testCases.map(obj => obj.output));
        }
    }, [question]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.EXECUTE_CODE, ({ result }) => {
                if (Array.isArray(result)) {
                    const allPassed = result.every(item => item.status === "Passed");
                    if (allPassed) {
                        setAllPassModalVisible(true);
                    }
                }
                
                setExecutionResults(result);
                setResultsVisible(true);
                setTestCaseBtnSelected(false);
            });
        }
    }, [socketRef.current]);

    return (
        <div className={styles["container"]}>
            {
                executionResults && (executionResults.status === 'Runtime Error' || executionResults.status === 'Time Limit Exceeded')
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
            <AllPassModal
                isVisible={allPassModalVisible}
                closeHandler={() => setAllPassModalVisible(false)}
            />
        </div>
    );
};

export default CodeExecutor;