import type { Message, KnowledgeBase, AIResponse } from './types';

document.addEventListener('DOMContentLoaded', function (): void {
  // DOM Elements with proper typing
  const chat = document.getElementById('chat') as HTMLDivElement;
  const chatForm = document.getElementById('chat-form') as HTMLFormElement;
  const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement;
  const quickQuestions = document.querySelectorAll('.quick-question') as NodeListOf<HTMLButtonElement>;

  // Knowledge base with proper typing
  const knowledgeBase: KnowledgeBase = {
    "частици": {
        answer: "Частиците в българския език са:\n1. Отрицателни (не, ни)\n2. Възклицателни (ех, ох, ах)\n3. Утвърдителни (да, ами)\n4. Съединителни (и, а, но, че)\n5. Въпросителни (ли, дали, защо)",
        examples: ["Не искам да отида.", "Ех, колко хубаво!", "Ще дойдеш ли утре?"]
    },
    "правопис на не и ни": {
        answer: "Правопис на 'не' и 'ни':\n- 'Не' се пише отделно с глаголи: не искам, не чета\n- 'Не' се пише слитно с прилагателни и наречия: неинтересен, невнимателно\n- 'Ни' се използва за усилване на отрицание: нито идвам, нито пиша\nИзключения:\n- Когато има противопоставяне: 'не висок, а нисък'\n- При повторение: 'нито риба, нито месо'",
        examples: ["Не мога да дойда.", "Нито ми се яде, нито ми се спи."],
        rules: ["Не + глагол = отделно", "Не + прилагателно/наречие = слитно"]
    },
    "ъ и ь": {
        answer: "Правопис на 'ъ' и 'ь':\n1. 'Ъ' се пише:\n- След префикс пред 'я', 'ю': съюз, обезъязвим\n- В корена на думите: ъгъл, мъка\n2. 'Ь' се пише:\n- Между съгласна и 'о': шьов, жьол\n- В някои чужди думи: бульон",
        examples: ["съжалявам", "обезъяна", "шьол"]
    },
    "морфеми": {
        answer: "Морфемите са най-малките значими части на думата:\n1. Корен - носи основното значение\n2. Префикс - пред корена\n3. Суфикс - след корена\n4. Окончание - променя се според граматичните правила",
        examples: ["под-вод-н-и", "пре-пиш-вам"]
    },
    "под игото": {
        answer: "Основни теми в 'Под игото' на Иван Вазов:\n1. Борба за национално освобождение\n2. Любов към родината\n3. Животът по време на османското владичество\n4. Човешките взаимоотношения в трудни времена\nГлавни герои: Бойчо Огнянов, Рада, дядо Йоцо",
        quotes: ["Който падне в бой за свобода, той не умира!"]
    },
    // Add more entries as needed...
  };

  // Message state with proper typing
  let messages: Message[] = [];

  // Helper functions with proper types
  function containsEnglish(text: string): boolean {
      return /[a-zA-Z]/.test(text);
  }

  function formatAnswer(answer: string, examples?: string[]): string {
      let formatted = `<div class="formatted-message">${answer.replace(/\n/g, '<br>')}</div>`;
      
      if (examples && examples.length > 0) {
          formatted += '<br><strong>Примери:</strong><br><ul>';
          examples.forEach((ex: string) => {
              formatted += `<li>${ex}</li>`;
          });
          formatted += '</ul>';
      }
      
      return formatted;
  }

  function renderMessages(): void {
      chat.innerHTML = '';
      
      messages.forEach((msg: Message) => {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message', msg.sender);
          
          if (msg.formatted) {
              messageDiv.innerHTML = msg.text;
          } else {
              messageDiv.textContent = msg.text;
          }
          
          chat.appendChild(messageDiv);
      });
      
      chat.scrollTop = chat.scrollHeight;
  }

  function showTypingIndicator(): HTMLDivElement {
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('typing-indicator');
      typingDiv.innerHTML = `
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
      `;
      chat.appendChild(typingDiv);
      chat.scrollTop = chat.scrollHeight;
      return typingDiv;
  }

  function hideTypingIndicator(element: HTMLDivElement): void {
      element.remove();
  }

  function findBestAnswer(userInput: string): AIResponse {
      const lower = userInput.toLowerCase().trim();
      
      // Check for direct keyword matches
      for (const key in knowledgeBase) {
          if (lower.includes(key)) {
              const entry = knowledgeBase[key];
              return {
                  text: formatAnswer(entry.answer, entry.examples || entry.quotes),
                  formatted: true
              };
          }
      }
      
      // Default responses
      const randomResponses: string[] = [
          "Интересен въпрос! Можеш ли да го зададеш по-конкретно?",
          "Все още се уча, но ще се опитам да помогна. За коя точно тема питаш?",
          "Имам информация за много теми от български език и литература. Опитай да питаш за конкретно произведение, правило или понятие.",
          "Попитай ме за конкретно правило, произведение или автор и ще ти помогна!"
      ];
      
      return { 
          text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          formatted: false
      };
  }

  function handleUserInput(): void {
      const userText = chatInput.value.trim();
      if (!userText) return;
      
      // Check for English input
      if (containsEnglish(userText)) {
          const ganioPhrases: string[] = [
              "Абе, момко, тука да не ти е Америка?! Пиши на кирилица, че ме хваща срама!",
              "Ганьо не говори на английски! Кирилица, или ще те върна в трети клас!",
              "Като видя латиница и ми пресъхва ракията! Пиши както баба ти те е учила!",
              "Това да не ти е чат с Макдоналдс?! Тука кирилицата е задължителна, момко!",
              "На мен ми дай 'ъ', 'щ', 'ш'... другото го прати на някой Гугъл Транслейт!",
              "Момко, ако не видя една 'а' и една 'ъ' в изречението, нема повече да ти отговарям!"
          ];
          const randomGanioMsg = ganioPhrases[Math.floor(Math.random() * ganioPhrases.length)];
          messages.push({ sender: 'user', text: userText });
          messages.push({ sender: 'ai', text: randomGanioMsg, formatted: false });
          renderMessages();
          chatInput.value = '';
          return;
      }
      
      messages.push({ sender: 'user', text: userText });
      renderMessages();
      chatInput.value = '';
      
      const typingElement = showTypingIndicator();
      
      setTimeout(() => {
          hideTypingIndicator(typingElement);
          
          const aiResponse = findBestAnswer(userText);
          messages.push({ 
              sender: 'ai', 
              text: aiResponse.text,
              formatted: aiResponse.formatted
          });
          renderMessages();
      }, 1500);
  }

  // Event listeners
  chatForm.addEventListener('submit', function(e: Event): void {
      e.preventDefault();
      handleUserInput();
  });

  chatInput.addEventListener('keydown', function(e: KeyboardEvent): void {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleUserInput();
      }
  });

  quickQuestions.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', function(): void {
          const question = this.textContent || '';
          chatInput.value = question;
          chatForm.dispatchEvent(new Event('submit'));
      });
  });

  // Initial render
  renderMessages();
});