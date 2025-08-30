document.addEventListener('DOMContentLoaded', () => {
    // 1. Rolagem Suave para links internos (quando a página não muda)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Lógica para o Carrinho de Compras (Simulação)
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            itemCount++;
            cartCount.textContent = itemCount;
            // Exibe o contador de itens
            cartCount.style.display = 'block';

            // Alerta de confirmação
            alert('Produto adicionado ao carrinho!');
        });
    });

    console.log("DeCastro: Frontend pronto para interatividade!");
});
