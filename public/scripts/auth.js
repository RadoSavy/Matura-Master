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

  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('login-username').value.trim(); // Assuming username is email
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (email.length < 3 || password.length < 6) {
      showError('Минимална дължина: име (3), парола (6)');
      return;
    }

    try {
      const userCredential = await window.signInWithEmailAndPassword(window.firebaseAuth, email, password);
      const user = userCredential.user;
      console.log("Login successful:", user);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName }));
      window.location.href = 'courses.html';
    } catch (error) {
      console.error("Login failed:", error);
      showError("Грешка при входа. Проверете имейла и паролата.");
    }
  });

  registerForm.addEventListener('submit', async function(e) {
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

    try {
      const userCredential = await window.createUserWithEmailAndPassword(window.firebaseAuth, email, password);
      const user = userCredential.user;
      console.log("Registration successful:", user);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName }));
      window.location.href = 'courses.html';
    } catch (error) {
      console.error("Registration failed:", error);
      let errorMessage = "Грешка при регистрацията.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage += " Имейлът вече е използван.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage += " Паролата е твърде слаба.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage += " Невалиден имейл адрес.";
      } else {
        errorMessage += " Моля, опитайте отново.";
      }
      showError(errorMessage);
    }
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



  document.getElementById('google-login-btn').addEventListener('click', async function(e) {
    e.preventDefault();
    try {
      const provider = new window.GoogleAuthProvider();
      const result = await window.signInWithPopup(window.firebaseAuth, provider);
      const user = result.user;
      console.log("Google login successful:", user);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName }));
      window.location.href = 'courses.html';
    } catch (error) {
      console.error("Google login failed:", error);
      showError("Грешка при входа с Google: " + error.code);
    }
  });

  document.getElementById('google-register-btn').addEventListener('click', async function(e) {
    e.preventDefault();
    try {
      const provider = new window.GoogleAuthProvider();
      const result = await window.signInWithPopup(window.firebaseAuth, provider);
      const user = result.user;
      console.log("Google register successful:", user);
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName }));
      window.location.href = 'courses.html';
    } catch (error) {
      console.error("Google register failed:", error);
      showError("Грешка при регистрацията с Google: " + error.code);
    }
  });
});