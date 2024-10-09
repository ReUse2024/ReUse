import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyBf6721C4LLhYRcmwgOQbdqQgOiDLzDPhk",
    authDomain: "reuse-b676c.firebaseapp.com",
    projectId: "reuse-b676c",
    storageBucket: "reuse-b676c.appspot.com",
    messagingSenderId: "872063001296",
    appId: "1:872063001296:web:5d06ed6e548fa117fe74d5",
    measurementId: "G-0N6NYHQCTG"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submit
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login bem-sucedido!');
            window.location.href = '../principalinst/index.html'; // Redireciona para a página principal
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            document.getElementById('error-message').textContent = `Erro: ${error.message}`;
        }
    });

    // Password Reset Form Submit
    document.getElementById('reset-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Email de redefinição de senha enviado!');
            document.getElementById('reset-password-form').reset();
            document.getElementById('reset-password-form').style.display = 'none';
        } catch (error) {
            console.error('Erro ao enviar email de redefinição:', error);
            document.getElementById('error-message').textContent = `Erro: ${error.message}`;
        }
    });

    // Show/Hide Password Reset Form
    document.getElementById('forgot-password-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('reset-password-form').style.display = 'block';
    });

    document.getElementById('cancel-reset').addEventListener('click', () => {
        document.getElementById('reset-password-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
});