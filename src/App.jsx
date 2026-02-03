import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Baiganio from './pages/Baiganio';
import Bulgarian from './pages/Bulgarian';
import Texts from './pages/Texts';
import Literature from './pages/Literature';
import Login from './pages/Login';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/baiganio" element={<Baiganio />} />
        <Route path="/bulgarian" element={<Bulgarian />} />
        <Route path="/texts" element={<Texts />} />
        <Route path="/literature" element={<Literature />} />
      </Routes>
    </Router>
  );
}

export default App;
