import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Baiganio from './pages/Baiganio';
import Bulgarian from './pages/Bulgarian';
import Texts from './pages/Texts';
import Literature from './pages/Literature';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - require authentication */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        } />
        <Route path="/baiganio" element={
          <ProtectedRoute>
            <Baiganio />
          </ProtectedRoute>
        } />
        <Route path="/bulgarian" element={
          <ProtectedRoute>
            <Bulgarian />
          </ProtectedRoute>
        } />
        <Route path="/texts" element={
          <ProtectedRoute>
            <Texts />
          </ProtectedRoute>
        } />
        <Route path="/literature" element={
          <ProtectedRoute>
            <Literature />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
