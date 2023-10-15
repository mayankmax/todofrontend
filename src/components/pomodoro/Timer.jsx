import React from 'react';
import { secondsToMinutes } from '../../utils/secondsToMinutes';

function Timer(props) {
  return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}

export default Timer;