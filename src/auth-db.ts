import { firebaseService } from './firebase-service';

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

document.addEventListener('DOMContentLoaded', function(): void {
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

  // Login with email/password
  loginForm.addEventListener('submit', async function(e: Event): Promise<void> {
    e.preventDefault();
    const emailInput = document.getElementById('login-username') as HTMLInputElement;
    const password = (document.getElementById('login-password') as HTMLInputElement).value.trim();
    const email = emailInput.value.trim();

    if (!email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (password.length < 6) {
      showError('Паролата трябва да е поне 6 символа.');
      return;
    }

    try {
      showLoading(true);
      await firebaseService.signInWithEmail(email, password);
      
      hideError();
      window.location.href = 'courses.html';
    } catch (error: any) {
      console.error('Login error:', error);
      showError(getErrorMessage(error.code));
    } finally {
      showLoading(false);
    }
  });

  // Register with email/password
  registerForm.addEventListener('submit', async function(e: Event): Promise<void> {
    e.preventDefault();
    const username = (document.getElementById('register-username') as HTMLInputElement).value.trim();
    const email = (document.getElementById('register-email') as HTMLInputElement).value.trim();
    const password = (document.getElementById('register-password') as HTMLInputElement).value.trim();

    if (!username || !email || !password) {
      showError('Моля, попълнете всички полета.');
      return;
    }

    if (username.length < 3) {
      showError('Потребителското име трябва да е поне 3 символа.');
      return;
    }

    if (password.length < 6) {
      showError('Паролата трябва да е поне 6 символа.');
      return;
    }

    if (!validateEmail(email)) {
      showError('Моля, въведете валиден имейл адрес.');
      return;
    }

    try {
      showLoading(true);
      await firebaseService.signUpWithEmail(email, password, username);
      
      hideError();
      window.location.href = 'courses.html';
    } catch (error: any) {
      console.error('Registration error:', error);
      showError(getErrorMessage(error.code));
    } finally {
      showLoading(false);
    }
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

  function showLoading(loading: boolean): void {
    const buttons = document.querySelectorAll('button[type="submit"]') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      button.disabled = loading;
      if (loading) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Моля изчакайте...';
      }
    });
  }

  function getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Не е намерен потребител с този имейл.',
      'auth/wrong-password': 'Грешна парола.',
      'auth/email-already-in-use': 'Този имейл вече е регистриран.',
      'auth/invalid-email': 'Невалиден имейл адрес.',
      'auth/weak-password': 'Паролата е твърде слаба.',
      'auth/network-request-failed': 'Грешка в мрежата. Проверете интернет връзката си.',
      'auth/too-many-requests': 'Твърде много опити. Моля, опитайте по-късно.',
      'auth/user-disabled': 'Този акаунт е деактивиран.'
    };

    return errorMessages[errorCode] || 'Възникна грешка. Моля, опитайте отново.';
  }

  // Google Sign In
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

  async function handleGoogleResponse(_response: { credential: string }): Promise<void> {
    try {
      showLoading(true);

      // Sign in with Google using Firebase
      await firebaseService.signInWithGoogle();

      console.log("Google вход успешен");
      window.location.href = 'courses.html';
    } catch (error: any) {
      console.error('Google sign in error:', error);
      showError('Грешка при вход с Google. Моля, опитайте отново.');
    } finally {
      showLoading(false);
    }
  }

  // Check if user is already logged in
  const currentUser = firebaseService.getCurrentUser();
  if (currentUser) {
    window.location.href = 'courses.html';
  }
});
