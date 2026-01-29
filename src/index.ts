// Landing page TypeScript implementation
function createLandingPage(): void {
  document.title = 'Matura Master';

  // Create main container
  const container = document.createElement('div');
  container.className = 'container';

  // Create header
  const header = document.createElement('header');
  header.className = 'main-header';

  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.innerHTML = `
    <div class="logo-icon">MM</div>
    <span>Matura Master</span>
  `;

  const headerActions = document.createElement('div');
  headerActions.className = 'header-actions';

  const loginBtn = document.createElement('a');
  loginBtn.href = 'auth.html';
  loginBtn.className = 'login-btn';
  loginBtn.setAttribute('role', 'button');
  loginBtn.textContent = 'Вход / Регистрация';

  headerActions.appendChild(loginBtn);
  header.appendChild(logo);
  header.appendChild(headerActions);

  // Create main content
  const main = document.createElement('main');
  main.className = 'main-content';

  // Hero section
  const heroSection = document.createElement('section');
  heroSection.className = 'hero-section';

  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';

  const heroTitle = document.createElement('h1');
  heroTitle.className = 'hero-title';
  heroTitle.textContent = 'Добре дошли в Matura Master';

  const heroText = document.createElement('p');
  heroText.className = 'hero-text';
  heroText.textContent = 'Вашият интерактивен помощник за Националното Външно Оценяване по Български език и Литература след 7 клас';

  const heroBtn = document.createElement('a');
  heroBtn.href = 'auth.html';
  heroBtn.className = 'btn btn-hero';
  heroBtn.setAttribute('role', 'button');
  heroBtn.textContent = 'Започни сега';

  heroCard.appendChild(heroTitle);
  heroCard.appendChild(heroText);
  heroCard.appendChild(heroBtn);
  heroSection.appendChild(heroCard);

  // Features section
  const featuresSection = document.createElement('section');
  featuresSection.className = 'features-section';

  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'features-grid';

  const features = [
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Интерактивни уроци',
      desc: 'Учи чрез игровизирани упражнения и нива, точно като в любимите ти образователни приложения.'
    },
    {
      icon: 'fas fa-robot',
      title: 'BAI Ганьо',
      desc: 'Нашият AI асистент ще ти помогне с твоите въпроси по български език и литература.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Персонализиран прогрес',
      desc: 'Следи напредъка си и получавай препоръки за подобряване на знанията си.'
    }
  ];

  features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.className = 'feature-card';

    const icon = document.createElement('i');
    icon.className = `${feature.icon} feature-icon`;

    const title = document.createElement('h3');
    title.className = 'feature-title';
    title.textContent = feature.title;

    const desc = document.createElement('p');
    desc.className = 'feature-desc';
    desc.textContent = feature.desc;

    featureCard.appendChild(icon);
    featureCard.appendChild(title);
    featureCard.appendChild(desc);
    featuresGrid.appendChild(featureCard);
  });

  featuresSection.appendChild(featuresGrid);

  // Assemble the page
  main.appendChild(heroSection);
  main.appendChild(featuresSection);

  container.appendChild(header);
  container.appendChild(main);

  document.body.appendChild(container);
}

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', createLandingPage);
