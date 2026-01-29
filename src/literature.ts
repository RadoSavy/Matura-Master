// Literature page TypeScript implementation
function createLiteraturePage(): void {
  document.title = 'Литература - Matura Master';

  // Create header
  const header = document.createElement('header');

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.innerHTML = `
    <div class="logo-icon">MM</div>
    <span>Matura Master</span>
  `;

  const headerActions = document.createElement('div');
  headerActions.className = 'header-actions';

  const notificationBtn = document.createElement('button');
  notificationBtn.className = 'header-btn';
  notificationBtn.innerHTML = `
    <i class="fas fa-bell"></i>
    <span class="notification-badge">3</span>
  `;

  const gemBtn = document.createElement('button');
  gemBtn.className = 'header-btn';
  gemBtn.innerHTML = '<i class="fas fa-gem"></i>';

  const profileBtn = document.createElement('button');
  profileBtn.className = 'profile-btn';
  profileBtn.textContent = 'И';

  headerActions.appendChild(notificationBtn);
  headerActions.appendChild(gemBtn);
  headerActions.appendChild(profileBtn);

  header.appendChild(logo);
  header.appendChild(headerActions);

  // Create desktop navigation
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'desktop-nav';

  const navItems = [
    { href: 'courses.html', icon: 'fas fa-book', text: 'Предмети', active: false },
    { href: 'baiganio.html', icon: 'fas fa-robot', text: 'BAI Ганьо', active: false },
    { href: 'texts.html', icon: 'fas fa-book-reader', text: 'Произведения', active: false },
    { href: 'login.html', icon: 'fas fa-sign-out-alt', text: 'Изход', active: false }
  ];

  navItems.forEach(item => {
    const navItem = document.createElement('a');
    navItem.href = item.href;
    navItem.className = `desktop-nav-item${item.active ? ' active' : ''}`;
    navItem.innerHTML = `
      <i class="${item.icon} desktop-nav-icon"></i>
      <span>${item.text}</span>
    `;
    desktopNav.appendChild(navItem);
  });

  // Create main content
  const main = document.createElement('main');

  const contentArea = document.createElement('div');
  contentArea.className = 'content-area';

  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';

  const unitTitle = document.createElement('h1');
  unitTitle.className = 'unit-title';
  unitTitle.textContent = 'Литература';

  sectionHeader.appendChild(unitTitle);

  // Daily tasks card
  const dailyTasksCard = document.createElement('div');
  dailyTasksCard.className = 'card';

  const dailyTasksTitle = document.createElement('h2');
  dailyTasksTitle.className = 'card-title';
  dailyTasksTitle.textContent = 'Дневни задачи';

  const dailyTasksText = document.createElement('p');
  dailyTasksText.className = 'card-text';
  dailyTasksText.textContent = 'Завършете 3 урока';

  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';

  const progressText = document.createElement('div');
  progressText.className = 'progress-text';

  const progressLabel = document.createElement('span');
  progressLabel.textContent = 'Прогрес';

  const progressValue = document.createElement('span');
  progressValue.textContent = '0/3';

  progressText.appendChild(progressLabel);
  progressText.appendChild(progressValue);

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';

  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill';
  progressFill.id = 'leaderboardProgress';
  progressFill.style.width = '0%';

  progressBar.appendChild(progressFill);
  progressContainer.appendChild(progressText);
  progressContainer.appendChild(progressBar);

  dailyTasksCard.appendChild(dailyTasksTitle);
  dailyTasksCard.appendChild(dailyTasksText);
  dailyTasksCard.appendChild(progressContainer);

  // Section 1 header
  const section1Title = document.createElement('h2');
  section1Title.className = 'card-title';
  section1Title.style.marginBottom = '15px';
  section1Title.textContent = 'Раздел 1: Българинът във възрожденския свят';

  const lessonGrid1 = document.createElement('div');
  lessonGrid1.className = 'lesson-grid';
  lessonGrid1.id = 'lessonGrid1';

  // Section 2 header
  const section2Title = document.createElement('h2');
  section2Title.className = 'card-title';
  section2Title.style.marginBottom = '15px';
  section2Title.textContent = 'Раздел 2: Човекът в обществото - норми, ценности и конфликти';

  const lessonGrid2 = document.createElement('div');
  lessonGrid2.className = 'lesson-grid';
  lessonGrid2.id = 'lessonGrid2';

  contentArea.appendChild(sectionHeader);
  contentArea.appendChild(dailyTasksCard);
  contentArea.appendChild(section1Title);
  contentArea.appendChild(lessonGrid1);
  contentArea.appendChild(section2Title);
  contentArea.appendChild(lessonGrid2);

  main.appendChild(contentArea);

  // Create mobile navigation
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-nav';

  const mobileNavItems = [
    { href: 'courses.html', icon: 'fas fa-book', text: 'Предмети' },
    { href: 'baiganio.html', icon: 'fas fa-robot', text: 'BAI Ганьо' },
    { href: 'texts.html', icon: 'fas fa-book-reader', text: 'Текстове' },
    { href: 'login.html', icon: 'fas fa-sign-out-alt', text: 'Изход' }
  ];

  mobileNavItems.forEach(item => {
    const navItem = document.createElement('a');
    navItem.href = item.href;
    navItem.className = 'nav-item';
    navItem.innerHTML = `
      <i class="${item.icon} nav-icon"></i>
      <span>${item.text}</span>
    `;
    mobileNav.appendChild(navItem);
  });

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'lessonModal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeModal = document.createElement('button');
  closeModal.className = 'close-modal';
  closeModal.id = 'closeModal';
  closeModal.innerHTML = '&times;';

  const lessonHeader = document.createElement('div');
  lessonHeader.className = 'lesson-header';

  const lessonType = document.createElement('div');
  lessonType.className = 'lesson-type';
  lessonType.textContent = 'Заглавие';

  const lessonQuestion = document.createElement('div');
  lessonQuestion.className = 'lesson-question';
  lessonQuestion.id = 'lessonQuestion';
  lessonQuestion.textContent = 'Въпрос';

  lessonHeader.appendChild(lessonType);
  lessonHeader.appendChild(lessonQuestion);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';
  optionsContainer.id = 'optionsContainer';

  // Create option buttons
  const options = [
    { text: 'Отговор 1', correct: false },
    { text: 'Отговор 2', correct: false },
    { text: 'Отговор 3', correct: true },
    { text: 'Отговор 4', correct: false }
  ];

  options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option-btn';
    optionBtn.textContent = option.text;
    optionBtn.onclick = () => checkAnswer(optionBtn, option.correct);
    optionsContainer.appendChild(optionBtn);
  });

  const lessonFooter = document.createElement('div');
  lessonFooter.className = 'lesson-footer';

  const xpBadge = document.createElement('div');
  xpBadge.className = 'xp-badge';
  xpBadge.textContent = '+10 XP';

  const nextQuestionBtn = document.createElement('button');
  nextQuestionBtn.className = 'btn btn-sm';
  nextQuestionBtn.id = 'nextQuestionBtn';
  nextQuestionBtn.textContent = 'Следващ въпрос';

  lessonFooter.appendChild(xpBadge);
  lessonFooter.appendChild(nextQuestionBtn);

  modalContent.appendChild(closeModal);
  modalContent.appendChild(lessonHeader);
  modalContent.appendChild(optionsContainer);
  modalContent.appendChild(lessonFooter);

  modal.appendChild(modalContent);

  // Assemble the page
  document.body.appendChild(header);
  document.body.appendChild(desktopNav);
  document.body.appendChild(main);
  document.body.appendChild(mobileNav);
  document.body.appendChild(modal);

  // Initialize functionality
  initializeLiteratureLogic();
}

