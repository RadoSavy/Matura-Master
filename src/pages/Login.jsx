import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '../services/firebase';

const Login = () => {
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user info');
        const userInfo = await res.json();
        console.log('User info:', userInfo);

        await loginWithGoogle(tokenResponse.access_token);

        window.location.href = '/courses.html';
      } catch (err) {
        console.error('Login failed:', err);
        alert('Възникна грешка при входа с Google.');
      }
    },
    onError: () => alert("Грешка при входа с Google."),
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        onClick={() => login()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow"
      >
        Вход с Google
      </button>
    </div>
  );
};

export default Login;