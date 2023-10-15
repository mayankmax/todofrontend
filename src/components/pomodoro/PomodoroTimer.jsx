import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from "../../hooks/useInterval";
import { Button } from '@mui/material';
import Timer from './Timer'; // Assuming Timer is a MUI component
import { useLocation } from 'react-router-dom';

import startSound from '../../sounds/src_sounds_start-sound.mp3';
import finishSound from '../../sounds/src_sounds_finish-sound.mp3';

const audioStartWorking = new Audio(startSound);
const audioStopWorking = new Audio(finishSound);

function PomodoroTimer() {
  const taskDetails = useLocation().state; // Get the task details that were passed from the TaskCard component

  const [workTime, setWorkTime] = useState(taskDetails.taskDuration * 60);
  const [restTime, setRestTime] = useState(60); // Set rest time to 60 seconds (1 minute)
  const [mainTime, setMainTime] = useState(workTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(workTime);
    audioStartWorking.play();
  }, [setTimeCounting, setWorking, setResting, setMainTime, workTime]);

  const configureRest = useCallback(() => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    setMainTime(restTime);
    audioStopWorking.play();
  }, [setTimeCounting, setWorking, setResting, setMainTime, restTime]);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime <= 0) {
      if (working) configureRest();
      if (resting) configureWork();
      if (!working && !resting) {
        setSuccessMessage('Congratulations! You have completed your pomodoro.');
      }
    }
  }, [working, resting, mainTime, configureRest, configureWork]);

  // Conditional rendering
  if (successMessage) {
    return (
      <div className="pomodoro">
        <h2>{successMessage}</h2>
        <Button onClick={configureWork}>Start next pomodoro</Button>
      </div>
    );
  }

  if (!timeCounting) {
    return (
      <div className="pomodoro">
        <h2>Welcome to the Pomodoro Timer!</h2>
        <p>Please enter your desired work and rest times below.</p>
        <input
          type="number"
          placeholder="Work time (in minutes)"
          value={workTime / 60} // Convert workTime back to minutes for display
          onChange={(e) => setWorkTime(parseInt(e.target.value) * 60)} // Convert input to seconds
        />
        <input
          type="number"
          placeholder="Rest time (in minutes)"
          value={restTime / 60} // Convert restTime back to minutes for display
          onChange={(e) => setRestTime(parseInt(e.target.value) * 60)} // Convert input to seconds
        />
        <Button onClick={configureWork}>Start Pomodoro</Button>
      </div>
    );
  } else if (working) {
    return (
      <div className="pomodoro">
        <h2>You are currently working on {taskDetails.taskName}.</h2>
        <Timer mainTime={mainTime} />
        <Button onClick={() => setTimeCounting(false)}>Pause Pomodoro</Button>
      </div>
    );
  } else if (resting) {
    return (
      <div className="pomodoro">
        <h2>You are currently resting.</h2>
        <Timer mainTime={mainTime} />
        <Button onClick={() => setTimeCounting(false)}>Pause Pomodoro</Button>
      </div>
    );
  } else {
    return (
      <div className="pomodoro">
        <h2>Congratulations! You have completed your pomodoro.</h2>
        <Button onClick={configureWork}>Start the next pomodoro</Button>
      </div>
    );
  }
}

export default PomodoroTimer;
