Alunos: Ianna Flayser, Maria Luiza Dias, Vivian Petrille e Luiz Gabriel.

Contexto:
Meu Diário de Leituras é uma aplicação web front-end (HTML, CSS e JavaScript) que funciona como um diário pessoal de leitura. A ferramenta permite que o usuário registre os livros que leu, atribua uma avaliação em estrelas (sendo elas de 1 a 5), escreva uma opinião sobre a obra e consulte essas informações posteriormente em formato de estante virtual, com recurso de busca e ordenação.

Não há uso de backend ou banco de dados externo, todas as informações cadastradas são armazenadas localmente no servidor do usuário, por meio da API localStorage.

As tecnologias utilizadas são: 
HTML: Para estruturação das páginas index.html e cadastro.html.
CSS: Estilização em tres arquivos (base, layout e components), com uso de variáveis CSS (custom properties) para a paleta de cores.
JavaScript: (Vanilla JS / ES6): Manipulação do DOM, eventos de formulário, filytos e ordenação.
Font Awesome (via CDN): Bibliotecca de ícones utilizada na interface.
Web Storage API (localStorage): Persistencia dos dados no navegador.

Estrutura: 
index.htmlPágina inicial: exibe a estante de livros cadastrados, com busca e ordenação.
cadastro.html: Formulário para registrar um novo livro (título, avaliação, opinião, detalhes).
css/base.css: Reset geral, variáveis de cor (paleta) e estilos base do corpo do documento.
css/layout.css: Estrutura visual contendo cabeçalho fixo, navbar e layout das seções.
css/components.css: Estilos de componentes contendo botões, cards de livro, formulário, seções.
js/script.js: Toda a lógica da aplicação contendo leitura/gravação no localStorage, renderização dos cards, busca, ordenação, cadastro e exclusão de livros.
LICENSELicença de uso do repositório.
.gitattributes: Configurações de atributos do Git para o repositório.

Funcionalidades:
Cadastro de livro: Formulário (cadastro.html) para inserir título, avaliação em estrelas (1 a 5), opinião/resenha e detalhes opcionais.
Listagem em estante: Exibição dos livros cadastrados em formato de cards na página inicial (index.html).
Busca: Campo de pesquisa que filtra os livros pelo título, em tempo real.
Ordenação: Seletor para ordenar por mais recentes, melhor avaliação ou menor avaliação.
Exclusão: Botão em cada card para remover o livro da estante e do armazenamento.
Persistência de dados: Os dados são salvos no localStorage do navegador (chave 'meus_livros'), sem necessidade de backend/servidor.
Proteção contra XSS: Função escapeHTML() sanitiza os textos inseridos pelo usuário antes de exibi-los na tela.

Considerações finais: 
O projeto tem em foco o controle pessoal de leituras, com  práticas como separação de responsabilidades no CSS, sanitização de dados de entrada e persistência local sem dependência de servidor. Como possíveis evoluções futuras, destacam-se: 
Edição de registros já cadastrados (atualmente só é possível cadastrar e excluir).
Migração do armazenamento para uma solução em nuvem/banco de dados, permitindo acesso a partir de múltiplos dispositivos.
Adição de categorias/gêneros literários e filtros adicionais.
Responsividade para dispositivos móveis e testes de acessibilidade.

