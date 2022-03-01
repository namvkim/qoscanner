// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhw5Hg2C7zTrG6hRNH6ZdtVjLpmy633zo",
    authDomain: "qoscanner.firebaseapp.com",
    databaseURL: "https://qoscanner-default-rtdb.firebaseio.com",
    projectId: "qoscanner",
    storageBucket: "qoscanner.appspot.com",
    messagingSenderId: "536190426269",
    appId: "1:536190426269:web:3a6d6645089c9e1f1a4874",
    measurementId: "G-6RK8G5VG9Q"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);

export { auth, db, analytics, storage };