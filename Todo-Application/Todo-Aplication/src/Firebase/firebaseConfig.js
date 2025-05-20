import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 
  apiKey: "AIzaSyBFI_fXz9Ujil4XTJ8h8C_biLfO-WYQQ1E",
  authDomain: "todo-application-6fc8a.firebaseapp.com",
  projectId: "todo-application-6fc8a",
  storageBucket: "todo-application-6fc8a.firebasestorage.app",
  messagingSenderId: "330541396133",
  appId: "1:330541396133:web:2782436a6ea967b095dd4c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);