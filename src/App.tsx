import React, { useState, useEffect } from 'react';
import Styles from './App.module.css';

import useFdc3 from './hooks';

type USER = {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  birthdate: Date;
  registeredAt: Date;
  isFavorite: boolean;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [channel, setChannel] = useState<any>();
  const [users, setUsers] = useState<USER[]>([]);

  const fdc3 = useFdc3();

  useEffect(() => {
    fdc3?.getOrCreateChannel('myChannel').then((fdc3Channel: any) => {
      setChannel(fdc3Channel);
    })
  },[fdc3])

  useEffect(() => {
    const counterListener = channel?.addContextListener('counter', (context: any) => {
      setCounter(context.id.count);
    });
    const favoriteListener = channel?.addContextListener('favorite', (context: any) => {
      setUsers(context.id.users);
    });

    return () => {
      counterListener?.unsubscribe();
      favoriteListener?.unsubscribe();
    }
  },[channel]);

  const handleSendClick = () => {
    channel.broadcast({
      type: 'counter',
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
      <div>
        <h2>favorite list</h2>
        <ul className={Styles.list}>
          {users.map((user) => {
            return (
              <li key={user.userId} className={Styles.listItem}>
                <img className={Styles.avatar} src={user.avatar} alt="" />
                <div className={Styles.info}>
                  <p className={Styles.username}>name: {user.username}</p>
                  <p className={Styles.email}>email: {user.email}</p>
                </div>
              </li>
            )
          })}
      </ul>
      </div>
    </div>
  );
}

export default App;
