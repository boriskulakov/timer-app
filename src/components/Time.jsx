export function Time({ time }) {
  const addZero = (number) => {
    if (!number) number = 0;
    return number < 10 ? '0' + number : number;
  };

  return (
    <div className="time">
      {addZero(time.hour)}:{addZero(time.minute)}:{addZero(time.second)}
      {time.ms >= 0 ? `.${addZero(time.ms)}` : null}
    </div>
  );
}
