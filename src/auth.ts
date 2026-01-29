interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

declare const google: {
  accounts: {
    id: {
      initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
      renderButton: (element: HTMLElement | null, options: Record<string, unknown>) => void;
    };
  };
};

declare const jwt_decode: (token: string) => GoogleUser;

// Create the auth page structure
function createAuthPage(): void {
  document.title = 'Вход / Регистрация - Matura Master';

  // Create main container
  const authContainer = document.createElement('div');
  authContainer.className = 'auth-container';

  // Create logo
  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.innerHTML = `
    <div class="logo-icon">MM</div>
    <span>Matura Master</span>
  `;

  // Create tabs
  const authTabs = document.createElement('div');
  authTabs.className = 'auth-tabs';

  const loginTab = document.createElement('button');
  loginTab.className = 'auth-tab active';
  loginTab.id = 'login-tab';
  loginTab.textContent = 'Вход';

  const registerTab = document.createElement('button');
  registerTab.className = 'auth-tab';
  registerTab.id = 'register-tab';
  registerTab.textContent = 'Регистрация';

  authTabs.appendChild(loginTab);
  authTabs.appendChild(registerTab);

  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.id = 'error';
  errorDiv.className = 'error-message';
  errorDiv.style.display = 'none';
  errorDiv.setAttribute('aria-live', 'assertive');

  // Create login form
  const loginForm = document.createElement('form');
  loginForm.id = 'login-form';
  loginForm.className = 'auth-form active';

  loginForm.innerHTML = `
    <div class="input-group">
      <i class="fas fa-user"></i>
      <input type="text" id="login-username" placeholder="Потребителско име" required />
    </div>
    <div class="input-group">
      <i class="fas fa-lock"></i>
      <input type="password" id="login-password" placeholder="Парола" required />
    </div>
    <button type="submit" class="btn-main">
      <i class="fas fa-sign-in-alt"></i> Влез
    </button>
    <div class="divider"><span>или</span></div>
    <div id="google-login-btn" class="google-btn"></div>
    <p class="auth-footer">Нямаш акаунт? <a href="#" id="show-register">Регистрирай се</a></p>
  `;

  // Create register form
  const registerForm = document.createElement('form');
  registerForm.id = 'register-form';
  registerForm.className = 'auth-form';

  registerForm.innerHTML = `
    <div class="input-group">
      <i class="fas fa-user"></i>
      <input type="text" id="register-username" placeholder="Потребителско име" required />
    </div>
    <div class="input-group">
      <i class="fas fa-envelope"></i>
      <input type="email" id="register-email" placeholder="Имейл адрес" required />
    </div>
    <div class="input-group">
      <i class="fas fa-lock"></i>
      <input type="password" id="register-password" placeholder="Парола" required />
    </div>
    <button type="submit" class="btn-main">
      <i class="fas fa-user-plus"></i> Регистрирай се
    </button>
    <div class="divider"><span>или</span></div>
    <div id="google-register-btn" class="google-btn"></div>
    <p class="auth-footer">Вече имаш акаунт? <a href="#" id="show-login">Влез</a></p>
  `;

  // Assemble the page
  authContainer.appendChild(logo);
  authContainer.appendChild(authTabs);
  authContainer.appendChild(errorDiv);
  authContainer.appendChild(loginForm);
  authContainer.appendChild(registerForm);

  document.body.appendChild(authContainer);

  // Initialize functionality
  initializeAuthLogic();
}

function initializeAuthLogic(): void {
  const loginTab = document.getElementById('login-tab') as HTMLButtonElement;
  const registerTab = document.getElementById('register-tab') as HTMLButtonElement;
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('register-form') as HTMLFormElement;
  const showRegisterLink = document.getElementById('show-register') as HTMLAnchorElement;
  const showLoginLink = document.getElementById('show-login') as HTMLAnchorElement;
  const errorDiv = document.getElementById('error') as HTMLDivElement;

  function showLogin(): void {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  }

  function showRegister(): void {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }

  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);
  showRegisterLink.addEventListener('click', function(e: Event): void {
    e.preventDefault();
    showRegister();
  });
  showLoginLink.addEventListener('click', function(e: Event): void {
    e.preventDefault();
    showLogin();
  });

  loginForm.addEventListener('submit', function(e: Event): void {
    e.preventDefault();
    const username = (document.getElementById('login-username') as HTMLInputElement).value.trim();
    const password = (document.getElementById('login-password') as HTMLInputElement).value.trim();

    if (!username || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (username.length < 3 || password.length < 6) {
      showError('Минимална дължина: име (3), парола (6)');
      return;
    }

    hideError();
    window.location.href = 'courses.html';
  });

  registerForm.addEventListener('submit', function(e: Event): void {
    e.preventDefault();
    const username = (document.getElementById('register-username') as HTMLInputElement).value.trim();
    const email = (document.getElementById('register-email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('register-password') as HTMLInputElement).value.trim();

    if (!username || !email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (username.length < 3 || password.length < 6) {
      showError('Минимална дължина: име (3), парола (6)');
      return;
    }

    if (!validateEmail(email)) {
      showError('Моля, въведете валиден имейл адрес.');
      return;
    }

    hideError();
    window.location.href = 'courses.html';
  });

  function showError(message: string): void {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  function hideError(): void {
    errorDiv.style.display = 'none';
  }

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (typeof google !== 'undefined') {
    google.accounts.id.initialize({
      client_id: "562285484934-sbe73anaak500lghj135hqv2pfev8rld.apps.googleusercontent.com",
      callback: handleGoogleResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "continue_with",
        shape: "pill"
      }
    );

    google.accounts.id.renderButton(
      document.getElementById("google-register-btn"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "continue_with",
        shape: "pill"
      }
    );
  }

  function handleGoogleResponse(response: { credential: string }): void {
    const token = response.credential;
    const user = jwt_decode(token);

    console.log("Google вход успешен:", user);

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = 'courses.html';
  }
}

// Initialize the auth page when DOM is loaded
document.addEventListener('DOMContentLoaded', createAuthPage);
