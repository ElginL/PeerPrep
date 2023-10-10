import { useState, useEffect } from 'react';
import { runAllTestCases } from '../api/codeExecutor';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from '../styles/components/CodeExecutor.module.css';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';
import TestCase from './TestCase';

const CodeExecutor = ({ codeRef, roomId }) => {
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
        const fetchQuestion = async () => {
            const room = await getRoomById(roomId);
            if (!room) {
                return;
            }

            const question = await fetchQuestionById(room.questionId);
            if (question.testCases.length > 0) {
                setInputs(question.testCases.map(obj => obj.input));
                setOutputs(question.testCases.map(obj => obj.output));
            }
        };

        fetchQuestion();
    }, []);

    return (
        <div className={styles["bottom-section"]}>
            {
                executionResults && executionResults.status === 'Runtime Error'
                    ? (
                        <div className={styles["results-bar"]} style={{ display: resultsVisible ? 'block': 'none' }}>
                            <h3 className={styles["runtime-error-header"]}>Runtime Error</h3>
                            <p className={styles["runtime-error-msg"]}>
                                { executionResults.message }
                            </p>
                        </div>
                    ) : (
                        <div className={styles["results-bar"]} style={{ display: resultsVisible ? 'block' : 'none' }}>
                            <div className={styles["toggle-btns"]}>
                                <button
                                    className={styles["test-case-btn"]} 
                                    style={{ color: testCaseBtnSelected ? 'rgb(199, 193, 193)' : 'white'}}
                                    onClick={() => setTestCaseBtnSelected(true)}
                                >
                                    Testcase
                                </button>
                                <button 
                                    className={styles["result-btn"]} 
                                    style={{ color: testCaseBtnSelected ? 'white' : 'rgb(199, 193, 193)'}}
                                    onClick={() => setTestCaseBtnSelected(false)}
                                >
                                    Result
                                </button>
                            </div>
                            <hr />
                            <div className={styles["test-cases-btns"]}>
                                {
                                    inputs.map((_, index) => (
                                        <button
                                            key={index} 
                                            onClick={() => setSelectedTestCase(index)} 
                                            className={selectedTestCase === index ? styles["test-case-selected"] : styles["test-case-unselected"]}
                                        >
                                            <p 
                                                className={styles["case-btn-text"]}
                                                style={{ color: executionResults
                                                    ? executionResults[index].status === 'Passed' ? 'lightgreen' : '#f1635f'
                                                    : 'white'
                                                }}
                                            >
                                                Case {index}
                                            </p>
                                        </button>
                                    ))
                                }
                            </div>
                            <div className={styles["test-cases"]}>
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
            <div className={styles["execution-bar"]}>
                <p className={styles["results-btn"]} onClick={() => setResultsVisible(!resultsVisible)}>
                    <span>Console</span>
                    {
                        resultsVisible
                            ? <KeyboardArrowDownIcon />
                            : <KeyboardArrowUpIcon />
                    }
                </p>
                <div className={styles["btn-group"]}>
                    <button className={styles["run-btn"]} onClick={executeCodeHandler}>
                        Run
                    </button>
                    <button className={styles["submit-btn"]}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeExecutor;