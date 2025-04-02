
import { getAuth,GoogleAuthProvider } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlAiVrDtRMWxtYUC1jjc2p-NrlH1QtDnE",
  authDomain: "diet-app-e76c9.firebaseapp.com",
  projectId: "diet-app-e76c9",
  storageBucket: "diet-app-e76c9.firebasestorage.app",
  messagingSenderId: "146397505827",
  appId: "1:146397505827:web:297da35faa7e2d7f470496",
  measurementId: "G-ERV1TWG67R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}