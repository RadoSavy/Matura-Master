import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import { getLiteraryWorks } from '../services/firebase';

const Texts = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getLiteraryWorks();
        if (mounted) setWorks(data);
      } catch (err) {
        console.error('Failed to load literary works', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          <div className="logo-icon">MM</div>
          <span>Matura Master</span>
        </Link>
        <div className="header-actions">
          <button className="header-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
          <button className="header-btn">
            <i className="fas fa-gem"></i>
          </button>
          <button className="profile-btn">И</button>
        </div>
      </header>

      <nav className="desktop-nav">
        <Link to="/courses" className="desktop-nav-item">
          <i className="fas fa-book desktop-nav-icon"></i>
          <span>Предмети</span>
        </Link>
        <Link to="/baiganio" className="desktop-nav-item">
          <i className="fas fa-robot desktop-nav-icon"></i>
          <span>BAI Ганьо</span>
        </Link>
        <Link to="/texts" className="desktop-nav-item active">
          <i className="fas fa-book-reader desktop-nav-icon"></i>
          <span>Произведения</span>
        </Link>
        <Link to="/profile" className="desktop-nav-item">
          <i className="fas fa-user desktop-nav-icon"></i>
          <span>Профил</span>
        </Link>
        <Link to="/login" className="desktop-nav-item">
          <i className="fas fa-sign-out-alt desktop-nav-icon"></i>
          <span>Изход</span>
        </Link>
      </nav>

      <main>
        <div className="section-header">
          <div className="section-title">Произведения</div>
          <h1 className="unit-title">Литературни текстове</h1>
        </div>

        <div className="course-content">
          {loading ? (
            <p>Зареждане...</p>
          ) : works.length === 0 ? (
            <p>Няма налични произведения.</p>
          ) : (
            <div className="works-grid">
              {works.map((w) => (
                <div key={w.id} className="work-card">
                  <h3>{w.title || w.name}</h3>
                  <p className="work-author">{w.author || w.creator}</p>
                  <p className="work-desc">{w.description || w.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <nav className="mobile-nav">
        <Link to="/courses" className="nav-item">
          <i className="fas fa-book nav-icon"></i>
          <span>Предмети</span>
        </Link>
        <Link to="/baiganio" className="nav-item">
          <i className="fas fa-robot nav-icon"></i>
          <span>BAI Ганьо</span>
        </Link>
        <Link to="/texts" className="nav-item active">
          <i className="fas fa-book-reader nav-icon"></i>
          <span>Текстове</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <i className="fas fa-user nav-icon"></i>
          <span>Профил</span>
        </Link>
      </nav>
    </div>
  );
};

export default Texts;
