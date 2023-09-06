import styles from "../styles/components/QuestionsNav.module.css";
import { fetchAllQuestions } from "../api/questions";
import AddQuestionModal from "./AddQuestionModal";

const QuestionsNav = ({ addFormVisible, setAddFormVisible, setQuestions }) => {
  const allBtnHandler = async () => {
    setQuestions(await fetchAllQuestions());
  };

  const complexityBtnHandler = async (complexity) => {
    const questions = await fetchAllQuestions();
    setQuestions(
      questions.filter((question) => question.complexity === complexity)
    );
  };

  return (
    <div>
      <nav className={styles["container"]}>
        <ul className={styles["left-buttons-container"]}>
          <li>
            <button className={styles["all-button"]} onClick={allBtnHandler}>
              All
            </button>
          </li>
          <li>
            <button
              className={styles["easy-button"]}
              onClick={async () => complexityBtnHandler("Easy")}
            >
              Easy
            </button>
          </li>
          <li>
            <button
              className={styles["medium-button"]}
              onClick={async () => complexityBtnHandler("Medium")}
            >
              Medium
            </button>
          </li>
          <li>
            <button
              className={styles["hard-button"]}
              onClick={async () => complexityBtnHandler("Hard")}
            >
              Hard
            </button>
          </li>
        </ul>
        <ul className={styles["right-buttons-container"]}>
          <li>
            <button onClick={async () => setAddFormVisible(true)}>Add</button>
          </li>
          <li>
            <button>Delete</button>
          </li>
        </ul>
      </nav>
      <AddQuestionModal
        isVisible={addFormVisible}
        setIsVisible={setAddFormVisible}
      />
    </div>
  );
};

export default QuestionsNav;
