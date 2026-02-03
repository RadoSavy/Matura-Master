import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = () => signOut(auth);

export const loginWithGoogle = async (googleToken) => {
  const credential = GoogleAuthProvider.credential(null, googleToken);
  return signInWithCredential(auth, credential);
};

export const signInEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithGooglePopup = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export { db };

// Firestore helpers
export const getLiteraryWorks = async () => {
  const worksCol = collection(db, 'literaryWorks');
  const q = query(worksCol, orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getLessons = async (collectionName = 'literatureLessons') => {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const subscribeToDoc = (collectionName, id, cb) => {
  const d = doc(db, collectionName, id);
  return onSnapshot(d, (snap) => cb({ id: snap.id, ...snap.data() }));
};
