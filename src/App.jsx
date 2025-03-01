// App.jsx
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3000');

    // Socket event listeners
    socketRef.current.on('connect', () => {
      setConnected(true);
      console.log('Connected to server');
    });

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on('user-joined', (username) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'system', text: `${username} joined the chat`, timestamp: new Date() }
      ]);
    });

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleLogin = (username) => {
    if (username.trim() && socketRef.current) {
      setUser({ username });
      socketRef.current.emit('join', username);
    }
  };

  const handleSendMessage = (text) => {
    if (text.trim() && user && socketRef.current) {
      const message = {
        type: 'user',
        sender: user.username,
        text,
        timestamp: new Date()
      };
      socketRef.current.emit('message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <div className="app-container">
      {!user ? (
        <LoginForm onLogin={handleLogin} connected={connected} />
      ) : (
        <ChatRoom 
          user={user} 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          connected={connected}
        />
      )}
    </div>
  );
}

export default App;