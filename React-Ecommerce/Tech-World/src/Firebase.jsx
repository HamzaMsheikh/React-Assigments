import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-QCsjrvEE2czAkxgKJuO0LoSu3fyqDbg",
    authDomain: "react-ecommerce-6da1b.firebaseapp.com",
    projectId: "react-ecommerce-6da1b",
    storageBucket: "react-ecommerce-6da1b.firebasestorage.app",
    messagingSenderId: "1078282158966",
    appId: "1:1078282158966:web:0b87406f2d735318adb057"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app)

export { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, db };