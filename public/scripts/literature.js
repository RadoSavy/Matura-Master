const appData = {
  currentLesson: 1,
  completedLessons:
    JSON.parse(localStorage.getItem('completedLiteratureLessons')) || [],
  dailyQuests: [
    { id: 1, text: 'Прегледай всички материали', completed: false },
    { id: 2, text: 'Спечели 20 XP', completed: false },
    { id: 3, text: '0/3 уроци', completed: false, progress: 0, target: 3 },
  ],
  xp: parseInt(localStorage.getItem('literatureXp')) || 0,
  leaderboardProgress:
    parseInt(localStorage.getItem('literatureLeaderboardProgress')) || 0,
  streak: parseInt(localStorage.getItem('literatureStreak')) || 0,
};

let literatureLessons = [];
const checkInterval = setInterval(() => {
  if (window.remoteLiteratureLessons && window.remoteLiteratureLessons.length > 0) {
    literatureLessons = window.remoteLiteratureLessons;
    clearInterval(checkInterval);
    console.log(`✓ Literature lessons loaded: ${literatureLessons.length}`);
    initApp();
  }
}, 100);

setTimeout(() => {
  if (literatureLessons.length === 0) {
    console.warn('No remote literature lessons loaded, using empty array');
    literatureLessons = [];
    clearInterval(checkInterval);
    initApp();
  }
}, 3000);
  
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
  const sections = [
    {
      id: 1,
      title: 'Раздел 1: Българинът във възрожденския свят',
      lessons: literatureLessons.slice(0, 3),
    },
    {
      id: 2,
      title: 'Раздел 2: Човекът в обществото - норми, ценности и конфликти',
      lessons: literatureLessons.slice(3, 8),
    },
  ];

  sections.forEach((section) => {
    const sectionGrid = document.getElementById(`lessonGrid${section.id}`);
    if (!sectionGrid) return;

    sectionGrid.innerHTML = '';

    section.lessons.forEach((lesson) => {
      const isCompleted = appData.completedLessons.includes(lesson.id);
      const isCurrent = lesson.id === appData.currentLesson;
      const isLocked = false;

      const lessonCard = document.createElement('div');
      lessonCard.className = `lesson-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${isCurrent ? 'active' : ''}`;
      lessonCard.dataset.id = lesson.id;

      if (isLocked) {
        lessonCard.innerHTML = `
                    <div class="lesson-icon">🔒</div>
                    <div class="lesson-title">${lesson.title}</div>
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

      sectionGrid.appendChild(lessonCard);
    });
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
  const lesson = literatureLessons.find((l) => l.id === lessonId);
  if (!lesson) return;

  currentLessonId = lessonId;
  currentQuestionIndex = 0;
  currentQuestions = [...lesson.questions];
  correctAnswersCount = 0;

  showContent(lesson);
  lessonModal.classList.add('active');
}

function showContent(lesson) {
  if (lesson.content) {
    // Create modal content using DOM methods to prevent XSS
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content lesson-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-modal';
    closeBtn.id = 'closeModal';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    modalContent.appendChild(closeBtn);

    const lessonHeader = document.createElement('div');
    lessonHeader.className = 'lesson-header';

    const lessonIcon = document.createElement('div');
    lessonIcon.className = 'lesson-icon';
    lessonIcon.textContent = lesson.icon || lesson.id;
    lessonHeader.appendChild(lessonIcon);

    const lessonTitle = document.createElement('h2');
    lessonTitle.textContent = lesson.title;
    lessonHeader.appendChild(lessonTitle);

    modalContent.appendChild(lessonHeader);

    const lessonBody = document.createElement('div');
    lessonBody.className = 'lesson-body';
    lessonBody.innerHTML = lesson.content; // Assuming lesson.content is trusted HTML
    modalContent.appendChild(lessonBody);

    const lessonFooter = document.createElement('div');
    lessonFooter.className = 'lesson-footer';

    const startBtn = document.createElement('button');
    startBtn.className = 'btn';
    startBtn.id = 'startQuestionsBtn';
    startBtn.innerHTML = '<i class="fas fa-question-circle"></i> Започни въпросите';
    lessonFooter.appendChild(startBtn);

    modalContent.appendChild(lessonFooter);

    lessonModal.innerHTML = '';
    lessonModal.appendChild(modalContent);

    document
      .getElementById('closeModal')
      .addEventListener('click', closeLesson);
    document
      .getElementById('startQuestionsBtn')
      .addEventListener('click', () => {
        showQuestion();
      });
  } else {
    showQuestion();
  }
}

function showQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    completeLesson();
    return;
  }

  lessonModal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" id="closeModal"><i class="fas fa-times"></i></button>
            <div class="lesson-header">
                <div class="lesson-type">Изберете верния отговор</div>
                <div class="lesson-question" id="lessonQuestion"></div>
            </div>
            <div class="options-container" id="optionsContainer"></div>
            <div class="lesson-footer">
                <div class="xp-badge"><i class="fas fa-star"></i> +10 XP</div>
                <button class="btn btn-sm" id="nextQuestionBtn">Следващ въпрос</button>
            </div>
        </div>
    `;

  const lessonQuestion = document.getElementById('lessonQuestion');
  const optionsContainer = document.getElementById('optionsContainer');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
  const closeModal = document.getElementById('closeModal');

  closeModal.addEventListener('click', closeLesson);
  nextQuestionBtn.addEventListener('click', nextQuestion);

  const question = currentQuestions[currentQuestionIndex];
  lessonQuestion.textContent = question.question;

  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option-btn';
    optionBtn.textContent = option.text;
    optionBtn.dataset.correct = option.correct;

    optionBtn.addEventListener('click', () =>
      selectAnswer(optionBtn, option.correct, question.explanation)
    );
    optionsContainer.appendChild(optionBtn);
  });
}

function selectAnswer(btn, isCorrect, explanation) {
  document.querySelectorAll('.option-btn').forEach((opt) => {
    opt.disabled = true;
    if (opt.dataset.correct === 'true') {
      opt.classList.add('correct');
    }
  });

  if (isCorrect) {
    btn.classList.add('correct');
    correctAnswersCount++;

    const xpBadge = document.querySelector('.xp-badge');
    if (xpBadge) {
      xpBadge.innerHTML = `<i class="fas fa-check"></i> Верен отговор!`;
      xpBadge.style.backgroundColor = 'var(--primary-color)';
    }
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
  if (xpBadge) {
    xpBadge.innerHTML = `<i class="fas fa-star"></i> +10 XP`;
    xpBadge.style.backgroundColor = 'var(--primary-color)';
  }

  showQuestion();
}

function completeLesson() {
  if (!appData.completedLessons.includes(currentLessonId)) {
    appData.completedLessons.push(currentLessonId);
    localStorage.setItem(
      'completedLiteratureLessons',
      JSON.stringify(appData.completedLessons)
    );

    const lesson = literatureLessons.find((l) => l.id === currentLessonId);
    const xpEarned = Math.floor(
      lesson.xp * (correctAnswersCount / currentQuestions.length)
    );
    appData.xp += xpEarned;
    localStorage.setItem('literatureXp', appData.xp);

    appData.leaderboardProgress++;
    localStorage.setItem(
      'literatureLeaderboardProgress',
      appData.leaderboardProgress
    );

    updateStreak();

    updateProgress();

    const nextLesson = literatureLessons.find(
      (l) => l.id === currentLessonId + 1
    );
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
  const progressPercent = Math.min(
    (appData.leaderboardProgress / 3) * 100,
    100
  );
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
      questProgress.querySelector('.quest-checkbox').innerHTML =
        '<i class="fas fa-check"></i>';
    }
  }
}

function updateStreak() {
  const lastCompletedDate = localStorage.getItem('lastLiteratureCompletedDate');
  const today = new Date().toDateString();

  if (lastCompletedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompletedDate === yesterday.toDateString()) {
      appData.streak++;
    } else {
      appData.streak = 1;
    }

    localStorage.setItem('literatureStreak', appData.streak);
    localStorage.setItem('lastLiteratureCompletedDate', today);

    const streakCounter = document.querySelector('.streak-counter');
    if (streakCounter) {
      streakCounter.innerHTML = `<i class="fas fa-fire"></i> ${appData.streak}`;

      streakCounter.classList.add('bounce');
      setTimeout(() => streakCounter.classList.remove('bounce'), 1000);
    }
  }
}

function checkDailyStreak() {
  const lastCompletedDate = localStorage.getItem('lastLiteratureCompletedDate');
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    lastCompletedDate &&
    lastCompletedDate !== today &&
    lastCompletedDate !== yesterday.toDateString()
  ) {
    appData.streak = 0;
    localStorage.setItem('literatureStreak', '0');
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
    const guidebookLesson = literatureLessons.find((l) => l.id === 1);
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
