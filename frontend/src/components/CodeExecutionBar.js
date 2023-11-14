import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from '../styles/components/CodeExecutionBar.module.css';
import LoadingButton from '@mui/lab/LoadingButton';

const CodeExecutionBar = ({ resultsVisible, setResultsVisible, executeCodeHandler }) => {
    return (
        <div className={styles["execution-bar"]}>
            <p className={styles["results-btn"]} onClick={() => setResultsVisible(!resultsVisible)}>
                <span>Console</span>
                {
                    resultsVisible
                        ? <KeyboardArrowDownIcon />
                        : <KeyboardArrowUpIcon />
                }
            </p>
            <button className={styles["run-btn"]} onClick={executeCodeHandler}>
                Run
            </button>
        </div>
    );
};

export default CodeExecutionBar