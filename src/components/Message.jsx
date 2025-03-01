
// components/Message.jsx
function Message({ message, isOwnMessage }) {
    if (message.type === 'system') {
      return <div className="system-message">{message.text}</div>;
    }
  
    return (
      <div className={`message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
        <div className="message-sender">{message.sender}</div>
        <div className="message-bubble">
          <p>{message.text}</p>
          <span className="message-time">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  }
  
  export default Message;