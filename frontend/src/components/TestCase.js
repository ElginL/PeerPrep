import styles from '../styles/components/TestCase.module.css';

const TestCase = ({ input, isVisible, showExpected, expected }) => {
    return (
        <div>
            {
                isVisible && (
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
                )
            }

            {
                !showExpected && isVisible && (
                    <div>
                        <p>
                            Output=
                        </p>
                        <div className={styles["arg-value"]}>
                            User output here
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