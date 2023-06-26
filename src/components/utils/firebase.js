// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDfydJrcIPJJulqRFNmPZyoY3X7r6RCC0",
    authDomain: "whatsapp-alert-328fb.firebaseapp.com",
    projectId: "whatsapp-alert-328fb",
    storageBucket: "whatsapp-alert-328fb.appspot.com",
    messagingSenderId: "434790805320",
    appId: "1:434790805320:web:1c907af0434a759bbf4d7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 
export const storage = getStorage(app)
export const db = getFirestore(app)