import type { AppData, Lesson, Question } from './types';
import { safeJSONParse, safeNumberParse } from './types';

// App state with proper typing
const appData: AppData = {
  currentLesson: 1,
  completedLessons: safeJSONParse<number[]>('completedLessons', []),
  dailyQuests: [
      { id: 1, text: "Прегледай всички материали", completed: false },
      { id: 2, text: "Спечели 20 XP", completed: false },
      { id: 3, text: "0/3 уроци", completed: false, progress: 0, target: 3 }
  ],
  xp: safeNumberParse('xp', 0),
  leaderboardProgress: safeNumberParse('leaderboardProgress', 0),
  streak: safeNumberParse('streak', 0)
};

// Lessons data with proper typing
const lessons: Lesson[] = [
  {
    id: 1,
    title: "Текстът в масовата комуникация. Информационна бележка",
    xp: 20,
    description: "Научи как работят медиите, какво прави една новина силна и как да разпознаваш типовете медийни текстове",
    icon: "📡",
    content: `<div class="lesson-content">
      <h3>📣 Какво представлява масовата комуникация?</h3>
      <p>Това е общуване, което достига до огромна аудитория чрез посредник – <strong>медия</strong>.</p>
    </div>`,
    questions: [
        {
            question: "Кое НЕ е предназначение на медийния текст?",
            options: [
                { text: "Да информира за актуални събития", correct: false },
                { text: "Да развлича аудиторията", correct: false },
                { text: "Да влияе на общественото мнение", correct: false },
                { text: "Да създава метафорични художествени светове", correct: true }
            ],
            explanation: "Медийният текст може да съдържа емоции, но не е художествено произведение."
        },
        {
            question: "Кой е основният признак на информационната бележка?",
            options: [
                { text: "Силно емоционален език", correct: false },
                { text: "Краткост, фактичност и актуалност", correct: true },
                { text: "Подробни описания и художествена образност", correct: false },
                { text: "Субективни оценки и лични мнения", correct: false }
            ],
            explanation: "Информационната бележка представя факти ясно и кратко, без коментар."
        }
    ]
  },
  // Add more lessons as needed...
];

// DOM Elements with proper typing
const lessonModal = document.getElementById('lessonModal') as HTMLDivElement;
const closeModal = document.getElementById('closeModal') as HTMLButtonElement;
const lessonQuestion = document.getElementById('lessonQuestion') as HTMLDivElement;
const optionsContainer = document.getElementById('optionsContainer') as HTMLDivElement;
const nextQuestionBtn = document.getElementById('nextQuestionBtn') as HTMLButtonElement;
const leaderboardProgress = document.getElementById('leaderboardProgress') as HTMLDivElement;

// State variables
let currentLessonId: number = 0;
let currentQuestions: Question[] = [];
let currentQuestionIndex: number = 0;
let correctAnswersCount: number = 0;

function initApp(): void {
    renderLessons();
    updateProgress();
    checkDailyStreak();
    setupEventListeners();
}

function renderLessons(): void {
    for (let i = 1; i <= 6; i++) {
        const grid = document.getElementById(`lessonGrid${i}`) as HTMLDivElement;
        if (!grid) continue;
        
        grid.innerHTML = '';
        
        const sectionLessons = lessons.filter(l => 
            (i === 1 && l.id <= 3) ||
            (i === 2 && l.id >= 4 && l.id <= 6) ||
            (i === 3 && l.id >= 7 && l.id <= 9) ||
            (i === 4 && l.id >= 10 && l.id <= 12) ||
            (i === 5 && l.id >= 13 && l.id <= 15) ||
            (i === 6 && l.id >= 16)
        );
        
        sectionLessons.forEach((lesson: Lesson) => {
            const isCompleted = appData.completedLessons.includes(lesson.id);
            const lessonCard = document.createElement('div');
            lessonCard.className = `lesson-card ${isCompleted ? 'completed' : ''} ${lesson.locked ? 'locked' : ''}`;
            lessonCard.innerHTML = `
                <div class="lesson-icon">${lesson.icon}</div>
                <h3 class="lesson-name">${lesson.title}</h3>
                <p class="lesson-desc">${lesson.description}</p>
                <div class="lesson-xp">+${lesson.xp} XP</div>
                ${isCompleted ? '<div class="completion-badge"><i class="fas fa-check-circle"></i></div>' : ''}
            `;
            
            if (!lesson.locked) {
                lessonCard.addEventListener('click', () => showLessonPreview(lesson));
            }
            
            grid.appendChild(lessonCard);
        });
    }
}

