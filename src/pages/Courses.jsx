import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Courses = () => {
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
        <Link to="/courses" className="desktop-nav-item active">
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
        <div className="course-list">
          <Link to="/bulgarian" className="course-card" tabIndex="0">
            <img src="/images/Bulgarian.png" alt="Български език" />
            <span>Български език</span>
            <p>Граматика и правопис</p>
          </Link>

          <Link to="/literature" className="course-card" tabIndex="0">
            <img src="/images/Literature.png" alt="Литература" />
            <span>Литература</span>
            <p>Анализи на произведения и автори</p>
          </Link>
        </div>
      </main>

      <nav className="mobile-nav">
        <Link to="/courses" className="nav-item active">
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

export default Courses;
