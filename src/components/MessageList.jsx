// // components/MessageList.jsx
// import Message from './Message';

// function MessageList({ messages, currentUser }) {
//   return (
//     <div className="message-list">
//       {messages.length === 0 ? (
//         <div className="empty-state">
//           <p>No messages yet. Start the conversation!</p>
//         </div>
//       ) : (
//         messages.map((msg, index) => (
//           <Message 
//             key={index} 
//             message={msg} 
//             isOwnMessage={msg.sender === currentUser.username}
//           />
//         ))
//       )}
//     </div>
//   );
// }

// export default MessageList;

// components/MessageList.jsx
import { useEffect, useRef } from 'react';
import Message from './Message';

function MessageList({ messages, currentUser }) {
  const messageListRef = useRef(null);

  // Automatically scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]); // Trigger effect when `messages` changes

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Message 
            key={index} 
            message={msg} 
            isOwnMessage={msg.sender === currentUser.username}
          />
        ))
      )}
    </div>
  );
}

export default MessageList;