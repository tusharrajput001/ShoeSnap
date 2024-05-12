// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDmfqyYZpi2P3Qec8I72ZDhYjDUPeZsUw",
  authDomain: "sneakers-mern.firebaseapp.com",
  projectId: "sneakers-mern",
  storageBucket: "sneakers-mern.appspot.com",
  messagingSenderId: "111380951193",
  appId: "1:111380951193:web:b02245d2c24507cec50808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}