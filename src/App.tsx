import React, { useState, useEffect } from 'react';
import './App.css';

import useFdc3 from './hooks';

type W = Window &
  typeof globalThis & {
    fdc3: any;
  };

function App() {
  const [counter, setCounter] = useState(0);
  const [channel, setChannel] = useState<any>();

  const fdc3 = useFdc3();

  useEffect(() => {
    fdc3?.getOrCreateChannel('myChannel').then((fdc3Channel: any) => {
      setChannel(fdc3Channel);
    })
  },[fdc3])

  useEffect(() => {
    if (fdc3) {
      const listener = fdc3.addIntentListener('ViewContact', async (context: any) => {
        console.log('context', context);
        setCounter(context.id.count);
      });

      return () => listener.unsubscribe();
    }
  },[fdc3])

  const handleSendClick = () => {
    channel.broadcast({
      type: 'fdc3.contact',
      id: { count: counter }
    });
  }; 

  const handleCounterClick = () => {
    setCounter((prev) => prev+1)
  }


  return (
    <div className="App">
      <h1>mars</h1>
      <p>counter value: {counter}</p>
      <button onClick={handleCounterClick}>increase</button>
      <button onClick={handleSendClick}>send</button>
    </div>
  );
}

export default App;
