import {Time}  from './Time';

export function TimeList({ timepoints }) {
  let timelist = timepoints.slice(1);
  return (
    <div className="timeList">
      <div className="timepoint title">
        <span>#</span>
        <div>Время круга</div>
        <div>Общее время</div>
      </div>

      <div className="timepoints">
        {timelist
          .map((time, index) => (
            <div key={index} className="timepoint">
              <span className="timepointIndex">{index + 1}</span>
              <Time time={time.diff} />
              <Time time={time.current} />
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
}
