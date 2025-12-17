document.addEventListener('DOMContentLoaded', function () {
  console.log("Auth page loaded");
  
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const errorDiv = document.getElementById('error');

  // Tab switching functions
  function showLogin() {
    console.log("Showing login form");
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    hideError();
  }

  function showRegister() {
    console.log("Showing register form");
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    hideError();
  }

  // Event listeners for tab switching
  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);
  showRegisterLink.addEventListener('click', function (e) {
    e.preventDefault();
    showRegister();
  });
  showLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    showLogin();
  });

  // Email/Password login
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("Login form submitted");
    
    const email = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Basic validation
    if (!email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (!validateEmail(email)) {
      showError('Моля, въведете валиден имейл адрес.');
      return;
    }

    if (password.length < 6) {
      showError('Паролата трябва да е поне 6 символа.');
      return;
    }

    try {
      console.log("Attempting Firebase login...");
      
      // Check if Firebase auth is available
      if (!window.firebaseAuth || !window.signInWithEmailAndPassword) {
        throw new Error("Firebase authentication not initialized");
      }

      const userCredential = await window.signInWithEmailAndPassword(
        window.firebaseAuth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log('Login successful:', user.email);
      
      // Store user info
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0]
      };
      
      localStorage.setItem("user", JSON.stringify(userInfo));
      console.log("Redirecting to courses page...");
      window.location.href = 'courses.html';
      
    } catch (error) {
      console.error('Login failed:', error);
      let errorMessage = 'Грешка при входа.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Потребител с този имейл не е намерен.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Грешна парола. Моля, опитайте отново.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Невалиден имейл адрес.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Твърде много опити за вход. Моля, опитайте по-късно.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Мрежова грешка. Моля, проверете връзката с интернет.';
      }
      
      showError(errorMessage);
    }
  });

  // Email/Password registration
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("Register form submitted");
    
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    // Basic validation
    if (!username || !email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (username.length < 3) {
      showError('Потребителското име трябва да е поне 3 символа.');
      return;
    }

    if (!validateEmail(email)) {
      showError('Моля, въведете валиден имейл адрес.');
      return;
    }

    if (password.length < 6) {
      showError('Паролата трябва да е поне 6 символа.');
      return;
    }

    try {
      console.log("Attempting Firebase registration...");
      
      // Check if Firebase auth is available
      if (!window.firebaseAuth || !window.createUserWithEmailAndPassword) {
        throw new Error("Firebase authentication not initialized");
      }

      const userCredential = await window.createUserWithEmailAndPassword(
        window.firebaseAuth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log('Registration successful:', user.email);
      
      // Store user info with username
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: username
      };
      
      localStorage.setItem("user", JSON.stringify(userInfo));
      console.log("Redirecting to courses page...");
      window.location.href = 'courses.html';
      
    } catch (error) {
      console.error('Registration failed:', error);
      let errorMessage = 'Грешка при регистрацията.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Имейлът вече се използва от друг акаунт.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Паролата е твърде слаба. Използвайте поне 6 символа.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Невалиден имейл адрес.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Регистрацията с имейл е забранена в момента.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Мрежова грешка. Моля, проверете връзката с интернет.';
      }
      
      showError(errorMessage);
    }
  });

  // Helper functions
  function showError(message) {
    console.log("Showing error:", message);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Auto-hide error after 5 seconds
    setTimeout(hideError, 5000);
  }

  function hideError() {
    errorDiv.style.display = 'none';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Test Firebase connection
  function testFirebaseConnection() {
    console.log("Testing Firebase connection...");
    console.log("firebaseAuth available:", !!window.firebaseAuth);
    console.log("signInWithEmailAndPassword available:", !!window.signInWithEmailAndPassword);
    console.log("createUserWithEmailAndPassword available:", !!window.createUserWithEmailAndPassword);
    console.log("signInWithPopup available:", !!window.signInWithPopup);
    console.log("googleProvider available:", !!window.googleProvider);
  }

  // Run test
  setTimeout(testFirebaseConnection, 1000);

  // Check if user is already logged in
  function checkExistingSession() {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.uid && userData.email) {
          console.log('User already logged in from localStorage');
        }
      } catch (e) {
        console.log('Invalid user data in localStorage');
        localStorage.removeItem('user');
      }
    }
  }

  // Check for existing session
  checkExistingSession();
});