function initializeLiteratureLogic(): void {
  // Modal functionality
  const modal = document.getElementById('lessonModal') as HTMLElement;
  const closeModal = document.getElementById('closeModal') as HTMLElement;

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Lesson grid population (placeholder - would be populated from data)
  const lessonGrid1 = document.getElementById('lessonGrid1') as HTMLElement;
  const lessonGrid2 = document.getElementById('lessonGrid2') as HTMLElement;

  // This would typically load lessons from a database or configuration
  // For now, we'll create placeholder lesson cards
  createLessonCards(lessonGrid1, 1);
  createLessonCards(lessonGrid2, 2);
}

function createLessonCards(container: HTMLElement, section: number): void {
  // Placeholder lesson cards - in a real implementation, this would come from data
  const lessons = [
    { id: 1, title: 'Урок 1', completed: false, locked: false },
    { id: 2, title: 'Урок 2', completed: false, locked: true },
    { id: 3, title: 'Урок 3', completed: false, locked: true }
  ];

  lessons.forEach(lesson => {
    const lessonCard = document.createElement('div');
    lessonCard.className = `lesson-card${lesson.locked ? ' locked' : ''}${lesson.completed ? ' completed' : ''}`;

    const lessonIcon = document.createElement('div');
    lessonIcon.className = 'lesson-icon';
    lessonIcon.innerHTML = lesson.locked ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-play"></i>';

    const lessonTitle = document.createElement('div');
    lessonTitle.className = 'lesson-title';
    lessonTitle.textContent = lesson.title;

    lessonCard.appendChild(lessonIcon);
    lessonCard.appendChild(lessonTitle);

    if (!lesson.locked) {
      lessonCard.addEventListener('click', () => openLessonModal(lesson));
    }

    container.appendChild(lessonCard);
  });
}

function openLessonModal(lesson: any): void {
  const modal = document.getElementById('lessonModal') as HTMLElement;
  const lessonQuestion = document.getElementById('lessonQuestion') as HTMLElement;

  lessonQuestion.textContent = `Въпрос от ${lesson.title}`;
  modal.classList.add('active');
}

function checkAnswer(button: HTMLElement, isCorrect: boolean): void {
  const optionsContainer = document.getElementById('optionsContainer') as HTMLElement;
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  buttons.forEach(btn => {
    btn.classList.remove('correct', 'incorrect');
    (btn as HTMLElement).style.pointerEvents = 'none';
  });

  if (isCorrect) {
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
  }
}

// Initialize the literature page when DOM is loaded
document.addEventListener('DOMContentLoaded', createLiteraturePage);
