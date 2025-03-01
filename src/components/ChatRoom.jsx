import { useRef } from "react";
import MessageList from "./MessageList";
import { useState } from "react";
import { useEffect } from "react";

function ChatRoom({ user, messages, onSendMessage, connected }) {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newMessage.trim() && connected) {
        onSendMessage(newMessage);
        setNewMessage('');
      }
    };
  
    return (
      <div className="chat-container">
        <header className="chat-header">
          <h2>Chat Room</h2>
          <div className="user-info">
            <span className="status-indicator" data-status={connected ? 'online' : 'offline'}></span>
            <span>{user.username}</span>
          </div>
        </header>
        
        <MessageList messages={messages} currentUser={user} />
        <div ref={messagesEndRef} />
  
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!connected}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!connected || !newMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
  
  export default ChatRoom;