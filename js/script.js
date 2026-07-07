// 1. FUNÇÕES UTILITÁRIAS

function escapeHTML(string) {
    if (!string) return '';
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 2. PERSISTÊNCIA DE DADOS (localStorage)
// Carrega os livros do LocalStorage com proteção contra erros
let livros = [];
try {
    livros = JSON.parse(localStorage.getItem('meus_livros')) || [];
} catch (error) {
    console.error("Erro ao processar dados corrompidos do localStorage. Inicializando vazio.", error);
    livros = [];
}

// Salva o array de livros atual no LocalStorage
// (centralizada aqui para não ficar repetida em vários lugares do código)
function salvarLivros() {
    localStorage.setItem('meus_livros', JSON.stringify(livros));
}

// 3. ELEMENTOS DO DOM
const listaLivrosElement = document.getElementById('lista-livros');
const campoBusca = document.getElementById('busca');
const campoOrdenar = document.getElementById('ordenar');
const contadorLivros = document.getElementById('contador-livros');
const formLivro = document.getElementById('form-livro');

// 4. LÓGICA DA PÁGINA INICIAL — BUSCA, ORDENAÇÃO E RENDERIZAÇÃO
//    (Apenas se os elementos existirem na tela)
function renderizarLivros() {
    if (!listaLivrosElement) return; // Se não estiver na página inicial, interrompe

    const termoBusca = campoBusca.value.toLowerCase();
    const criterioOrdenacao = campoOrdenar.value;

    // Filtrar por Busca (em tempo real)
    let livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termoBusca)
    );

    // Ordenação
    if (criterioOrdenacao === 'melhores') {
        livrosFiltrados.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (criterioOrdenacao === 'piores') {
        livrosFiltrados.sort((a, b) => a.avaliacao - b.avaliacao);
    } else if (criterioOrdenacao === 'recente') {
        livrosFiltrados.sort((a, b) => b.dataCadastro - a.dataCadastro);
    }

    contadorLivros.textContent = livrosFiltrados.length;
    listaLivrosElement.innerHTML = '';

    if (livrosFiltrados.length === 0) {
        listaLivrosElement.innerHTML = `<p style="text-align:center; color:#636e72; padding:20px;">Nenhum livro registrado na estante.</p>`;
        return;
    }

    // Desenha os cards na tela
    const cardsHtml = livrosFiltrados.map(livro => {
        const estrelasText = '⭐'.repeat(Number(livro.avaliacao) || 0);

        return `
            <div class="livro-card">
                <div class="livro-header">
                    <h3>${escapeHTML(livro.titulo)}</h3>
                    <span class="livro-estrelas">${estrelasText}</span>
                </div>
                <p class="livro-opiniao">"${escapeHTML(livro.opiniao)}"</p>
                ${livro.detalhes ? `<p class="livro-detalhes">📌 Nota extra: ${escapeHTML(livro.detalhes)}</p>` : ''}
                <button class="btn-excluir" onclick="excluirLivro(${livro.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
    }).join('');

    // Uma única alteração atômica no DOM (Rápido e performático)
    listaLivrosElement.innerHTML = cardsHtml;
}

// Função para Deletar Livro
window.excluirLivro = function(idLivro) {
    livros = livros.filter(livro => livro.id !== idLivro);
    salvarLivros();
    renderizarLivros();
}

// Ativa escutadores de busca e ordenação apenas se estiver na Home
if (campoBusca && campoOrdenar) {
    campoBusca.addEventListener('input', renderizarLivros);
    campoOrdenar.addEventListener('change', renderizarLivros);
    renderizarLivros(); // Roda a primeira listagem
}

// 5. LÓGICA DA PÁGINA DE CADASTRO — GERAÇÃO DE ID ÚNICO E SALVAMENTO
if (formLivro) {
    formLivro.addEventListener('submit', function(event) {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const avaliacao = parseInt(document.getElementById('avaliacao').value);
        const opiniao = document.getElementById('opiniao').value;
        const detalhes = document.getElementById('detalhes').value;

        const novoLivro = {
            id: Date.now(),
            titulo: titulo,
            avaliacao: avaliacao,
            opiniao: opiniao,
            detalhes: detalhes,
            dataCadastro: Date.now()
        };

        // Adiciona no array global e salva no LocalStorage do Navegador
        livros.push(novoLivro);
        salvarLivros();

        // Redireciona o usuário automaticamente de volta para a Estante Inicial
        window.location.href = 'index.html';
    });
}