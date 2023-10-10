import styles from '../styles/components/TestCase.module.css';

const TestCase = ({ 
    input, 
    isVisible,
    testCaseResult, 
    showExpected, 
    expected 
}) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div>
            {
                Object.entries(input).map(([key, value]) => (
                    <div key={key}>
                        <p>
                            {key}= 
                        </p>
                        <div className={styles["arg-value"]}>
                            {value}
                        </div>
                    </div>
                ))
            }

            {
                showExpected && (
                    <div>
                        <p>
                            Output=
                        </p>
                        <div className={styles["arg-value"]}>
                            { testCaseResult ? testCaseResult.message : "No output values yet..."}
                        </div>
                        <p>
                            Expected=
                        </p>
                        <div className={styles["arg-value"]}>
                            {expected}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TestCase;