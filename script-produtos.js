document.addEventListener('DOMContentLoaded', async () => {
    // ------------------------------------
    // ADAPTAÇÃO PARA PRODUÇÃO:
    // Este é o endereço base da sua API no ambiente de hospedagem (ex: Render).
    // VOCÊ DEVE ATUALIZAR ESTA LINHA após o deploy do seu Backend.
    // Exemplo: const API_BASE_URL = 'https://api-lojacastro.onrender.com';
    const API_BASE_URL = 'https://loja-decastro-backend.onrender.com';
    // ------------------------------------
    
    console.log('API Base URL:', API_BASE_URL); // Loga a URL para depuração

    const produtosContainer = document.getElementById('secao-produtos');

    // Se o elemento de produtos não for encontrado, exibe um erro e para a execução.
    if (!produtosContainer) {
        console.error('Elemento #secao-produtos não encontrado. A página pode estar desconfigurada.');
        return;
    }

    // Acessa o backend para carregar os produtos
    async function carregarProdutos() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/produtos`);
            
            // Verifica se a resposta foi bem-sucedida (status 200-299)
            if (!response.ok) {
                // Se a resposta não for OK, lança um erro com a mensagem do status
                throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
            }

            const produtos = await response.json();
            
            // Limpa o conteúdo do container
            produtosContainer.innerHTML = ''; 

            if (produtos.length === 0) {
                produtosContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
                return;
            }

            // Mapeia cada produto e cria o HTML para exibi-lo
            produtos.forEach(produto => {
                const produtoElement = document.createElement('div');
                produtoElement.className = 'produto';
                
                // Cria o caminho completo para a imagem, usando a URL base
                const imagemSrc = `${API_BASE_URL}${produto.imagem}`;
                
                produtoElement.innerHTML = `
                    <div class="product-image-container">
                        <img src="${imagemSrc}" alt="${produto.nome}" class="product-image">
                    </div>
                    <h2 class="product-title">${produto.nome}</h2>
                    <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
                    <p class="product-description">${produto.descricao}</p>
                `;
                produtosContainer.appendChild(produtoElement);
            });
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
            // Exibe uma mensagem de erro no frontend para o usuário
            produtosContainer.innerHTML = `<p>Erro ao carregar os produtos. Por favor, tente novamente mais tarde.</p><p>Detalhes: ${error.message}</p>`;
        }
    }

    // Chama a função para carregar os produtos quando a página é carregada
    carregarProdutos();
});
