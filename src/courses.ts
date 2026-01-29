// Courses page TypeScript implementation
function createCoursesPage(): void {
  document.title = 'Курсове - Matura Master';

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
    { href: 'courses.html', icon: 'fas fa-book', text: 'Предмети', active: true },
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

  const courseList = document.createElement('div');
  courseList.className = 'course-list';

  const courses = [
    {
      href: 'bulgarian.html',
      img: 'images/Bulgarian.png',
      alt: 'Български език',
      title: 'Български език',
      desc: 'Граматика и правопис'
    },
    {
      href: 'literature.html',
      img: 'images/Literature.png',
      alt: 'Литература',
      title: 'Литература',
      desc: 'Анализи на произведения и автори'
    }
  ];

  courses.forEach(course => {
    const courseCard = document.createElement('a');
    courseCard.href = course.href;
    courseCard.className = 'course-card';
    courseCard.setAttribute('tabindex', '0');

    const img = document.createElement('img');
    img.src = course.img;
    img.alt = course.alt;

    const title = document.createElement('span');
    title.textContent = course.title;

    const desc = document.createElement('p');
    desc.textContent = course.desc;

    courseCard.appendChild(img);
    courseCard.appendChild(title);
    courseCard.appendChild(desc);
    courseList.appendChild(courseCard);
  });

  main.appendChild(courseList);

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

  // Assemble the page
  document.body.appendChild(header);
  document.body.appendChild(desktopNav);
  document.body.appendChild(main);
  document.body.appendChild(mobileNav);
}

// Initialize the courses page when DOM is loaded
document.addEventListener('DOMContentLoaded', createCoursesPage);
