import { initializeApp } from 'firebase/app';
// import {
// getFirestore,
// collection,
// limit,
// onSnapshot,
// 'firebase/firestore';
import {
  updateProfile,
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDx25v3GMhIfFvMFlA2BsTeCOqQ6a7yAao',
  authDomain: 'reactapp-bc20c.firebaseapp.com',
  projectId: 'reactapp-bc20c',
  storageBucket: 'reactapp-bc20c.appspot.com',
  messagingSenderId: '512314771847',
  appId: '1:512314771847:web:3f01f5928b51af2d8c6b22',
};

// init firebase app
initializeApp(firebaseConfig);

// init services
// const db = getFirestore();
const auth = getAuth();

export {
  // db,
  // collection,
  updateProfile,
  signOut,
  createUserWithEmailAndPassword,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
};
