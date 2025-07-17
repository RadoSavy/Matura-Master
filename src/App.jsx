import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthChange } from './services/firebase';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Bulgarian from './pages/Bulgarian';
import Literature from './pages/Literature';
import BAIGanio from './components/BAIGanio';

const App = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <div className="flex justify-center items-center min-h-screen">Зареждане...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/main" element={!user ? <Main /> : <Navigate to="/bulgarian" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/bulgarian" replace />} />
        <Route path="/bulgarian" element={user ? <Bulgarian /> : <Navigate to="/login" replace />} />
        <Route path="/literature" element={user ? <Literature /> : <Navigate to="/login" replace />} />
        <Route path="/baiganio" element={user ? <BAIGanio /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to={user ? "/bulgarian" : "/login"} replace />} />
        <Route path="*" element={<div className="p-6 text-center">Страницата не е намерена</div>} />
      </Routes>
    </>
  );
};

export default App;