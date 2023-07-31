import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [emailCounter, setEmailCounter] = useState(0);
  const [messages, setMessages] = useState('');
  const sendEmail = () => {
    console.log(emailCounter);
    fetch(`http://localhost:3000/app/send/${emailCounter}`);
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      console.log('incoming message');
      console.log(msg);
      receiveMessage(msg);
    });

    getInitialMessages();
  }, []);

  function getInitialMessages() {
    fetch('http://localhost:3001/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }

  function receiveMessage(msg) {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  }

  // function sendMessage() {
  //   socket.emit('sendMessage', newMessage);
  //   setNewMessage('');
  // }
  console.log('message received');
  console.log(messages);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          type="text"
          onChange={(val) => setEmailCounter(val.target.value)}
        />
        <button onClick={sendEmail}>Send Email</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
