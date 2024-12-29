import { useState } from 'react';
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const [isOn, setIsOn] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter</h1>
        <h2 data-testid="counter">{counter}</h2>
        <div className="button-row">
          <button
            data-testid="minus-button"
            onClick={() => setCounter(counter - 1)}
            disabled={!isOn}
          >-</button>
          <button
            data-testid="plus-button"
            onClick={() => setCounter(counter + 1)}
            disabled={!isOn}
          >+</button>
        </div>
        <div className="switch-container">
          <button
            data-testid="on/off-button"
            onClick={() => setIsOn(!isOn)}
            style={{ backgroundColor: isOn ? 'blue' : 'red' }}
          >
            on/off
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
