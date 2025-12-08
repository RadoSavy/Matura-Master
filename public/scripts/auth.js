document.addEventListener('DOMContentLoaded', function() {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  const errorDiv = document.getElementById('error');

  // =============================
  // Encryption utilities
  // =============================
  // Keep session AES key in-memory, accessible through closure.
  let sessionAesKey = null;

  // Utility: Generate session AES key
  async function getSessionAesKey() {
    if (sessionAesKey) return sessionAesKey;
    sessionAesKey = await window.crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    return sessionAesKey;
  }

  // Utility: Encrypt string
  async function encryptUserData(plainText) {
    const enc = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // AES-GCM
    const key = await getSessionAesKey();
    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(plainText)
    );
    // Store IV and ciphertext together (base64 for storage)
    const ivStr = btoa(String.fromCharCode(...iv));
    const ctStr = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    return ivStr + ':' + ctStr;
  }

  // NOTE: To read user data, need decryptUserData()
  async function decryptUserData(data) {
    const [ivStr, ctStr] = data.split(':');
    const iv = new Uint8Array(atob(ivStr).split("").map(c => c.charCodeAt(0)));
    const ciphertext = new Uint8Array(atob(ctStr).split("").map(c => c.charCodeAt(0)));
    const key = await getSessionAesKey();
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  }

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
      const userInfo = { uid: user.uid, email: user.email, displayName: user.displayName };
      const encryptedUserInfo = await encryptUserData(JSON.stringify(userInfo));
      localStorage.setItem("user", encryptedUserInfo);
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
      const userData = { uid: user.uid, email: user.email, displayName: user.displayName };
      // Encrypt the user data before storing
      encryptUserData(userData, password).then(encrypted => {
        localStorage.setItem("user", encrypted);
        window.location.href = 'courses.html';
      }).catch(err => {
        console.error("Failed to encrypt user data:", err);
        showError("Грешка при защита на user данните. Моля, опитайте отново.");
      });
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
      const userInfo = { uid: user.uid, email: user.email, displayName: user.displayName };
      const encryptedUserInfo = await encryptUserData(JSON.stringify(userInfo));
      localStorage.setItem("user", encryptedUserInfo);
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
      const userInfo = { uid: user.uid, email: user.email, displayName: user.displayName };
      const encryptedUserInfo = await encryptUserData(JSON.stringify(userInfo));
      localStorage.setItem("user", encryptedUserInfo);
      window.location.href = 'courses.html';
    } catch (error) {
      console.error("Google register failed:", error);
      showError("Грешка при регистрацията с Google: " + error.code);
    }
  });
/**
 * Encrypt user data (object) using password-derived AES-GCM key.
 * Returns base64 encoded ciphertext.
 */
async function encryptUserData(userData, password) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  // Derive key with PBKDF2
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      "name": "PBKDF2",
      salt: salt,
      "iterations": 100000,
      "hash": "SHA-256"
    },
    keyMaterial,
    { "name": "AES-GCM", "length": 256 },
    false,
    ["encrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const data = enc.encode(JSON.stringify(userData));
  const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data);

  // Concatenate salt + iv + ciphertext as ArrayBuffer
  // Format: [salt|iv|ciphertext]
  const concatenated = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
  concatenated.set(salt, 0);
  concatenated.set(iv, salt.length);
  concatenated.set(new Uint8Array(ciphertext), salt.length + iv.length);

  // Return as base64 string
  return btoa(String.fromCharCode.apply(null, concatenated));
}

});