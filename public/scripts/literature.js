    const appData = {
    currentLesson: 1,
    completedLessons: JSON.parse(localStorage.getItem('completedLiteratureLessons')) || [],
    dailyQuests: [
        { id: 1, text: "Прегледай всички материали", completed: false },
        { id: 2, text: "Спечели 20 XP", completed: false },
        { id: 3, text: "0/3 уроци", completed: false, progress: 0, target: 3 }
    ],
    xp: parseInt(localStorage.getItem('literatureXp')) || 0,
    leaderboardProgress: parseInt(localStorage.getItem('literatureLeaderboardProgress')) || 0,
    streak: parseInt(localStorage.getItem('literatureStreak')) || 0
};

const literatureLessons = [
    {
        id: 1,
        title: "Приказки за животни",
        xp: 10,
        crown: true,
        description: "Научете основните характеристики на приказките за животни в българския фолклор",
        icon: "🦊",
        content: `
            <div class="lesson-content">
                <h3>Приказки за животни</h3>
                <p>Приказките за животни са един от най-старите и най-разпространени видове народни приказки в българския фолклор. Те се отличават с няколко основни характеристики:</p>
                <ul>
                    <li><strong>Антропоморфизъм:</strong> Животните в тези приказки се държат като хора - говорят, мислят, работят и живеят в общество.</li>
                    <li><strong>Морални поуки:</strong> Всяка приказка завършва с ясно изразена морална поука, която учи на добродетели като трудолюбие, честност и взаимопомощ.</li>
                    <li><strong>Прости сюжети:</strong> Сюжетите са лесни за разбиране, с ясно начало, развитие и край.</li>
                    <li><strong>Типични герои:</strong> Често срещани персонажи са лисицата (хитра), вълкът (глупав), мечката (силна, но тромава), заекът (плашлив).</li>
                </ul>
                <p>Тези приказки не само забавляват, но и възпитават младото поколение, предавайки ценности от поколение на поколение.</p>
            </div>
        `,
        questions: [
            {
                question: "Коя от следните характеристики НЕ е типична за приказките за животни?",
                options: [
                    { text: "Животните притежават човешки черти", correct: false },
                    { text: "Често имат морал в края", correct: false },
                    { text: "Сложни психологически характеристики на героите", correct: true },
                    { text: "Прости и ясни сюжети", correct: false }
                ],
                explanation: "Приказките за животни са с прости сюжети и не задълбават в психологията на героите."
            },
            {
                question: "Кое животно често играе ролята на хитреца в българските приказки?",
                options: [
                    { text: "Вълкът", correct: false },
                    { text: "Лисицата", correct: true },
                    { text: "Мечката", correct: false },
                    { text: "Заекът", correct: false }
                ],
                explanation: "Лисицата е класическият хитрец в българските народни приказки."
            }
        ]
    },
    {
        id: 2,
        title: "Вълшебни приказки",
        xp: 10,
        description: "Разберете структурата и особеностите на вълшебните приказки",
        icon: "🧙",
        content: `
            <div class="lesson-content">
                <h3>Вълшебни приказки</h3>
                <p>Вълшебните приказки са сред най-популярните жанрове в българския фолклор. Те се характеризират с присъствието на свръхестествени елементи и магически сили, които помагат на героите да преодолеят препятствията.</p>
                <h4>Основни елементи:</h4>
                <ul>
                    <li><strong>Магически предмети:</strong> Вълшебна пръчка, огледало, меч, невидим плащ, летящ килим и др.</li>
                    <li><strong>Свръхестествени същества:</strong> Вълшебници, магьосници, дракони, феи, джуджета.</li>
                    <li><strong>Чудеса:</strong> Преобразяване на хора в животни, омагьосване, летене, невидимост.</li>
                    <li><strong>Изпитания:</strong> Героят трябва да премине през серия от трудни задачи.</li>
                </ul>
                <h4>Структура:</h4>
                <ol>
                    <li><strong>Въведение:</strong> Представяне на героя и началната ситуация.</li>
                    <li><strong>Развитие:</strong> Героят среща трудности и получава помощ от магически сили.</li>
                    <li><strong>Кулминация:</strong> Най-тежкото изпитание и борба със злото.</li>
                    <li><strong>Развръзка:</strong> Героят побеждава и получава награда.</li>
                </ol>
                <p>Вълшебните приказки винаги завършват с победа на доброто над злото и щастлив край.</p>
            </div>
        `,
        questions: [
            {
                question: "Кой от следните елементи е типичен за вълшебните приказки?",
                options: [
                    { text: "Магически предмети", correct: true },
                    { text: "Реалистични ситуации", correct: false },
                    { text: "Съвременни технологии", correct: false },
                    { text: "Исторически точни събития", correct: false }
                ],
                explanation: "Вълшебните приказки често включват магически предмети като пръчка, огледало или меч."
            },
            {
                question: "Какво обикновено трябва да направи героят, за да спечели награда в края?",
                options: [
                    { text: "Да премине серия от изпитания", correct: true },
                    { text: "Да спечели състезание", correct: false },
                    { text: "Да получи висше образование", correct: false },
                    { text: "Да намери работа", correct: false }
                ],
                explanation: "Вълшебните приказки често включват серия от изпитания, които героят трябва да премине."
            }
        ]
    },
    { 
        id: 3, 
        title: "Битови приказки", 
        xp: 10, 
        description: "Научете техниките за разказване на битови приказки",
        icon: "🏠",
        questions: [
            {
                question: "Каква е основната тема на битовите приказки?",
                options: [
                    { text: "Ежедневният живот и взаимоотношенията между хората", correct: true },
                    { text: "Приключения в далечни земи", correct: false },
                    { text: "Битка между доброто и злото", correct: false },
                    { text: "Животни, които говорят", correct: false }
                ],
                explanation: "Битовите приказки се фокусират върху ежедневния живот и взаимоотношенията между хората."
            }
        ]
    },
    { 
        id: 4, 
        title: "Хитър Петър", 
        xp: 15, 
        locked: true,
        description: "Анализирайте образа на Хитър Петър в българския фолклор",
        icon: "🧠"
    },
    { 
        id: 5, 
        title: "Приказки за баба Яга", 
        xp: 15, 
        locked: true,
        description: "Научете особеностите на приказките с баба Яга",
        icon: "🧙‍♀️"
    },
    { 
        id: 6, 
        title: "Алегорични приказки", 
        xp: 20, 
        locked: true,
        description: "Разберете символиката и поуките в алегоричните приказки",
        icon: "🔍"
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
    
    literatureLessons.forEach(lesson => {
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
    const lesson = literatureLessons.find(l => l.id === lessonId);
    if (!lesson) return;

    currentLessonId = lessonId;
    currentQuestionIndex = 0;
    currentQuestions = [...lesson.questions];
    correctAnswersCount = 0;

    showLessonContent();
    lessonModal.classList.add('active');
}

function showLessonContent() {
    const lesson = literatureLessons.find(l => l.id === currentLessonId);
    if (!lesson || !lesson.content) {
        showQuestion();
        return;
    }

    lessonModal.innerHTML = `
        <div class="modal-content lesson-modal-content">
            <button class="close-modal" id="closeModal"><i class="fas fa-times"></i></button>
            <div class="lesson-header">
                <div class="lesson-icon">${lesson.icon || lesson.id}</div>
                <h2>${lesson.title}</h2>
            </div>
            <div class="lesson-body">
                ${lesson.content}
            </div>
            <div class="lesson-footer">
                <button class="btn" id="startQuestionsBtn">
                    <i class="fas fa-question-circle"></i> Започни въпросите
                </button>
            </div>
        </div>
    `;

    document.getElementById('closeModal').addEventListener('click', closeLesson);
    document.getElementById('startQuestionsBtn').addEventListener('click', () => {
        showQuestion();
    });
}

function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        completeLesson();
        return;
    }

    lessonModal.innerHTML = `
        <div class="modal-content lesson-modal-content">
            <button class="close-modal" id="closeModal"><i class="fas fa-times"></i></button>
            <div class="lesson-header">
                <div class="lesson-icon">${literatureLessons.find(l => l.id === currentLessonId).icon || currentLessonId}</div>
                <h2>Въпрос ${currentQuestionIndex + 1} от ${currentQuestions.length}</h2>
            </div>
            <div class="lesson-body">
                <div class="question-container">
                    <h3 id="lessonQuestion">${currentQuestions[currentQuestionIndex].question}</h3>
                    <div class="options-container" id="optionsContainer"></div>
                </div>
            </div>
            <div class="lesson-footer">
                <button class="btn" id="nextQuestionBtn" style="display: none;">
                    <i class="fas fa-arrow-right"></i> Следващ въпрос
                </button>
            </div>
        </div>
    `;

    document.getElementById('closeModal').addEventListener('click', closeLesson);

    const question = currentQuestions[currentQuestionIndex];
    const lessonQuestion = document.getElementById('lessonQuestion');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    lessonQuestion.textContent = question.question;

    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option.text;
        optionBtn.dataset.correct = option.correct;

        optionBtn.addEventListener('click', () => selectAnswer(optionBtn, option.correct, question.explanation, nextQuestionBtn, optionsContainer));
        optionsContainer.appendChild(optionBtn);
    });

    nextQuestionBtn.style.display = 'none';
    nextQuestionBtn.addEventListener('click', nextQuestion);
}

function selectAnswer(btn, isCorrect, explanation, nextQuestionBtn, optionsContainer) {
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
        localStorage.setItem('completedLiteratureLessons', JSON.stringify(appData.completedLessons));

        const lesson = literatureLessons.find(l => l.id === currentLessonId);
        const xpEarned = Math.floor(lesson.xp * (correctAnswersCount / currentQuestions.length));
        appData.xp += xpEarned;
        localStorage.setItem('literatureXp', appData.xp);

        appData.leaderboardProgress++;
        localStorage.setItem('literatureLeaderboardProgress', appData.leaderboardProgress);

        updateStreak();
 
        updateProgress();
 
        const nextLesson = literatureLessons.find(l => l.id === currentLessonId + 1);
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
    
    if (lastCompletedDate && lastCompletedDate !== today && lastCompletedDate !== yesterday.toDateString()) {
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
        const guidebookLesson = literatureLessons.find(l => l.id === 1);
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