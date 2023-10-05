import { useState } from 'react';
import { executeCode } from '../api/codeExecutor';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from '../styles/components/CodeExecutor.module.css';

const CodeExecutor = ({ code, roomId }) => {
    const [resultsVisible, setResultsVisible] = useState(false);

    const executeCodeHandler = async () => {
        const res = await executeCode(code, 'Python');
        console.log(res);
    };

    return (
        <div className={styles["bottom-section"]}>
            <div className={styles["results-bar"]} style={{ display: resultsVisible ? 'block' : 'none' }}>
                Results will be here
            </div>
            <div className={styles["execution-bar"]}>
                <p className={styles["results-btn"]} onClick={() => setResultsVisible(!resultsVisible)}>
                    <span>Results</span>
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