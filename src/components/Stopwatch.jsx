import '../styles/stopwatch.css';
import '../styles/devices.css';

import { useState } from 'react';
import { Time } from './Time';
import { TimeList } from './TimeList';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { MdRestartAlt } from 'react-icons/md';
import { BiTimer } from 'react-icons/bi';

export function Stopwatch() {
  const timePattern = { ms: 0, second: 0, minute: 0, hour: 0 };
  const timepointPattern = {
    current: { ...timePattern },
    diff: {},
  };
  const [time, setTime] = useState({ ...timePattern });
  const [timepoints, setTimepoints] = useState([{ ...timepointPattern }]);
  const [started, setStarted] = useState(false);
  const [activeIntervalId, setActiveIntervalId] = useState();

  const timerHandler = () => {
    setStarted((prev) => !prev);
    clearInterval(activeIntervalId);
    setActiveIntervalId(started || setInterval(increaseTime, 10));
  };

  const resetHandler = () => {
    setTime({ ...timePattern });
    setTimepoints([{ ...timepointPattern }]);
  };

  const timepointHandler = () => {
    let diff = subtractTime({ ...time }, timepoints.at(-1).current);
    setTimepoints((prev) => [...prev, { current: { ...time }, diff: diff }]);
  };

  const subtractTime = (currentTime, pastTime) => {
    let minus = 0;
    let diff = {};
    let maxValue = { ms: 100, second: 60, minute: 60, hour: 24 };
    for (const key in currentTime) {
      diff[key] = currentTime[key] - pastTime[key] + minus;
      if (currentTime[key] < pastTime[key]) diff[key] += maxValue[key];
      minus = currentTime[key] >= pastTime[key] ? 0 : -1;
    }

    return diff;
  };
  
  const increaseTime = () => {
    setTime((prev) => {
      return {
        ms: ++prev.ms % 100,
        second: prev.ms === 100 ? ++prev.second % 60 : prev.second,
        minute: prev.second === 60 ? ++prev.minute % 60 : prev.minute,
        hour: prev.minute === 60 ? ++prev.hour : prev.hour,
      };
    });
  };

  return (
    <>
      <div className="stopwatch">
        <Time time={time} />
        <div className="buttons">
          <button onClick={timerHandler}>
            {started ? <BsPauseCircle /> : <BsPlayCircle />}
          </button>
          <button onClick={timepointHandler}>
            <BiTimer />
          </button>
          <button onClick={resetHandler}>
            <MdRestartAlt />
          </button>
        </div>
      </div>
      {timepoints.length > 1 && <TimeList timepoints={timepoints} />}
    </>
  );
}
