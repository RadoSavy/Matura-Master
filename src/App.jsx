import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './app.css';

const decoded = jwtDecode(token);

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Not signed in");
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  // Изпълнява се при mount
  useEffect(() => {
    if (user) {
      setStatus("Signed in as " + user.name);
      startRedirectCountdown();
    }
  }, [user]);

  // Функция при успешно логване
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log("Login success:", decoded);
      setUser(decoded);
    } catch (err) {
      console.error("JWT decode error:", err);
      setStatus("Failed to decode token.");
    }
  };

  // Функция при неуспешно логване
  const handleLoginFailure = () => {
    console.warn("Login failed");
    setStatus("Login failed");
  };

  // Пренасочване след успешно логване
  const startRedirectCountdown = () => {
    let seconds = 5;
    setRedirectCountdown(seconds);

    const interval = setInterval(() => {
      seconds--;
      setRedirectCountdown(seconds);
      if (seconds === 0) {
        clearInterval(interval);
        window.location.href = "/courses.html"; // можеш да промениш адреса
      }
    }, 1000);
  };

  // Logout функция
  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setStatus("Logged out");
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
          <img src={user.picture} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {redirectCountdown !== null && (
        <p>Redirecting in {redirectCountdown} seconds...</p>
      )}

      {/* Filler за още редове с полезни компоненти */}
      <ExtraInfo />
    </div>
  );
}
export default App;