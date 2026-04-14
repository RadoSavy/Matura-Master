import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        if (!res.ok) throw new Error('Failed to fetch user info');
        const userInfo = await res.json();

        navigate('/courses');
      } catch (err) {
        setError('Грешка при входа с Google. Моля, опитайте отново.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError('Грешка при входа с Google. Моля, проверете връзката си.');
      setIsLoading(false);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <button
        onClick={() => login()}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow disabled:opacity-50"
        aria-label="Вход с Google"
      >
        {isLoading ? 'Зареждане...' : 'Вход с Google'}
      </button>
    </div>
  );
};

export default Login;
