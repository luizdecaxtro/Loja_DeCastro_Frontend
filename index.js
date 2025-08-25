document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("assets/produtos.json");
    const produtos = await response.json();

    // Pega os 3 primeiros produtos como destaque
    const destaques = produtos.slice(0, 3);

    const container = document.getElementById("produtos-destaque");
    destaques.forEach(produto => {
      const item = document.createElement("div");
      item.classList.add("produto-card");

      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
      `;
      container.appendChild(item);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos em destaque:", error);
  }
});

// Função auxiliar para carrinho
function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let item = carrinho.find(p => p.id === id);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ id: id, quantidade: 1 });
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}
