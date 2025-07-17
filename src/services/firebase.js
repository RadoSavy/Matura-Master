import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUEF24NtGtaoQ-f-KmTTOcdX5jCAjhqkY",
  authDomain: "matura-master-9fac8.firebaseapp.com",
  projectId: "matura-master-9fac8",
  storageBucket: "matura-master-9fac8.firebasestorage.app",
  messagingSenderId: "885582348243",
  appId: "1:885582348243:web:d7e27a7da880a416c6b926",
  measurementId: "G-RYNM1RN9XF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = () => signOut(auth);

export const loginWithGoogle = async (googleToken) => {
  const credential = GoogleAuthProvider.credential(null, googleToken);
  return signInWithCredential(auth, credential);
};