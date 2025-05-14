import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Simple Click Counter</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount((count) => count + 1)}>+</button>
      </div>
    </>
  );
}

export default App;
