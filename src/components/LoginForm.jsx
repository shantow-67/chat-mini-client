// components/LoginForm.jsx
import { useState } from 'react';

function LoginForm({ onLogin, connected }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Simple Chat App</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={!connected || !username.trim()}
          >
            {connected ? 'Join Chat' : 'Connecting...'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;