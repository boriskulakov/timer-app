import '../styles/timer.css';
import '../styles/devices.css';

import { useEffect, useState } from 'react';
import { Time } from './Time';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { MdRestartAlt } from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';

export function Timer() {
  const timePattern = {
    second: 0,
    minute: 0,
    hour: 0,
    elapse: 0,
    remaining: 0,
  };
  const [time, setTime] = useState({ ...timePattern });
  const [started, setStarted] = useState(false);
  const [activeIntervalId, setActiveIntervalId] = useState();
  const [timeSettingDisplay, setTimeSettingDisplay] = useState(true);

  const timerHandler = () => {
    setTime((prev) => {
      return {
        second: prev.second,
        minute: prev.minute,
        hour: prev.hour,
        elapse: prev.elapse,
        remaining: prev.second + prev.minute * 60 + prev.hour * 3600,
      };
    });
    setStarted((prev) => !prev);
    setTimeSettingDisplay(false);
    clearInterval(activeIntervalId);
    setActiveIntervalId(started || setInterval(decreaseTime, 1000));
  };

  const decreaseTime = () => {
    setTime((prev) => {
      return {
        second:
          prev.remaining % 60 === 0
            ? prev.remaining >= 60
              ? 59
              : 0
            : (prev.remaining % 60) - 1,
        minute: Math.trunc((prev.remaining - 1) / 60) % 60,
        hour: Math.trunc((prev.remaining - 1) / 3600),
        elapse: prev.elapse + 1,
        remaining: prev.remaining - 1,
      };
    });
  };

  const endTimer = () => {
    clearInterval(activeIntervalId);
    setStarted(false);
    setTimeSettingDisplay(true);
  };

  const inputHandler = (e) => {
    setTime((prev) => {
      let { name, value } = e.target;
      return {
        hour: name === 'hour' ? +value : prev.hour,
        minute: name === 'minute' ? +value : prev.minute,
        second: name === 'second' ? +value : prev.second,
        elapse: 0,
        remaining: null,
      };
    });
  };

  const resetHandler = () => {
    setTime({ ...timePattern });
  };

  const settingHandler = () => {
    setStarted(false);
    setTimeSettingDisplay(true);
    clearInterval(activeIntervalId);
  };

  useEffect(() => {
    if (time.remaining === 0 && started) endTimer();
  });

  const calcLocalTime = (remaining) => {
    let time = new Date(Date.now() + remaining * 1000);
    const addZero = (number) => (number < 10 ? '0' + number : number);
    return `${addZero(time.getHours())}:${addZero(time.getMinutes())}:${addZero(
      time.getSeconds()
    )}`;
  };

  return (
    <>
      <div className="timer">
        {timeSettingDisplay ? (
          <div className="settingForm">
            {['hour', 'minute', 'second'].map((el) => (
              <input
                type="text"
                key={el}
                name={el}
                value={time[el] || ''}
                maxLength={2}
                placeholder="00"
                autoComplete="off"
                onChange={inputHandler}
              />
            ))}
          </div>
        ) : (
          <Time time={time} />
        )}

        <div className="timerMessage">
          {time.remaining > 0
            ? started
              ? `Время закончится в ${calcLocalTime(time.remaining)}`
              : 'Таймер приостановлен'
            : time.elapse > 0 && time.remaining === 0 && 'Время вышло'}
        </div>

        <div className="buttons">
          <button onClick={timerHandler}>
            {started ? <BsPauseCircle /> : <BsPlayCircle />}
          </button>
          <button onClick={resetHandler}>
            <MdRestartAlt />
          </button>
          <button onClick={settingHandler}>
            <VscSettings />
          </button>
        </div>
      </div>
    </>
  );
}
