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
        const iconDiv = document.createElement('div');
        iconDiv.className = 'lesson-icon';
        iconDiv.textContent = '🔒';
        lessonCard.appendChild(iconDiv);

        const titleDiv = document.createElement('div');
        titleDiv.className = 'lesson-title';
        titleDiv.textContent = lesson.title;
        lessonCard.appendChild(titleDiv);

        const xpDiv = document.createElement('div');
        xpDiv.className = 'lesson-xp';
        xpDiv.textContent = `${lesson.xp} XP`;
        lessonCard.appendChild(xpDiv);
      } else {
        if (lesson.crown) {
          const crownDiv = document.createElement('div');
          crownDiv.className = 'crown-icon';
          const crownIcon = document.createElement('i');
          crownIcon.className = 'fas fa-crown';
          crownDiv.appendChild(crownIcon);
          lessonCard.appendChild(crownDiv);
        }

        const iconDiv = document.createElement('div');
        iconDiv.className = 'lesson-icon';
        iconDiv.textContent = lesson.icon || lesson.id;
        lessonCard.appendChild(iconDiv);

        const titleDiv = document.createElement('div');
        titleDiv.className = 'lesson-title';
        titleDiv.textContent = lesson.title;
        lessonCard.appendChild(titleDiv);

        const xpDiv = document.createElement('div');
        xpDiv.className = 'lesson-xp';
        xpDiv.textContent = `${lesson.xp} XP`;
        lessonCard.appendChild(xpDiv);
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

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.style.textAlign = 'center';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-modal';
  closeBtn.id = 'closePreviewModal';
  const closeIcon = document.createElement('i');
  closeIcon.className = 'fas fa-times';
  closeBtn.appendChild(closeIcon);
  modalContent.appendChild(closeBtn);

  const lessonIcon = document.createElement('div');
  lessonIcon.className = 'lesson-icon';
  lessonIcon.style.margin = '0 auto 20px';
  lessonIcon.style.fontSize = '40px';
  lessonIcon.style.width = '80px';
  lessonIcon.style.height = '80px';
  lessonIcon.textContent = lesson.icon || lesson.id;
  modalContent.appendChild(lessonIcon);

  const h2 = document.createElement('h2');
  h2.style.marginBottom = '10px';
  h2.textContent = lesson.title;
  modalContent.appendChild(h2);

  const p = document.createElement('p');
  p.style.color = 'var(--text-light)';
  p.style.marginBottom = '25px';
  p.textContent = lesson.description;
  modalContent.appendChild(p);

  const statsDiv = document.createElement('div');
  statsDiv.style.display = 'flex';
  statsDiv.style.justifyContent = 'space-between';
  statsDiv.style.marginBottom = '25px';

  const xpDiv = document.createElement('div');
  xpDiv.style.background = 'rgba(76, 175, 80, 0.1)';
  xpDiv.style.padding = '10px';
  xpDiv.style.borderRadius = '10px';
  xpDiv.style.width = '48%';
  const xpLabel = document.createElement('div');
  xpLabel.style.fontSize = '12px';
  xpLabel.style.color = 'var(--text-light)';
  xpLabel.textContent = 'XP';
  const xpValue = document.createElement('div');
  xpValue.style.fontWeight = 'bold';
  xpValue.style.color = 'var(--primary-color)';
  xpValue.textContent = lesson.xp;
  xpDiv.appendChild(xpLabel);
  xpDiv.appendChild(xpValue);

  const questionsDiv = document.createElement('div');
  questionsDiv.style.background = 'rgba(255, 193, 7, 0.1)';
  questionsDiv.style.padding = '10px';
  questionsDiv.style.borderRadius = '10px';
  questionsDiv.style.width = '48%';
  const questionsLabel = document.createElement('div');
  questionsLabel.style.fontSize = '12px';
  questionsLabel.style.color = 'var(--text-light)';
  questionsLabel.textContent = 'Въпроси';
  const questionsValue = document.createElement('div');
  questionsValue.style.fontWeight = 'bold';
  questionsValue.style.color = 'var(--secondary-color)';
  questionsValue.textContent = lesson.questions ? lesson.questions.length : '3';
  questionsDiv.appendChild(questionsLabel);
  questionsDiv.appendChild(questionsValue);

  statsDiv.appendChild(xpDiv);
  statsDiv.appendChild(questionsDiv);
  modalContent.appendChild(statsDiv);

  const startBtn = document.createElement('button');
  startBtn.className = 'btn';
  startBtn.id = 'startLessonBtn';
  startBtn.style.width = '100%';
  const playIcon = document.createElement('i');
  playIcon.className = 'fas fa-play';
  startBtn.appendChild(playIcon);
  startBtn.appendChild(document.createTextNode(' Започни урока'));
  modalContent.appendChild(startBtn);

  previewModal.appendChild(modalContent);
  document.body.appendChild(previewModal);

  const closePreviewBtn = document.getElementById('closePreviewModal');
  const startLessonBtn = document.getElementById('startLessonBtn');

  closePreviewBtn.addEventListener('click', () => {
    previewModal.classList.remove('active');
    setTimeout(() => previewModal.remove(), 300);
  });

  startLessonBtn.addEventListener('click', () => {
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
  const optionsContainer = document.getElementById('optionsContainer');
  const nextQuestionBtn = document.getElementById('nextQuestionBtn');
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
      explanationDiv.className = 'card-text explanation-box';
      explanationDiv.style.marginTop = '15px';
      explanationDiv.style.padding = '12px';
      explanationDiv.style.backgroundColor = 'rgba(255, 193, 7, 0.15)';
      explanationDiv.style.borderRadius = '8px';
      explanationDiv.style.fontSize = '14px';
      explanationDiv.style.color = 'var(--text-color)';
      explanationDiv.style.borderLeft = '3px solid var(--secondary-color)';
      const strong = document.createElement('strong');
      strong.textContent = 'Обяснение:';
      explanationDiv.appendChild(strong);
      explanationDiv.appendChild(document.createTextNode(' ' + explanation));
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

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.style.textAlign = 'center';

  const mainDiv = document.createElement('div');
  mainDiv.style.marginBottom = '20px';

  const iconDiv = document.createElement('div');
  iconDiv.style.width = '80px';
  iconDiv.style.height = '80px';
  iconDiv.style.backgroundColor = 'var(--primary-color)';
  iconDiv.style.borderRadius = '50%';
  iconDiv.style.display = 'flex';
  iconDiv.style.alignItems = 'center';
  iconDiv.style.justifyContent = 'center';
  iconDiv.style.margin = '0 auto 15px';
  const checkIcon = document.createElement('i');
  checkIcon.className = 'fas fa-check';
  checkIcon.style.fontSize = '36px';
  checkIcon.style.color = 'white';
  iconDiv.appendChild(checkIcon);
  mainDiv.appendChild(iconDiv);

  const h2 = document.createElement('h2');
  h2.style.marginBottom = '10px';
  h2.textContent = 'Урок завършен!';
  mainDiv.appendChild(h2);

  const p = document.createElement('p');
  p.style.color = 'var(--text-light)';
  p.textContent = `Вие отговорихте правилно на ${correctCount} от ${totalQuestions} въпроси`;
  mainDiv.appendChild(p);
  modalContent.appendChild(mainDiv);

  const statsDiv = document.createElement('div');
  statsDiv.style.display = 'flex';
  statsDiv.style.justifyContent = 'center';
  statsDiv.style.gap = '20px';
  statsDiv.style.marginBottom = '25px';

  const xpDiv = document.createElement('div');
  xpDiv.style.background = 'rgba(76, 175, 80, 0.1)';
  xpDiv.style.padding = '15px';
  xpDiv.style.borderRadius = '10px';
  xpDiv.style.minWidth = '100px';
  const xpLabel = document.createElement('div');
  xpLabel.style.fontSize = '12px';
  xpLabel.style.color = 'var(--text-light)';
  xpLabel.textContent = 'Спечелени XP';
  const xpValue = document.createElement('div');
  xpValue.style.fontWeight = 'bold';
  xpValue.style.color = 'var(--primary-color)';
  xpValue.style.fontSize = '24px';
  xpValue.textContent = `+${xpEarned}`;
  xpDiv.appendChild(xpLabel);
  xpDiv.appendChild(xpValue);
  statsDiv.appendChild(xpDiv);
  modalContent.appendChild(statsDiv);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn';
  closeBtn.id = 'closeCompletionModal';
  closeBtn.style.width = '100%';
  const doneIcon = document.createElement('i');
  doneIcon.className = 'fas fa-check';
  closeBtn.appendChild(doneIcon);
  closeBtn.appendChild(document.createTextNode(' Готово'));
  modalContent.appendChild(closeBtn);

  completionModal.appendChild(modalContent);
  document.body.appendChild(completionModal);

  const closeCompletionBtn = document.getElementById('closeCompletionModal');

  closeCompletionBtn.addEventListener('click', () => {
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
      streakCounter.innerHTML = '';
      const fireIcon = document.createElement('i');
      fireIcon.className = 'fas fa-fire';
      streakCounter.appendChild(fireIcon);
      streakCounter.appendChild(document.createTextNode(' ' + appData.streak));

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
    streakCounter.innerHTML = '';
    const fireIcon = document.createElement('i');
    fireIcon.className = 'fas fa-fire';
    streakCounter.appendChild(fireIcon);
    streakCounter.appendChild(document.createTextNode(' ' + appData.streak));
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
