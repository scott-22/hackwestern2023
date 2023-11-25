import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [testVar, setTestVar] = useState();

  const fetchTest = useCallback(async () => {
    console.log('works so far');
    let res = await fetch(`http://localhost:3001/`);
    console.log(res);
    res = await res.json();
    console.log(res);
    setTestVar(res.message);
  }, []);

  useEffect(() => {
    console.log('test');
    fetchTest();
  }, [fetchTest]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test message: {testVar}
        </p>
        
      </header>
    </div>
  );
}

export default App;
