// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8lPEgu2fzcHgd4CwfQ3uxU-iJMN0BpE4',
  authDomain: 'chat-app-319dd.firebaseapp.com',
  databaseURL:
    'https://chat-app-319dd-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-app-319dd',
  storageBucket: 'chat-app-319dd.appspot.com',
  messagingSenderId: '384883295980',
  appId: '1:384883295980:web:ad7a381ab2ee63f0ef07c9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
