// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyBOCFnmvI8xYk_nE8-r7IEBmgMA9YTJ1U8',
  authDomain: 'chat-app-dbe78.firebaseapp.com',
  projectId: 'chat-app-dbe78',
  storageBucket: 'chat-app-dbe78.appspot.com',
  messagingSenderId: '958363051955',
  appId: '1:958363051955:web:a81e6466edf86399dfcdc6',
  measurementId: 'G-TKDEVNB47B',
});

// Initialize Firebase
export const getUser = () => new Promise((resolve, reject) => onAuthStateChanged(getAuth(), resolve, reject));
