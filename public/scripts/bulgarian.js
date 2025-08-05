        const appData = {
          currentLesson: 1,
          completedLessons: JSON.parse(localStorage.getItem('completedLessons')) || [],
          dailyQuests: [
              { id: 1, text: "Прегледай всички материали", completed: false },
              { id: 2, text: "Спечели 20 XP", completed: false },
              { id: 3, text: "0/3 уроци", completed: false, progress: 0, target: 3 }
          ],
          xp: parseInt(localStorage.getItem('xp')) || 0,
          leaderboardProgress: parseInt(localStorage.getItem('leaderboardProgress')) || 0,
          streak: parseInt(localStorage.getItem('streak')) || 0
      };

      const lessons = [
          { 
              id: 1, 
              title: "Информационна бележка", 
              xp: 10, 
              crown: true, 
              description: "Научете основните характеристики и структура на информационните бележки",
              icon: "📝",
              questions: [
                  {
                      question: "Кое от следните НЕ е характеристика на информационната бележка?",
                      options: [
                          { text: "Краткост и яснота", correct: false },
                          { text: "Обективност", correct: false },
                          { text: "Емоционална оценка", correct: true },
                          { text: "Фактологичност", correct: false }
                      ],
                      explanation: "Информационната бележка трябва да бъде обективна и да не съдържа емоционални оценки."
                  },
                  {
                      question: "Коя от следните части НЕ присъства в информационната бележка?",
                      options: [
                          { text: "Заглавие", correct: false },
                          { text: "Въведение", correct: true },
                          { text: "Основна част", correct: false },
                          { text: "Източник на информация", correct: false }
                      ],
                      explanation: "Информационната бележка няма въведение, тя започва директно с фактите."
                  }
              ]
          },
          { 
              id: 2, 
              title: "Репортаж", 
              xp: 10, 
              description: "Разберете как се създава интересен и информативен репортаж",
              icon: "📰",
              questions: [
                  {
                      question: "Основната цел на репортажа е:",
                      options: [
                          { text: "Да информира за събитие", correct: true },
                          { text: "Да убеждава читателя", correct: false },
                          { text: "Да разсмее публиката", correct: false },
                          { text: "Да критикува участниците", correct: false }
                      ],
                      explanation: "Основната цел на репортажа е да информира за събитие, въпреки че може да съдържа и елементи на анализ."
                  }
              ]
          },
          { 
              id: 3, 
              title: "Интервю", 
              xp: 10, 
              description: "Научете техники за провеждане на ефективно интервю",
              icon: "🎤",
              questions: [
                  {
                      question: "Кое от следните е важно при провеждането на интервю?",
                      options: [
                          { text: "Да се подготвят въпроси предварително", correct: true },
                          { text: "Да се прекъсва интервюираният", correct: false },
                          { text: "Да се използват сложни термини", correct: false },
                          { text: "Да се избегнат личните въпроси", correct: false }
                      ],
                      explanation: "Добрата подготовка с предварително изготвени въпроси е ключ към успешно интервю."
                  }
              ]
          },
          { 
              id: 4, 
              title: "Медиен текст", 
              xp: 15, 
              locked: true,
              description: "Анализирайте различните видове медийни текстове",
              icon: "📱"
          },
          { 
              id: 5, 
              title: "Новинарска статия", 
              xp: 15, 
              locked: true,
              description: "Научете структурата на новинарската статия",
              icon: "📰"
          },
          { 
              id: 6, 
              title: "Публицистичен текст", 
              xp: 20, 
              locked: true,
              description: "Разберете особеностите на публицистичния стил",
              icon: "✍️"
          }
      ];

      const lessonGrid = document.getElementById('lessonGrid');
      const lessonModal = document.getElementById('lessonModal');
      const closeModal = document.getElementById('closeModal');
      const lessonQuestion = document.getElementById('lessonQuestion');
      const optionsContainer = document.getElementById('optionsContainer');
      const nextQuestionBtn = document.getElementById('nextQuestionBtn');
      const guidebookBtn = document.getElementById('guidebookBtn');
      const leaderboardProgress = document.getElementById('leaderboardProgress');

      let currentLessonId = null;
      let currentQuestionIndex = 0;
      let currentQuestions = [];
      let correctAnswersCount = 0;

      function initApp() {
          renderLessons();
          updateProgress();
          setupEventListeners();
          checkDailyStreak();
      }

      function renderLessons() {
          lessonGrid.innerHTML = '';
          
          lessons.forEach(lesson => {
              const isCompleted = appData.completedLessons.includes(lesson.id);
              const isCurrent = lesson.id === appData.currentLesson;
              const isLocked = lesson.locked && !isCompleted;
              
              const lessonCard = document.createElement('div');
              lessonCard.className = `lesson-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${isCurrent ? 'active' : ''}`;
              lessonCard.dataset.id = lesson.id;
              
              if (isLocked) {
                  lessonCard.innerHTML = `
                      <div class="lesson-icon">🔒</div>
                      <div class="lesson-title">Заключен</div>
                      <div class="lesson-xp">${lesson.xp} XP</div>
                  `;
              } else {
                  lessonCard.innerHTML = `
                      ${lesson.crown ? '<div class="crown-icon"><i class="fas fa-crown"></i></div>' : ''}
                      <div class="lesson-icon">${lesson.icon || lesson.id}</div>
                      <div class="lesson-title">${lesson.title}</div>
                      <div class="lesson-xp">${lesson.xp} XP</div>
                  `;
              }
              
              if (!isLocked) {
                  lessonCard.addEventListener('click', () => showLessonPreview(lesson));
              }
              
              lessonGrid.appendChild(lessonCard);
          });
      }

      function showLessonPreview(lesson) {
          const previewModal = document.createElement('div');
          previewModal.className = 'modal active';
          previewModal.innerHTML = `
              <div class="modal-content" style="text-align: center;">
                  <button class="close-modal" id="closePreviewModal"><i class="fas fa-times"></i></button>
                  <div class="lesson-icon" style="margin: 0 auto 20px; font-size: 40px; width: 80px; height: 80px;">${lesson.icon || lesson.id}</div>
                  <h2 style="margin-bottom: 10px;">${lesson.title}</h2>
                  <p style="color: var(--text-light); margin-bottom: 25px;">${lesson.description}</p>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
                      <div style="background: rgba(76, 175, 80, 0.1); padding: 10px; border-radius: 10px; width: 48%;">
                          <div style="font-size: 12px; color: var(--text-light);">XP</div>
                          <div style="font-weight: bold; color: var(--primary-color);">${lesson.xp}</div>
                      </div>
                      <div style="background: rgba(255, 193, 7, 0.1); padding: 10px; border-radius: 10px; width: 48%;">
                          <div style="font-size: 12px; color: var(--text-light);">Въпроси</div>
                          <div style="font-weight: bold; color: var(--secondary-color);">${lesson.questions ? lesson.questions.length : '3'}</div>
                      </div>
                  </div>
                  <button class="btn" id="startLessonBtn" style="width: 100%;">
                      <i class="fas fa-play"></i> Започни урока
                  </button>
              </div>
          `;
          
          document.body.appendChild(previewModal);
          
          const closeBtn = document.getElementById('closePreviewModal');
          const startBtn = document.getElementById('startLessonBtn');
          
          closeBtn.addEventListener('click', () => {
              previewModal.classList.remove('active');
              setTimeout(() => previewModal.remove(), 300);
          });
          
          startBtn.addEventListener('click', () => {
              previewModal.classList.remove('active');
              setTimeout(() => {
                  previewModal.remove();
                  startLesson(lesson.id);
              }, 300);
          });
          
          previewModal.addEventListener('click', (e) => {
              if (e.target === previewModal) {
                  previewModal.classList.remove('active');
                  setTimeout(() => previewModal.remove(), 300);
              }
          });
      }

      function startLesson(lessonId) {
          const lesson = lessons.find(l => l.id === lessonId);
          if (!lesson) return;
          
          currentLessonId = lessonId;
          currentQuestionIndex = 0;
          currentQuestions = [...lesson.questions];
          correctAnswersCount = 0;
          
          showQuestion();
          lessonModal.classList.add('active');
      }

      function showQuestion() {
          if (currentQuestionIndex >= currentQuestions.length) {
              completeLesson();
              return;
          }
          
          const question = currentQuestions[currentQuestionIndex];
          lessonQuestion.textContent = question.question;
          
          optionsContainer.innerHTML = '';
          question.options.forEach((option, index) => {
              const optionBtn = document.createElement('button');
              optionBtn.className = 'option-btn';
              optionBtn.textContent = option.text;
              optionBtn.dataset.correct = option.correct;
              
              optionBtn.addEventListener('click', () => selectAnswer(optionBtn, option.correct, question.explanation));
              optionsContainer.appendChild(optionBtn);
          });
          
          nextQuestionBtn.style.display = 'none';
      }

      function selectAnswer(btn, isCorrect, explanation) {
          document.querySelectorAll('.option-btn').forEach(opt => {
              opt.disabled = true;
              if (opt.dataset.correct === 'true') {
                  opt.classList.add('correct');
              }
          });
          
          if (isCorrect) {
              btn.classList.add('correct');
              correctAnswersCount++;
              
              const xpBadge = document.querySelector('.xp-badge');
              xpBadge.innerHTML = `<i class="fas fa-check"></i> Верен отговор!`;
              xpBadge.style.backgroundColor = 'var(--primary-color)';
          } else {
              btn.classList.add('incorrect');
              
              if (explanation) {
                  const explanationDiv = document.createElement('div');
                  explanationDiv.className = 'card-text';
                  explanationDiv.style.marginTop = '15px';
                  explanationDiv.style.fontSize = '14px';
                  explanationDiv.style.color = 'var(--text-light)';
                  explanationDiv.style.fontStyle = 'italic';
                  explanationDiv.innerHTML = `<strong>Обяснение:</strong> ${explanation}`;
                  optionsContainer.appendChild(explanationDiv);
              }
          }
          
          nextQuestionBtn.style.display = 'block';
      }

      function nextQuestion() {
          currentQuestionIndex++;
        
          const xpBadge = document.querySelector('.xp-badge');
          xpBadge.innerHTML = `<i class="fas fa-star"></i> +10 XP`;
          xpBadge.style.backgroundColor = 'var(--primary-color)';
          
          showQuestion();
      }

      function completeLesson() {
          if (!appData.completedLessons.includes(currentLessonId)) {
              appData.completedLessons.push(currentLessonId);
              localStorage.setItem('completedLessons', JSON.stringify(appData.completedLessons));
              
              const lesson = lessons.find(l => l.id === currentLessonId);
              const xpEarned = Math.floor(lesson.xp * (correctAnswersCount / currentQuestions.length));
              appData.xp += xpEarned;
              localStorage.setItem('xp', appData.xp);
              
              appData.leaderboardProgress++;
              localStorage.setItem('leaderboardProgress', appData.leaderboardProgress);
              
              updateStreak();
              
              updateProgress();
              
              const nextLesson = lessons.find(l => l.id === currentLessonId + 1);
              if (nextLesson && !nextLesson.locked) {
                  appData.currentLesson = nextLesson.id;
              }
              
              showCompletionModal(xpEarned, correctAnswersCount, currentQuestions.length);
          } else {
              closeLesson();
          }
      }

      function showCompletionModal(xpEarned, correctCount, totalQuestions) {
          const completionModal = document.createElement('div');
          completionModal.className = 'modal active';
          completionModal.innerHTML = `
              <div class="modal-content" style="text-align: center;">
                  <div style="margin-bottom: 20px;">
                      <div style="width: 80px; height: 80px; background-color: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                          <i class="fas fa-check" style="font-size: 36px; color: white;"></i>
                      </div>
                      <h2 style="margin-bottom: 10px;">Урок завършен!</h2>
                      <p style="color: var(--text-light);">Вие отговорихте правилно на ${correctCount} от ${totalQuestions} въпроси</p>
                  </div>
                  <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 25px;">
                      <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 10px; min-width: 100px;">
                          <div style="font-size: 12px; color: var(--text-light);">Спечелени XP</div>
                          <div style="font-weight: bold; color: var(--primary-color); font-size: 24px;">+${xpEarned}</div>
                      </div>
                  </div>
                  <button class="btn" id="closeCompletionModal" style="width: 100%;">
                      <i class="fas fa-check"></i> Готово
                  </button>
              </div>
          `;
          
          document.body.appendChild(completionModal);
          
          const closeBtn = document.getElementById('closeCompletionModal');
          
          closeBtn.addEventListener('click', () => {
              completionModal.classList.remove('active');
              setTimeout(() => {
                  completionModal.remove();
                  closeLesson();
                  renderLessons();
              }, 300);
          });
          
          completionModal.addEventListener('click', (e) => {
              if (e.target === completionModal) {
                  completionModal.classList.remove('active');
                  setTimeout(() => {
                      completionModal.remove();
                      closeLesson();
                      renderLessons();
                  }, 300);
              }
          });
      }

      function closeLesson() {
          lessonModal.classList.remove('active');
      }

      function updateProgress() {
          const progressPercent = Math.min((appData.leaderboardProgress / 3) * 100, 100);
          leaderboardProgress.style.width = `${progressPercent}%`;
          
          const progressText = document.querySelector('.progress-text span:last-child');
          if (progressText) {
              progressText.textContent = `${appData.leaderboardProgress}/3`;
          }
          
          const questProgress = document.querySelectorAll('.quest-item')[2];
          if (questProgress) {
              questProgress.querySelector('.quest-text').textContent = 
                  `${appData.leaderboardProgress}/3 уроци`;
              
              if (appData.leaderboardProgress >= 3) {
                  questProgress.querySelector('.quest-checkbox').classList.add('completed');
                  questProgress.querySelector('.quest-checkbox').innerHTML = '<i class="fas fa-check"></i>';
              }
          }
      }

      function updateStreak() {
          const lastCompletedDate = localStorage.getItem('lastCompletedDate');
          const today = new Date().toDateString();
          
          if (lastCompletedDate !== today) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              
              if (lastCompletedDate === yesterday.toDateString()) {
                  appData.streak++;
              } else {
                  appData.streak = 1;
              }
              
              localStorage.setItem('streak', appData.streak);
              localStorage.setItem('lastCompletedDate', today);
              
              const streakCounter = document.querySelector('.streak-counter');
              if (streakCounter) {
                  streakCounter.innerHTML = `<i class="fas fa-fire"></i> ${appData.streak}`;
                  
                  streakCounter.classList.add('bounce');
                  setTimeout(() => streakCounter.classList.remove('bounce'), 1000);
              }
          }
      }

      function checkDailyStreak() {
          const lastCompletedDate = localStorage.getItem('lastCompletedDate');
          const today = new Date().toDateString();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (lastCompletedDate && lastCompletedDate !== today && lastCompletedDate !== yesterday.toDateString()) {
              appData.streak = 0;
              localStorage.setItem('streak', '0');
          }
          
          const streakCounter = document.querySelector('.streak-counter');
          if (streakCounter) {
              streakCounter.innerHTML = `<i class="fas fa-fire"></i> ${appData.streak}`;
          }
      }

      function setupEventListeners() {
          closeModal.addEventListener('click', closeLesson);
          nextQuestionBtn.addEventListener('click', nextQuestion);
          
          guidebookBtn.addEventListener('click', () => {
              const guidebookLesson = lessons.find(l => l.id === 1);
              if (guidebookLesson) showLessonPreview(guidebookLesson);
          });
          
          lessonModal.addEventListener('click', (e) => {
              if (e.target === lessonModal) {
                  closeLesson();
              }
          });
          
          document.addEventListener('keydown', (e) => {
              if (lessonModal.classList.contains('active')) {
                  if (e.key === 'Escape') {
                      closeLesson();
                  }
              }
          });
      }

      document.addEventListener('DOMContentLoaded', initApp);