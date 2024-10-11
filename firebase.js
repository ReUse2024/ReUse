// firebaseConfig.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBf6721C4LLhYRcmwgOQbdqQgOiDLzDPhk",
    authDomain: "reuse-b676c.firebaseapp.com",
    projectId: "reuse-b676c",
    storageBucket: "reuse-b676c.appspot.com",
    messagingSenderId: "872063001296",
    appId: "1:872063001296:web:5d06ed6e548fa117fe74d5",
    measurementId: "G-0N6NYHQCTG"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
