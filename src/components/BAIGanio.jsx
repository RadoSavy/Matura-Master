import React, { useState, useRef, useEffect } from 'react';

const BAIGanio = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Здравей! Аз съм BAI Ганьо, твоят AI съреволюционер. Как мога да ти помогна днес?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse = generateMockResponse(input.trim());
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  const generateMockResponse = (userText) => {
    const lower = userText.toLowerCase();
    if (lower.includes('правопис')) {
      return 'Правописът е важен! Мога да ти помогна с правила и примери.';
    }
    if (lower.includes('литература')) {
      return 'Обичаш ли българската литература? Мога да ти разкажа за автори и произведения.';
    }
    if (lower.includes('тест')) {
      return 'Искаш ли да направиш тест? Имам много въпроси за теб!';
    }
    if (lower.includes('консултация')) {
      return 'Ако имаш нисък резултат, препоръчвам консултация с учителя.';
    }
    return 'Интересен въпрос! За съжаление, все още се уча. Моля, опитай с друг въпрос.';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">BAI Ганьо - Твоят AI съреволюционер</h2>
      <div
        className="flex-1 overflow-y-auto border border-gray-300 rounded p-4 mb-4 space-y-4"
        style={{ minHeight: '300px' }}
        aria-live="polite"
        aria-label="Чат с BAI Ганьо"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3/4 p-3 rounded-lg ${
              msg.sender === 'user' ? 'bg-green-100 self-end text-right' : 'bg-green-200 self-start'
            }`}
            style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
        aria-label="Форма за въвеждане на съобщение"
      >
        <textarea
          className="flex-1 border border-gray-300 rounded p-2 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напиши въпрос към BAI Ганьо..."
          aria-label="Въведи съобщение"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Изпрати съобщение"
        >
          Изпрати
        </button>
      </form>
    </div>
  );
};

export default BAIGanio;