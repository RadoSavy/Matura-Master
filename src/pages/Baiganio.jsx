import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Baiganio = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleQuickQuestion = (question) => {
    setMessages([...messages, { text: question, sender: 'user' }]);
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Това е примерен отговор от BAI Ганьо.', sender: 'bot' }]);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Това е примерен отговор от BAI Ганьо.', sender: 'bot' }]);
      }, 1000);
    }
  };

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
            <span className="notification-badge"></span>
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
        <Link to="/baiganio" className="desktop-nav-item active">
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
          <div className="section-title">AI Асистент</div>
          <h1 className="unit-title">BAI Ганьо</h1>
        </div>

        <div className="quick-questions-container">
          <div className="quick-questions">
            <button className="quick-question" onClick={() => handleQuickQuestion('Какви са видовете частици?')}>Какви са видовете частици?</button>
            <button className="quick-question" onClick={() => handleQuickQuestion('Кои са основните теми в "Под игото"?')}>Кои са основните теми в "Под игото"?</button>
            <button className="quick-question" onClick={() => handleQuickQuestion('Кои са героите в "Немили-недраги"?')}>Кои са героите в "Немили-недраги"?</button>
            <button className="quick-question" onClick={() => handleQuickQuestion('Какви са правилата за правопис на "ъ" и "ь"?')}>Какви са правилата за правопис на "ъ" и "ь"?</button>
          </div>
        </div>

        <div className="chat-container">
          <div id="chat" aria-live="polite" aria-label="Чат с BAI Ганьо">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form id="chat-form" onSubmit={handleSubmit} aria-label="Форма за въвеждане на съобщение">
            <textarea
              id="chat-input"
              rows="2"
              placeholder="Напиши въпрос към BAI Ганьо..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            ></textarea>
            <button type="submit" aria-label="Изпрати съобщение"><i className="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </main>

      <nav className="mobile-nav">
        <Link to="/courses" className="nav-item">
          <i className="fas fa-book nav-icon"></i>
          <span>Предмети</span>
        </Link>
        <Link to="/baiganio" className="nav-item active">
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

export default Baiganio;
