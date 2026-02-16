// Authentication check for protected pages
// This script checks if the user is logged in via Firebase Auth
// If not logged in, redirects to auth.html

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { 
  getAuth, 
  onAuthStateChanged,
  signOut 
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to check authentication and redirect if not logged in
function checkAuth() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        // User is logged in, allow access
        console.log('User is logged in:', user.email);
        resolve(true);
      } else {
        // User is not logged in, redirect to auth page
        console.log('User is not logged in, redirecting...');
        window.location.href = 'auth.html';
        resolve(false);
      }
    });
  });
}

// Run auth check immediately
checkAuth();

// Export for potential use in other scripts
window.checkAuth = checkAuth;

// Logout function - signs out from Firebase and redirects to auth page
async function logout() {
  try {
    console.log('Logging out...');
    await signOut(auth);
    console.log('User signed out successfully');
    
    // Clear local storage
    localStorage.removeItem('user');
    
    // Redirect to auth page
    window.location.href = 'auth.html';
  } catch (error) {
    console.error('Logout error:', error);
    // Still redirect even if there's an error
    window.location.href = 'auth.html';
  }
}

// Export logout function to window
window.logout = logout;
