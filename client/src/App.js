import logo from './logo.svg';
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
        <p className=''>
          Test message: {testVar}
        </p>
        
      </header>
    </div>
  );
}

export default App;
