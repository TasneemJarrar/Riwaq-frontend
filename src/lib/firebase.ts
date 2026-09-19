// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ3YeXA38h5pAEZ7sawr1Ob6BVER5NQlg",
  authDomain: "riwaq-4dbd4.firebaseapp.com",
  projectId: "riwaq-4dbd4",
  storageBucket: "riwaq-4dbd4.firebasestorage.app",
  messagingSenderId: "771773131165",
  appId: "1:771773131165:web:6f81ebb0e16fafaa10e774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();