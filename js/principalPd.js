// Importações do Firebase
import { db, auth } from '/firebase.js';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';


// Função para carregar pontos de distribuição
async function carregarPontosDistribuicao(uid) {
    console.log(`Carregando pontos de distribuição para o usuário com UID: ${uid}`);
    const pontosRef = collection(db, 'userI', uid, 'pontos');
    const pontosSnap = await getDocs(pontosRef);
    console.log('Documentos de pontos:', pontosSnap.docs); // Verifique se existem documentos

    const pontosList = document.getElementById('pontos-list');
    pontosList.innerHTML = '';

    // Atraso para garantir que a renderização ocorra após a carga dos dados
    setTimeout(() => {
        if (!pontosSnap.empty) {
            pontosSnap.forEach((doc) => {
                const ponto = doc.data();
                const pontoId = doc.id;

                const pontoDiv = document.createElement('div');
                pontoDiv.innerHTML = `
                    <h3>${ponto.nome}</h3>
                    <p>Endereço: ${ponto.endereco}</p>
                    <p>Quantidade de Itens: ${ponto.itens}</p>
                    <p>Telefone: ${ponto.telefone}</p>
                    <button onclick="excluirPonto('${uid}', '${pontoId}')">Excluir</button>
                    <div id="map-${pontoId}" style="height: 200px; width: 100%;"></div>
                `;
                pontosList.appendChild(pontoDiv);

                initMap(ponto.endereco, `map-${pontoId}`);
            });
        } else {
            pontosList.innerHTML = '<p>Nenhum ponto de distribuição encontrado para o usuário.</p>';
        }
    }, 100); // Atraso de 100ms
}

// Função para carregar dados da ONG
async function carregarDadosOng(uid) {
    console.log(`Carregando dados para a ONG com UID: ${uid}`);
    const ongRef = doc(db, 'userI', uid);
    const docSnap = await getDoc(ongRef);
    carregarPontosDistribuicao(uid);
    if (docSnap.exists()) {
        const ongData = docSnap.data();
        console.log('Dados da ONG:', ongData);
        document.getElementById('nome-ong').textContent = ongData.nomeR || 'Nome não disponível';
        document.getElementById('endereco-ong').textContent = ongData.endereco || 'Endereço não disponível';
        initMap(ongData.endereco);
        await carregarPontosDistribuicao(uid);
    } else {
        console.log('Nenhum dado encontrado para a ONG!');
    }
}

// Função initMap unificada
function initMap(endereco, mapId) {
    const map = L.map(mapId).setView([-23.55052, -46.633308], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    geocodeAddress(endereco, map);
}

function geocodeAddress(address, map) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);
                const center = [lat, lon];
                map.setView(center, 14);
                L.marker(center).addTo(map)
                    .bindPopup(address)
                    .openPopup();
            } else {
                console.error('Endereço não encontrado!');
            }
        })
        .catch(error => console.error('Erro na geocodificação:', error));
}

// Função para adicionar ponto
async function adicionarPonto(nome, endereco, itens, telefone) {
    const uid = auth.currentUser.uid;
    await addDoc(collection(db, 'userI', uid, 'pontos'), {
        nome,
        endereco,
        itens,
        telefone,
    });
    carregarPontosDistribuicao(uid);
}

// Funções para cadastrar ponto
window.cadastrarPonto = function() {
    const formHtml = `
        <div class="cadastrar-ponto">
            <h2>Cadastrar Ponto de Distribuição</h2>
            <label for="nome">Nome do Ponto:</label>
            <input type="text" id="nome" required>
            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" required>
            <label for="itens">Quantidade de Itens Disponíveis:</label>
            <input type="number" id="itens" required>
            <label for="telefone">Telefone:</label>
            <input type="text" id="telefone" required>
            <button onclick="submitForm()">Cadastrar</button>
            <button onclick="fecharForm()">Fechar</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', formHtml);
};

window.submitForm = function() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const itens = document.getElementById('itens').value;
    const telefone = document.getElementById('telefone').value;

    adicionarPonto(nome, endereco, itens, telefone);
    fecharForm();
};

window.fecharForm = function() {
    const form = document.querySelector('.cadastrar-ponto');
    if (form) form.remove();
}

// Monitorar mudanças de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(`Usuário logado: ${user.uid}`);
        carregarDadosOng(user.uid);
    } else {
        console.log('Nenhum usuário logado. Redirecionando para a página de login.');
        window.location.href = '../login/index.html';
    }
});
