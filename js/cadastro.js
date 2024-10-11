  // Importar Firebase e Firestore
  import { db, auth } from '/firebase.js';
  import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
  import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

  // Função para lidar com o envio do formulário
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      // Obter dados do formulário
      const nomeI = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const tel = document.getElementById('telefone').value;
      const endereco = document.getElementById('endereco').value;
      const nomeR = document.getElementById('responsavel').value;
      const senha = document.getElementById('password').value;
      const passwordRepeat = document.getElementById('password-repeat').value;
      
      // Verificar se as senhas coincidem
      if (senha !== passwordRepeat) {
        alert('As senhas não coincidem!');
        return;
      }
      if (senha.length < 5 || !/\d/.test(senha) || !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        alert('A senha deve ter pelo menos 5 caracteres, conter números e um caractere especial.');
        return;
      }

      try {
        // Registrar o usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Salvar dados da instituição no Firestore
        await addDoc(collection(db, 'userI'), {
          uid: user.uid, // associar ao UID do usuário autenticado
          email,
          endereco,
          nomeI,
          nomeR,
          tel
        });
        alert('Cadastro realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Tente novamente.');
      }
    });

    // Máscara de telefone
    document.getElementById('telefone').addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
      value = value.substring(0, 11); // Limita o tamanho a 11 caracteres
      if (value.length <= 2) {
          e.target.value = value; // Exibe apenas o código de área
      } else if (value.length <= 6) {
          e.target.value = `(${value.substring(0, 2)}) ${value.substring(2)}`; // Adiciona o código de área
      } else {
          e.target.value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`; // Adiciona o hífen
      }
    });
  });