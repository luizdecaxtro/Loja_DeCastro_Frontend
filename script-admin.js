document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // ADAPTAÇÃO PARA PRODUÇÃO:
    // Este é o endereço base da sua API no ambiente de hospedagem (ex: Render).
    // VOCÊ DEVE ATUALIZAR ESTA LINHA após o deploy do seu Backend.
    // Exemplo: const API_BASE_URL = 'https://api.sua-loja.com.br';
    const API_BASE_URL = 'https://loja-decastro-backend.onrender.com';
    const LISTAR_CONTATOS = `${API_BASE_URL}/api/contatos`; // Correto
    
    // Variável base para as rotas da API de produtos
    const urlApiProdutos = `${API_BASE_URL}/api/produtos`;
    const urlApiSobre = `${API_BASE_URL}/api/sobre`;

    const tabelaProdutos = document.getElementById('tabela-produtos');
    const formProduto = document.getElementById('form-produto');
    const produtoIdInput = document.getElementById('produto-id');
    const nomeInput = document.getElementById('nome-produto');
    const precoInput = document.getElementById('preco-produto');
    const imagemInput = document.getElementById('imagem-produto');
    const descricaoInput = document.getElementById('descricao-produto'); 
    
    // Variáveis de login
    const senhaInput = document.getElementById('senha-input');
    const btnLogin = document.getElementById('btn-login');
    const loginForm = document.getElementById('login-form');
    const adminContainer = document.querySelector('.container-admin');
    
    // Variáveis do painel "Sobre"
    const formSobre = document.getElementById('form-sobre');
    const conteudoSobreAdmin = document.getElementById('conteudo-sobre-admin');


    // FUNÇÕES DE LOGIN E ADMIN
    
    function verificarSenha() {
        const senhaCorreta = 'lojalcc247@';
        if (senhaInput.value === senhaCorreta) {
            loginForm.style.display = 'none';
            adminContainer.style.display = 'block';
            carregarProdutosAdmin();
            carregarConteudoSobre(); // Nova chamada
        } else {
            alert('Senha incorreta! Tente novamente.');
            senhaInput.value = '';
        }
    }

    btnLogin.addEventListener('click', verificarSenha);

    senhaInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            verificarSenha();
        }
    });

    // FUNÇÃO: CARREGAR PRODUTOS ADMIN
    async function carregarProdutosAdmin() {
        try {
            // ADAPTAÇÃO 1/7: Usando urlApiProdutos
            const response = await fetch(urlApiProdutos); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const produtos = await response.json();
            tabelaProdutos.innerHTML = '';
            produtos.forEach(produto => {
                const row = `
                    <tr>
                        <td>${produto.id}</td>
                        <td>${produto.nome}</td>
                        <td>R$ ${produto.preco.toFixed(2).replace('.', ',')}</td>
                        <td><img src="${API_BASE_URL}${produto.imagem}" alt="Imagem do produto"></td>
                        <td>
                            <div class="botoes-acao">
                                <button class="btn-editar" data-id="${produto.id}">Editar</button>
                                <button class="btn-excluir" data-id="${produto.id}">Excluir</button>
                            </div>
                        </td>
                    </tr>
                `;
                tabelaProdutos.innerHTML += row;
            });
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            tabelaProdutos.innerHTML = '<tr><td colspan="5">Não foi possível carregar os produtos.</td></tr>';
        }
    }

    // FUNÇÃO: EXCLUIR PRODUTO
    async function excluirProduto(id) {
        if (confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
            try {
                // ADAPTAÇÃO 2/7: Usando urlApiProdutos
                const response = await fetch(`${urlApiProdutos}/${id}`, { 
                    method: 'DELETE'
                });
                if (response.status === 204) {
                    alert('Produto excluído com sucesso!');
                    carregarProdutosAdmin();
                } else {
                    alert('Erro ao excluir o produto.');
                }
            } catch (error) {
                console.error('Erro ao excluir:', error);
                alert('Erro ao excluir o produto.');
            }
        }
    }

    // EVENTO: ENVIAR FORMULÁRIO DE PRODUTO
    formProduto.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome', nomeInput.value);
        formData.append('preco', precoInput.value);
        formData.append('descricao', descricaoInput.value); 
        
        if (imagemInput.files.length > 0) {
            formData.append('imagem', imagemInput.files[0]);
        }

        const id = produtoIdInput.value;
        const method = id ? 'PUT' : 'POST';
        // ADAPTAÇÃO 3/7 e 4/7: Usando urlApiProdutos
        const url = id ? `${urlApiProdutos}/${id}` : urlApiProdutos; 

        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            if (response.ok) {
                alert('Produto salvo com sucesso!');
                formProduto.reset();
                carregarProdutosAdmin();
            } else {
                alert('Erro ao salvar o produto.');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar o produto.');
        }
    });

    // EVENTO: CLIQUE NA TABELA (EDITAR/EXCLUIR)
    tabelaProdutos.addEventListener('click', async (event) => {
        const target = event.target;
        const id = target.dataset.id;
        
        if (target.classList.contains('btn-excluir')) {
            excluirProduto(id);
        } else if (target.classList.contains('btn-editar')) {
            try {
                // ADAPTAÇÃO 5/7: Usando urlApiProdutos para buscar o produto
                const response = await fetch(`${urlApiProdutos}/${id}`); 
                const produto = await response.json();
                
                produtoIdInput.value = produto.id;
                nomeInput.value = produto.nome;
                precoInput.value = produto.preco;
                descricaoInput.value = produto.descricao; 
                
            } catch (error) {
                console.error('Erro ao carregar dados para edição:', error);
            }
        }
    });
    
    // FUNÇÃO: CARREGAR CONTEÚDO SOBRE
    async function carregarConteudoSobre() {
        try {
            // ADAPTAÇÃO 6/7: Usando urlApiSobre
            const response = await fetch(urlApiSobre);
            const data = await response.json();
            if (data && data.conteudo) {
                conteudoSobreAdmin.value = data.conteudo;
            }
        } catch (error) {
            console.error('Erro ao carregar o conteúdo da página Sobre:', error);
        }
    }

    // EVENTO: ENVIAR CONTEÚDO SOBRE
    formSobre.addEventListener('submit', async (event) => {
        event.preventDefault();
        const conteudo = conteudoSobreAdmin.value;

        try {
            // ADAPTAÇÃO 7/7: Usando urlApiSobre para salvar o conteúdo
            const response = await fetch(urlApiSobre, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ conteudo: conteudo })
            });

            if (response.ok) {
                alert('Conteúdo da página "Sobre" salvo com sucesso!');
            } else {
                alert('Erro ao salvar o conteúdo.');
            }
        } catch (error) {
            console.error('Erro ao salvar o conteúdo:', error);
            alert('Erro ao salvar o conteúdo.');
        }
    });

});


