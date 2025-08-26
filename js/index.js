
function card(p){return `<article class="card">
  <img class="img" src="${p.imagem||placeholderImage(p.nome)}" alt="${p.nome}">
  <div class="body"><h3>${p.nome}</h3><div class="price">${currency(p.preco)}</div>
  <div class="controls"><button class="icon-btn" onclick="addToCart(${p.id})">Adicionar</button>
  <a href="produtos.html" class="icon-btn light">Detalhes</a></div></div></article>`}
(function(){const list=loadProdutos().filter(p=>p.destaque);const show=list.length?list:loadProdutos().slice(0,6);document.getElementById('destacados').innerHTML=show.map(card).join('')})();
