import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { 
    secondsState, 
    timerRunningState, 
    queueComplexityState, 
    buttonsDisabledState, 
    matchFoundModalVisibleState 
} from '../recoil/TimeManagerAtom';
import { connectMatchingSocket, socket } from '../sockets/matchingServiceSocket';
import RetryModal from '../components/RetryModal';
import MatchFoundModal from '../components/MatchFoundModal';

const maxQueueTime = 10;

const TimerManager = () => {
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const setSeconds = useRecoilState(secondsState)[1];
    const [timerRunning, setTimerRunning] = useRecoilState(timerRunningState);
    const [matchFoundModalVisible, setMatchFoundModalVisible] = useRecoilState(matchFoundModalVisibleState);
    const [queueComplexity, setQueueComplexity] = useRecoilState(queueComplexityState);
    const [buttonsDisabled, setButtonsDisabled] = useRecoilState(buttonsDisabledState);
    const [retryModalVisible, setRetryModalVisible] = useState(false);

    const matchFoundHandler = matchedUsername => {
        setButtonsDisabled(false);
        setTimerRunning(false);
        setSeconds(maxQueueTime);

        setMatchFoundModalVisible(true);

        console.log("matched with: ", matchedUsername);
    }

    const noMatchFoundHandler = () => {
        setTimerRunning(false);
        setSeconds(maxQueueTime);
        setButtonsDisabled(false);
        
        setRetryModalVisible(true);
        socket.disconnect();
    }

    const retryButtonHandler = () => {        
        if (buttonsDisabled) {
            return;
        }
        
        setTimerRunning(true);
        setQueueComplexity(queueComplexity);

        connectMatchingSocket(queueComplexity, JSON.parse(localStorage.getItem('credentials')).sessionToken, matchFoundHandler);
        setButtonsDisabled(true);
    };

    useEffect(() => {
        if (timerRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
            
            timeoutRef.current = setTimeout(() => noMatchFoundHandler(), maxQueueTime * 1000);
        } else {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [timerRunning])

  return (
    <div>
        <RetryModal 
            isVisible={retryModalVisible} 
            setIsVisible={setRetryModalVisible}
            queueComplexity={queueComplexity}
            retryButtonHandler={retryButtonHandler}
        />
        <MatchFoundModal
            isVisible={matchFoundModalVisible}
            setIsVisible={setMatchFoundModalVisible}
        />
    </div>
  );
};

export default TimerManager;
