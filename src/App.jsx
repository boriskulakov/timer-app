import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { Clock } from './components/Clock';

function App() {
  return (
    <div className="App">
      <div className="device">
        <Clock />
      </div>
      <div className="device">
        <h2>Секундомер</h2>
        <Stopwatch />
      </div>
      <div className="device">
        <h2>Таймер</h2>
        <Timer />
      </div>
    </div>
  );
}

export default App;
