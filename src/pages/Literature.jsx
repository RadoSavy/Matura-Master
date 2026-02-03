import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLessons } from '../services/firebase';

const Literature = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">
            <div className="logo-icon">MM</div>
            <span>Matura Master</span>
          </Link>
        </div>
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
        <Link to="/texts" className="desktop-nav-item">
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
          <div className="section-title">Литература</div>
          <h1 className="unit-title">Литература</h1>
        </div>

        <div className="quick-questions-container">
          <div className="quick-questions">
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Какво е литература?
            </div>
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Кои са основните литературни жанрове?
            </div>
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Как се анализира литературно произведение?
            </div>
          </div>
        </div>

        <section className="lessons-section">
          <h2>Уроци</h2>
          <LessonsList />
        </section>
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
        <Link to="/texts" className="nav-item">
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

export default Literature;

function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getLessons();
        if (mounted) setLessons(data);
      } catch (err) {
        console.error('Failed to fetch lessons', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return <p>Зареждане уроци...</p>;
  if (!lessons.length) return <p>Няма налични уроци.</p>;

  return (
    <div className="lessons-grid">
      {lessons.map((l) => (
        <article key={l.id} className="lesson-card">
          <h3>{l.title || l.name}</h3>
          <p>{l.summary || l.description}</p>
        </article>
      ))}
    </div>
  );
}
