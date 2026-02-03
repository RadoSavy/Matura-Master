import React from 'react';
import { Link } from 'react-router-dom';

const Bulgarian = () => {
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
          <div className="section-title">Български език</div>
          <h1 className="unit-title">Български език</h1>
        </div>

        <div className="quick-questions-container">
          <div className="quick-questions">
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Какво е правопис?
            </div>
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Как се образуват сложни думи?
            </div>
            <div className="quick-question">
              <i className="fas fa-question-circle"></i>
              Какво е пунктуация?
            </div>
          </div>
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

export default Bulgarian;
