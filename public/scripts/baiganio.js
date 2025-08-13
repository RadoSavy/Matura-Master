document.addEventListener('DOMContentLoaded', function () {
  const chat = document.getElementById('chat');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickQuestions = document.querySelectorAll('.quick-question');

  const knowledgeBase = {
      // Български език
      "частици": {
          answer: "Частиците в българския език са:\n1. Отрицателни (не, ни)\n2. Възклицателни (ех, ох, ах)\n3. Утвердителни (да, ами)\n4. Съединителни (и, а, но, че)\n5. Въпросителни (ли, дали, защо)",
          examples: ["Не искам да отида.", "Ех, колко хубаво!", "Ще дойдеш ли утре?"]
      },
      "правопис на не": {
          answer: "Частицата 'не' се пише:\n- ОТДЕЛНО с глаголи: не искам, не чета\n- СЛИТНО с прилагателни и наречия: неинтересен, невнимателно\nИзключение: когато има противопоставяне - 'не висок, а нисък'",
          rules: ["Не + глагол = отделно", "Не + прилагателно/наречие = слитно"]
      },
      "ъ и ь": {
          answer: "Правопис на 'ъ' и 'ь':\n1. 'Ъ' се пише:\n- След префикс пред 'я', 'ю': съюз, обезъязвим\n- В корена на думите: ъгъл, мъка\n2. 'Ь' се пише:\n- Между съгласна и 'о': шьов, жьол\n- В някои чужди думи: бульон",
          examples: ["съжалявам", "обезъяна", "шьол"]
      },
      
      // Литература
      "под игото": {
          answer: "Основни теми в 'Под игото' на Иван Вазов:\n1. Борба за национално освобождение\n2. Любов към родината\n3. Животът по време на османското владичество\n4. Човешките взаимоотношения в трудни времена\nГлавни герои: Бойчо Огнянов, Рада, дядо Йоцо",
          quotes: ["Който падне в бой за свобода, той не умира!"]
      },
      "немили-недраги": {
          answer: "Герои в 'Немили-недраги' на Иван Вазов:\n1. Македонски – смел и буен хъш. Обича битките, но е и емоционален. Представлява борбения дух на българския революционер.\n2. Бръчков – Бръчков е млад, наивен, но идеалистичен хъш. Първо се възхищава на хъшовете, но после осъзнава трудната им съдба. Символ е на новото поколение и надеждата за бъдещето. Помага на Странджата в последните му мигове.\n3. Странджата – Странджата е болен и възрастен хъш, бивш знаменосец. Държи кръчма в Браила и помага на другите хъшове. Символ е на патриотизъм и саможертва. Умира, без да види свободна България.\n4. Хаджият – млад човек, но преждевременно състарен от тежката емигрантска участ. Хаджият е един  от посетителите на кръчмата на Знаменосеца, който също слуша разказите и спомените на своите другари.\nОсновен конфликт: саможертвата и трудностите на емигрантския живот в името на свободата на България.",
          themes: ["Патриотизъм", "Саможертва", "Борба за национално освобождение", "Емигрантски живот"]
      },
      "народни песни": {
          answer: "Видове български народни песни:\n1. Юнашки песни - за исторически събития и герои\n2. Обичайни песни - за семейни и селски празници\n3. Любовни песни - за човешките чувства\n4. Трудови песни - свързани с различни занаяти\nПример: 'Край Вардара вее се бяло знаме'",
          characteristics: ["Устно предаване", "Повторение на мотиви", "Фолклорни образи"]
      }
  };

  const messages = [
      { sender: 'ai', text: 'Здравей! Аз съм BAI Ганьо, твоят AI помощник по български език и литература. Как мога да ти помогна днес?' }
  ];

  function renderMessages() {
      chat.innerHTML = '';
      messages.forEach(msg => {
          const div = document.createElement('div');
          div.classList.add('message', msg.sender);
          
          if (msg.sender === 'ai' && msg.formatted) {
              div.classList.add('formatted-message');
              div.innerHTML = msg.text;
          } else {
              div.textContent = msg.text;
          }
          
          chat.appendChild(div);
      });
      chat.scrollTop = chat.scrollHeight;
  }

  function showTypingIndicator() {
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

  function hideTypingIndicator(typingElement) {
      if (typingElement && typingElement.parentNode) {
          typingElement.remove();
      }
  }

  function formatAnswer(answer, examples, rules) {
      let formatted = `<p>${answer.replace(/\n/g, '</p><p>')}</p>`;
      
      if (examples && examples.length > 0) {
          formatted += `<p><strong>Примери:</strong></p><ul>`;
          examples.forEach(ex => {
              formatted += `<li>${ex}</li>`;
          });
          formatted += `</ul>`;
      }
      
      if (rules && rules.length > 0) {
          formatted += `<p><strong>Правила:</strong></p><ul>`;
          rules.forEach(rule => {
              formatted += `<li>${rule}</li>`;
          });
          formatted += `</ul>`;
      }
      
      return formatted;
  }

  function containsEnglish(text) {
      return /[a-zA-Z]/.test(text);
  }

  function findBestAnswer(userText) {
      const lower = userText.toLowerCase();
      
      if (lower.includes('частиц') || lower.includes('видове частиц')) {
          return {
              text: formatAnswer(
                  knowledgeBase["частици"].answer,
                  knowledgeBase["частици"].examples
              ),
              formatted: true
          };
      }
      
      if (lower.includes('не ') || lower.includes('правопис на не')) {
          return {
              text: formatAnswer(
                  knowledgeBase["правопис на не"].answer,
                  null,
                  knowledgeBase["правопис на не"].rules
              ),
              formatted: true
          };
      }
      
      if (lower.includes('ъ ') || lower.includes('ь ') || lower.includes('ъ и ь')) {
          return {
              text: formatAnswer(
                  knowledgeBase["ъ и ь"].answer,
                  knowledgeBase["ъ и ь"].examples
              ),
              formatted: true
          };
      }
      
      if (lower.includes('под игото')) {
          return {
              text: formatAnswer(
                  knowledgeBase["под игото"].answer,
                  knowledgeBase["под игото"].quotes
              ),
              formatted: true
          };
      }
      
      if (lower.includes('немили-недраги') || lower.includes('немили недраги')) {
          return {
              text: formatAnswer(
                  knowledgeBase["немили-недраги"].answer,
                  null,
                  knowledgeBase["немили-недраги"].themes
              ),
              formatted: true
          };
      }
      
      if (lower.includes('народн') || lower.includes('фолклор')) {
          return {
              text: formatAnswer(
                  knowledgeBase["народни песни"].answer,
                  null,
                  knowledgeBase["народни песни"].characteristics
              ),
              formatted: true
          };
      }
      
      if (lower.includes('правопис') || lower.includes('правописн')) {
          return { 
              text: 'В българския език има много правописни правила. За кое конкретно правило искаш да научиш? Например:\n- Правопис на "не"\n- Употреба на "ъ" и "ь"\n- Глаголни окончания\n- Главни и малки букви',
              formatted: false
          };
      }
      
      if (lower.includes('литература') || lower.includes('книг') || lower.includes('произведени')) {
          return { 
              text: 'Българската литература е богата и разнообразна! За кое произведение или автор искаш да научиш повече? Например:\n- "Под игото" на Иван Вазов\n- "Железният светилник" на Елин Пелин\n- Български народни приказки и песни\n- Поезия на Христо Ботев',
              formatted: false
          };
      }
      
      if (lower.includes('тест') || lower.includes('упражнен')) {
          return { 
              text: 'Искаш ли да направим упражнение? Мога да ти задам въпроси по:\n1. Правопис\n2. Граматика\n3. Литературни произведения\n4. Автори и творби\nИзбери тема и започваме!',
              formatted: false
          };
      }
      
      if (lower.includes('консултация') || lower.includes('учител')) {
          return { 
              text: 'Ако имаш трудности с някоя тема, наистина е добра идея да потърсиш помощ от учителя си. Мога да ти помогна с:\n- Обяснение на трудни теми\n- Примери и правила\n- Подготовка за изпит\nНо за персонализирана помощ учителят е най-добрият избор!',
              formatted: false
          };
      }
      
      const randomResponses = [
          "Интересен въпрос! Можеш ли да го зададеш по-конкретно?",
          "Все още се уча, но ще се опитам да помогна. За коя точно тема питаш?",
          "Имам много информация за български език и литература. Фокусирай въпроса си малко повече.",
          "Попитай ме за конкретно правило, произведение или автор и ще ти помогна!"
      ];
      return { 
          text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          formatted: false
      };
  }

  chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText) return;
      
      if (containsEnglish(userText)) {
          const ganioPhrases = [
              "Абе, момко, тука да не ти е Америка?! Пиши на кирилица, че ме хваща срама!",
              "Я пак! Какви са тези латински мацаници? Да не си в Холивуд?!",
              "Ганьо не говори на английски! Кирилица, или ще те върна в трети клас!",
              "Моля ти се, като ще пишеш на латиница, върви при английския цар, не при мене!",
              "Като видя латиница и ми пресъхва ракията! Пиши както баба ти те е учила!",
              "Това да не ти е чат с Макдоналдс?! Тука кирилицата е задължителна, момко!",
              "Пиша ти от България, не от Тексас! Айде пак и този път с букви на народа!",
              "На мен ми дай 'ъ', 'щ', 'ш'... другото го прати на някой Гугъл Транслейт!",
              "Момко, ако не видя една 'ч' и една 'ю' в изречението, нема повече да ти отговарям!"
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
  });

  quickQuestions.forEach(button => {
      button.addEventListener('click', function() {
          const question = this.textContent;
          chatInput.value = question;
          chatForm.dispatchEvent(new Event('submit'));
      });
  });

  // Initial render
  renderMessages();
});