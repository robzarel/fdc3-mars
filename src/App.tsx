import React, { useState, useEffect } from 'react';
import './App.css';
type W = Window &
  typeof globalThis & {
    fdc3: any;
  };

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(()=> {
    const startFdc3 = () => {
      (window as W).fdc3.addIntentListener('ViewContact', async (context: any) => {
        console.log('context', context);
        const count = context.id.count;
        setCounter(count);
      });
    }
    
    if ((window as W).fdc3) {
      startFdc3();
    } else {
      window.addEventListener('fdc3Ready', startFdc3);
    }
    
    return () => {
      window.removeEventListener('fdc3Ready', startFdc3);
    }
  }, []);

  return (
    <div className="App">
      <p>recieved counter value: {counter}</p>
    </div>
  );
}

export default App;
