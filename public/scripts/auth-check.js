import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { 
  getAuth, 
  onAuthStateChanged,
  signOut 
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.body.classList.add('auth-checking');

function checkAuth() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        console.log('User is logged in:', user.email);
        document.body.classList.remove('auth-checking');
        resolve(true);
      } else {
        console.log('User is not logged in, redirecting to auth.html...');
        window.location.replace('/auth.html');
        resolve(false);
      }
    });
  });
}

checkAuth();

window.checkAuth = checkAuth;

async function logout() {
  try {
    console.log('Logging out...');
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('user');
    
    window.location.replace('/auth.html');
  }
}

window.logout = logout;