function showLessonPreview(lesson: Lesson): void {
    currentLessonId = lesson.id;
    currentQuestions = lesson.questions;
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    
    lessonModal.classList.add('active');
    showQuestion();
}

function showQuestion(): void {
    if (currentQuestionIndex >= currentQuestions.length) {
        completeLesson();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    lessonQuestion.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.addEventListener('click', () => checkAnswer(button, option.correct));
        optionsContainer.appendChild(button);
    });
    
    nextQuestionBtn.style.display = 'none';
}

function checkAnswer(button: HTMLButtonElement, isCorrect: boolean): void {
    const allButtons = optionsContainer.querySelectorAll('.option-btn') as NodeListOf<HTMLButtonElement>;
    allButtons.forEach((btn: HTMLButtonElement) => btn.disabled = true);
    
    if (isCorrect) {
        button.classList.add('correct');
        correctAnswersCount++;
    } else {
        button.classList.add('wrong');
        const correctBtn = Array.from(allButtons).find((btn: HTMLButtonElement) => 
            currentQuestions[currentQuestionIndex].options.find(
                opt => opt.text === btn.textContent && opt.correct
            )
        );
        if (correctBtn) correctBtn.classList.add('correct');
    }
    
    nextQuestionBtn.style.display = 'block';
}

function nextQuestion(): void {
    currentQuestionIndex++;
    showQuestion();
}

function completeLesson(): void {
    if (!appData.completedLessons.includes(currentLessonId)) {
        appData.completedLessons.push(currentLessonId);
        localStorage.setItem('completedLessons', JSON.stringify(appData.completedLessons));
        
        const lesson = lessons.find(l => l.id === currentLessonId);
        if (!lesson) return;
        
        const xpEarned = Math.floor(lesson.xp * (correctAnswersCount / currentQuestions.length));
        appData.xp += xpEarned;
        localStorage.setItem('xp', appData.xp.toString());
        
        appData.leaderboardProgress++;
        localStorage.setItem('leaderboardProgress', appData.leaderboardProgress.toString());
        
        updateStreak();
        updateProgress();
        
        showCompletionModal(xpEarned, correctAnswersCount, currentQuestions.length);
    } else {
        closeLessonModal();
    }
}

function showCompletionModal(xpEarned: number, correctCount: number, totalQuestions: number): void {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>Урок завършен!</h2>
            <p>Вие отговорихте правилно на ${correctCount} от ${totalQuestions} въпроси</p>
            <div>
                <div style="font-weight: bold; color: var(--primary-color); font-size: 24px;">+${xpEarned} XP</div>
            </div>
            <button class="btn" id="closeCompletionModal">Готово</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = document.getElementById('closeCompletionModal') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        modal.remove();
        closeLessonModal();
        renderLessons();
    });
}

function closeLessonModal(): void {
    lessonModal.classList.remove('active');
}

function updateProgress(): void {
    const progressPercent = Math.min((appData.leaderboardProgress / 3) * 100, 100);
    leaderboardProgress.style.width = `${progressPercent}%`;
}

function updateStreak(): void {
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
        
        localStorage.setItem('streak', appData.streak.toString());
        localStorage.setItem('lastCompletedDate', today);
    }
}

function checkDailyStreak(): void {
    const lastCompletedDate = localStorage.getItem('lastCompletedDate');
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastCompletedDate && lastCompletedDate !== today && lastCompletedDate !== yesterday.toDateString()) {
        appData.streak = 0;
        localStorage.setItem('streak', '0');
    }
}

function setupEventListeners(): void {
    closeModal.addEventListener('click', closeLessonModal);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    
    lessonModal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === lessonModal) {
            closeLessonModal();
        }
    });
    
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (lessonModal.classList.contains('active') && e.key === 'Escape') {
            closeLessonModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);