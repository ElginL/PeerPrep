import styles from '../styles/components/DeregisterAccount.module.css';
import { deregisterUser } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../recoil/UserAtom';

const DeregisterAccount = () => {
    const navigate = useNavigate();
    const setIsLoggedIn = useRecoilState(isLoggedInState)[1];

    const deregisterBtnHandler = async () => {
        const res = await deregisterUser();
        
        if (res.status === 200) {
            setIsLoggedIn(false);
            navigate("/")
            localStorage.removeItem('credentials');
        }
    }

    return (
        <div>
            <h2 className={styles["delete-header"]}>Delete Account</h2>
            <hr />
            <p>Warning: Account cannot be recovered!</p>
            <button className={styles["deregister-btn"]} onClick={deregisterBtnHandler}>
                Deregister
            </button>
        </div>
    );
};

export default DeregisterAccount;