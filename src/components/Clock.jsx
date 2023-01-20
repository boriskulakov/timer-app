import '../styles/clock.css';
import { useState } from 'react';

export function Clock() {
  const [localTime, setLocalTime] = useState(new Date());
  const [intervalId, setIntervalId] = useState();

  if (!intervalId) {
    setTimeout(() => {
      setIntervalId(
        setInterval(() => {
          setLocalTime(new Date());
        }, 1000)
      );
    }, 1000 - localTime.getMilliseconds());
  }

  const addZero = (number) => (number < 10 ? '0' + number : number);

  const timeParse = (date) => {
    const today = [
      addZero(date.getDate()),
      addZero(date.getMonth() + 1),
      date.getFullYear(),
    ];

    const time = [
      addZero(date.getHours()),
      addZero(date.getMinutes()),
      addZero(date.getSeconds()),
    ];

    return { today: today.join('.'), time: time.join(':') };
  };

  return (
    <div className="clock">
      <div className="currentDay">{timeParse(localTime).today}</div>
      <div className="currentTime">{timeParse(localTime).time}</div>
    </div>
  );
}
