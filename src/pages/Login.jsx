import React, { useState } from 'react';
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
} from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/bulgarian');
    } catch (err) {
      setError('Грешка при вход с Google');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/bulgarian');
    } catch (err) {
      setError('Грешка при вход с имейл и парола');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? 'Регистрация' : 'Вход'}
        </h2>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isRegister ? 'Регистрирай се' : 'Влез'}
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Вход с Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? 'Вече имаш акаунт?' : 'Нямаш акаунт?'}{' '}
          <button
            onClick={() => {
              setError('');
              setIsRegister(!isRegister);
            }}
            className="text-blue-600 hover:underline"
          >
            {isRegister ? 'Влез' : 'Регистрирай се'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
