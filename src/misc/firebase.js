import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: 'AIzaSyC8lPEgu2fzcHgd4CwfQ3uxU-iJMN0BpE4',

  authDomain: 'chat-app-319dd.firebaseapp.com',

  databaseURL:
    'https://chat-app-319dd-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'chat-app-319dd',

  storageBucket: 'chat-app-319dd.appspot.com',

  messagingSenderId: '384883295980',

  appId: '1:384883295980:web:ad7a381ab2ee63f0ef07c9',
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
