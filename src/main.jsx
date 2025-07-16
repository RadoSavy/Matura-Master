import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from './services/firebase';

const Main = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/bulgarian');
    } catch (err) {
      setError('Error logging in with Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-sm w-full bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-6">Login with Google</h2>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Main;
