import { db, auth } from '/firebase.js';

import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';


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