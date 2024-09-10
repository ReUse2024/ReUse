import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
        import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
        
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
      
        // Inicializar Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
      
        document.getElementById('signup-form').addEventListener('submit', async (e) => {
          e.preventDefault();
      
          // Obter dados do formulário
          const nomeI = document.getElementById('nomeI').value;
          const email = document.getElementById('email').value;
          const tel = document.getElementById('tel').value;
          const endereco = document.getElementById('endereco').value;
          const nomeR = document.getElementById('nomeR').value;
          const senha = document.getElementById('senha').value;
          const passwordRepeat = document.getElementById('password-repeat').value;
      
          // Verificar se as senhas coincidem
          if (senha !== passwordRepeat) {
            alert('As senhas não coincidem!');
            return;
          }
      
          try {
            // Adicionar documento ao Firestore
            await addDoc(collection(db, 'userI'), {
              email,
              endereco,
              nomeI,
              nomeR,
              senha,
              tel
            });
      
            alert('Cadastro realizado com sucesso!');
          } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar. Tente novamente.');
          }
        });