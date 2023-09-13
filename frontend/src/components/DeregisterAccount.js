import styles from '../styles/components/DeregisterAccount.module.css';
import { deregisterUser } from '../api/users';
import { useNavigate } from 'react-router-dom';

const DeregisterAccount = () => {
    const navigate = useNavigate();
    
    const deregisterBtnHandler = async () => {
        const res = await deregisterUser();
        
        if (res.status === 200) {
            localStorage.removeItem('sessionToken');
            navigate("/");
            window.location.reload();
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