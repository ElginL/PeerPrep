import { useState, useEffect } from 'react';
import { executeCode } from '../api/codeExecutor';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from '../styles/components/CodeExecutor.module.css';
import { getRoomById } from '../api/collaboration';
import { fetchQuestionById } from '../api/questions';
import TestCase from './TestCase';

const CodeExecutor = ({ code, roomId }) => {
    const [resultsVisible, setResultsVisible] = useState(false);
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [selectedTestCase, setSelectedTestCase] = useState(0);
    const [testCaseSelected, setTestCaseSelected] = useState(true);

    const executeCodeHandler = async () => {
        const res = await executeCode(code, 'Python');
        console.log(res);
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
            <div className={styles["results-bar"]} style={{ display: resultsVisible ? 'block' : 'none' }}>
                <div className={styles["toggle-btns"]}>
                    <button 
                        className={styles["test-case-btn"]} 
                        style={{ color: testCaseSelected ? 'rgb(209, 203, 203)' : 'white'}}
                        onClick={() => setTestCaseSelected(true)}
                    >
                        Testcase
                    </button>
                    <button 
                        className={styles["result-btn"]} 
                        style={{ color: testCaseSelected ? 'white' : 'rgb(209, 203, 203)'}}
                        onClick={() => setTestCaseSelected(false)}
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
                                Case {index}
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
                                    showExpected={testCaseSelected}
                                    expected={outputs[index]}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
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