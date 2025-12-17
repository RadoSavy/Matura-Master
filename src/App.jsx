import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './app.css';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('Not signed in');
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  useEffect(() => {
    if (user) {
      setStatus('Signed in as ' + user.name);
      startRedirectCountdown();
    }
  }, [user]);

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Login success:', decoded);
      setUser(decoded);
    } catch (err) {
      console.error('JWT decode error:', err);
      setStatus('Failed to decode token.');
    }
  };

  const handleLoginFailure = () => {
    console.warn('Login failed');
    setStatus('Login failed');
  };

  const startRedirectCountdown = () => {
    let seconds = 5;
    setRedirectCountdown(seconds);

    const interval = setInterval(() => {
      seconds--;
      setRedirectCountdown(seconds);
      if (seconds === 0) {
        clearInterval(interval);
        window.location.href = '/courses.html';
      }
    }, 1000);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setStatus('Logged out');
    setRedirectCountdown(null);
  };

  return (
    <div className="App">
      <h1>Google Login Example</h1>

      <p>Status: {status}</p>

      {!user && (
        <div>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      )}

      {user && (
        <div>
          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: '50%', width: '100px' }}
          />
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {redirectCountdown !== null && (
        <p>Redirecting in {redirectCountdown} seconds...</p>
      )}
    </div>
  );
}
export default App;
