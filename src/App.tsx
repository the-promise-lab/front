import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useHealthCheck } from './hooks/api/useHealthCheck';

function App() {
  const [count, setCount] = useState(0);
  const { data, isLoading, error } = useHealthCheck();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <h3>서버 상태: </h3>
        {isLoading && <p className="text-amber-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && <p className="text-green-500">{data.status}</p>}
      </div>
    </>
  );
}

export default App;
