document.addEventListener('DOMContentLoaded', async () => {
    // ----------------------------------------------------
    // ADAPTAÇÃO PARA PRODUÇÃO:
    // Este é o endereço base da sua API no ambiente de hospedagem (ex: Render).
    // VOCÊ DEVE ATUALIZAR ESTA LINHA após o deploy do seu Backend.
    // Exemplo: const API_BASE_URL = 'https://api-lojacastro.onrender.com';
    const API_BASE_URL = 'https://loja-decastro-backend.onrender.com';
    // ----------------------------------------------------

    const produtosContainer = document.getElementById('secao-produtos');
    if (!produtosContainer) {
        console.error('Elemento #secao-produtos não encontrado. A página pode estar desconfigurada.');
        return;
    }

    try {
        // A chamada fetch agora usa o novo URL da API
        const response = await fetch(`${API_BASE_URL}/api/produtos`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const produtos = await response.json();

        // Gera a barra de pesquisa
        const secaoPesquisa = document.createElement('div');
        secaoPesquisa.classList.add('secao-pesquisa');
        secaoPesquisa.innerHTML = `
            <div class="container-pesquisa">
                <input type="text" id="campo-pesquisa" placeholder="Pesquisar por nome do produto...">
                <button id="btn-pesquisar">Pesquisar</button>
            </div>
        `;
        produtosContainer.before(secaoPesquisa);

        // Limpa o conteúdo existente antes de renderizar
        produtosContainer.innerHTML = '';

        // Itera sobre a lista de produtos recebidos do servidor
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('produto-card');

            // O caminho da imagem agora está correto (assumindo que o JSON já tem a barra inicial)
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                <p>${produto.descricao}</p>
                <button class="comprar-btn" data-produto-id="${produto.id}">Comprar</button>
            `;
            produtosContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Não foi possível carregar os produtos:", error);
        produtosContainer.innerHTML = '<p>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p>';
    }
});
