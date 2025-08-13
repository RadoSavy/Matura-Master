document.addEventListener('DOMContentLoaded', function() {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const errorDiv = document.getElementById('error');

  function showLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
  }

  function showRegister() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
  }

  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);
  showRegisterLink.addEventListener('click', function(e) {
    e.preventDefault();
    showRegister();
  });
  showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLogin();
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

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

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

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

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }

  function hideError() {
    errorDiv.style.display = 'none';
  }

  function validateEmail(email) {
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

  function handleGoogleResponse(response) {
    const token = response.credential;
    const user = jwt_decode(token);

    console.log("Google вход успешен:", user);

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = 'courses.html';
  }
});