import type { Message, AIResponse } from './types';
import { firebaseService } from './firebase-service';

let currentUserId: string = '';
let messages: Message[] = [];

document.addEventListener('DOMContentLoaded', async function (): Promise<void> {
  // Check authentication
  const user = firebaseService.getCurrentUser();
  if (!user) {
    window.location.href = 'auth.html';
    return;
  }

  currentUserId = user.uid;

  // DOM Elements
  const chat = document.getElementById('chat') as HTMLDivElement;
  const chatForm = document.getElementById('chat-form') as HTMLFormElement;
  const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement;
  const quickQuestions = document.querySelectorAll('.quick-question') as NodeListOf<HTMLButtonElement>;

  // Load chat history from database
  await loadChatHistory();

  // Helper functions
  function containsEnglish(text: string): boolean {
      return /[a-zA-Z]/.test(text);
  }

  function formatAnswer(answer: string, examples?: string[], quotes?: string[]): string {
      let formatted = `<div class="formatted-message">${answer.replace(/\n/g, '<br>')}</div>`;
      
      if (examples && examples.length > 0) {
          formatted += '<br><strong>Примери:</strong><br><ul>';
          examples.forEach((ex: string) => {
              formatted += `<li>${ex}</li>`;
          });
          formatted += '</ul>';
      }

      if (quotes && quotes.length > 0) {
          formatted += '<br><strong>Цитати:</strong><br><ul>';
          quotes.forEach((quote: string) => {
              formatted += `<li><em>${quote}</em></li>`;
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

  async function findBestAnswer(userInput: string): Promise<AIResponse> {
      const lower = userInput.toLowerCase().trim();
      
      try {
          // Search knowledge base in Firestore
          const results = await firebaseService.searchKnowledgeBase(lower);
          
          if (results.length > 0) {
              const entry = results[0];
              return {
                  text: formatAnswer(entry.answer, entry.examples, entry.quotes),
                  formatted: true
              };
          }

          // Check for specific keyword
          const keywords = lower.split(' ').filter(word => word.length > 3);
          for (const keyword of keywords) {
              const entry = await firebaseService.getKnowledgeBaseEntry(keyword);
              if (entry) {
                  return {
                      text: formatAnswer(entry.answer, entry.examples, entry.quotes),
                      formatted: true
                  };
              }
          }
      } catch (error) {
          console.error('Error searching knowledge base:', error);
      }
      
      // Default responses if nothing found
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

  async function handleUserInput(): Promise<void> {
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
          
          // Save to database
          await firebaseService.saveChatMessage(currentUserId, userText, randomGanioMsg, false);
          
          renderMessages();
          chatInput.value = '';
          return;
      }
      
      messages.push({ sender: 'user', text: userText });
      renderMessages();
      chatInput.value = '';
      
      const typingElement = showTypingIndicator();
      
      // Simulate thinking delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      hideTypingIndicator(typingElement);
      
      const aiResponse = await findBestAnswer(userText);
      messages.push({ 
          sender: 'ai', 
          text: aiResponse.text,
          formatted: aiResponse.formatted
      });
      
      // Save to database
      await firebaseService.saveChatMessage(currentUserId, userText, aiResponse.text, aiResponse.formatted);
      
      renderMessages();
  }

  async function loadChatHistory(): Promise<void> {
      try {
          const history = await firebaseService.getChatHistory(currentUserId, 20);
          const userMessages: Message[] = history.map(msg => ({
              sender: 'user' as const,
              text: msg.message,
              formatted: false
          }));
          const aiMessages: Message[] = history.map(msg => ({
              sender: 'ai' as const,
              text: msg.response,
              formatted: msg.formatted
          }));
          messages = userMessages.concat(aiMessages).sort(() => {
              // Sort by timestamp if available
              return 0;
          });

          renderMessages();
      } catch (error) {
          console.error('Error loading chat history:', error);
          // Start with empty messages if error
          messages = [];
      }
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
  if (messages.length === 0) {
      // Welcome message if no history
      messages.push({
          sender: 'ai',
          text: 'Здравей! Аз съм BAI Ганьо, твоят AI асистент по български език и литература. Питай ме каквото искаш!',
          formatted: false
      });
      renderMessages();
  }
});
