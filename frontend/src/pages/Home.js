import Navbar from "../components/Navbar";
import Questions from "../components/Questions";
import UserProfile from "../components/UserProfile";
import Matching from "../components/Matching";
import styles from "../styles/pages/Home.module.css";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className={styles["container"]}>
                {/* TODO: ADD STATISTICS DISPLAY */}
                <div className={styles["right-container"]}>
                    <Matching />
                    <Questions />
                </div>
            </div>
        </div>
    );
};

export default Home;
