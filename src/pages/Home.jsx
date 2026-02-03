import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  return (
    <div>
      <header className="main-header">
        <div className="logo">
          <div className="logo-icon">MM</div>
          <span>Matura Master</span>
        </div>
        <div className="header-actions">
          <Link to="/login" className="login-btn" role="button">Вход / Регистрация</Link>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-card">
            <h1 className="hero-title">Добре дошли в Matura Master</h1>
            <p className="hero-text">Вашият интерактивен помощник за Националното Външно Оценяване по Български език и Литература след 7 клас</p>
            <Link to="/login" className="btn btn-hero" role="button">Започни сега</Link>
          </div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-chalkboard-teacher feature-icon"></i>
              <h3 className="feature-title">Интерактивни уроци</h3>
              <p className="feature-desc">Учи чрез игровизирани упражнения и нива, точно като в любимите ти образователни приложения.</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-robot feature-icon"></i>
              <h3 className="feature-title">BAI Ганьо</h3>
              <p className="feature-desc">Нашият AI асистент ще ти помогне с твоите въпроси по български език и литература.</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-chart-line feature-icon"></i>
              <h3 className="feature-title">Персонализиран прогрес</h3>
              <p className="feature-desc">Следи напредъка си и получавай препоръки за подобряване на знанията си.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
