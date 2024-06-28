// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Corrected import


const firebaseConfig = {
  apiKey: "AIzaSyCDnAtbdr7ZD0-l30fhQv0RDT1gDLhX2D4",
  authDomain: "blogproject2-de6ed.firebaseapp.com",
  projectId: "blogproject2-de6ed",
  storageBucket: "blogproject2-de6ed.appspot.com",
  messagingSenderId: "1060846147895",
  appId: "1:1060846147895:web:68ff070c50d3cf220362b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
