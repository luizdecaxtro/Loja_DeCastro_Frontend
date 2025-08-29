document.addEventListener('DOMContentLoaded', () => {
    // # Região: Rolagem Suave para Links Internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // # Região: Simulação do Carrinho de Compras
    const cartIcon = document.querySelector('.nav-icons .fa-shopping-cart');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemCount++;
            cartCount.textContent = itemCount;
            cartCount.style.display = 'block'; // Mostra o contador

            // Opcional: Feedback visual ou mensagem
            alert('Produto adicionado ao carrinho!');
        });
    });

    // # Região: Implementação futura da navegação
    // Os links como 'Produtos', 'Lançamentos', 'Minha Conta', 'Contato'
    // ainda não levam a páginas separadas.
    // Para 'Configurações', ele tenta ir para admin/configuracoes.html.
    // Para que Minha Conta, por exemplo, funcione, precisaríamos:
    // 1. Criar uma página HTML para 'Minha Conta' (e.g., minha-conta.html).
    // 2. Mudar o href no index.html para minha-conta.html.
    // 3. No futuro, integrar com o backend para dados do usuário.

    console.log("DeCastro: Frontend pronto para interatividade!");
});
