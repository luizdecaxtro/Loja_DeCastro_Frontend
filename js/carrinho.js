
function linha(it,p){
  const subtotal=p.preco*it.qtd;
  return `<div style="display:grid;grid-template-columns:80px 1fr auto;gap:12px;padding:12px;border-bottom:1px solid #eee;align-items:center">
    <img src="${p.imagem||placeholderImage(p.nome)}" style="width:80px;height:60px;object-fit:cover;border-radius:10px">
    <div><div style="font-weight:700">${p.nome}</div><div style="font-size:13px;color:#666">${currency(p.preco)}</div>
      <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
        <button class="icon-btn light" onclick="mudaQtd(${it.id},-1)">-</button><span>${it.qtd}</span><button class="icon-btn light" onclick="mudaQtd(${it.id},1)">+</button>
        <button class="icon-btn" onclick="removeFromCart(${it.id});render()">Remover</button>
      </div>
    </div>
    <div style="font-weight:800">${currency(subtotal)}</div>
  </div>`;
}
function render(){
  const cart=loadCarrinho();const prods=loadProdutos();
  const list=cart.map(it=>({it,p:prods.find(p=>p.id===it.id)})).filter(x=>x.p);
  const total=list.reduce((s,{it,p})=>s+p.preco*it.qtd,0);
  const html=list.map(({it,p})=>linha(it,p)).join('') || '<div style="padding:16px">Seu carrinho está vazio.</div>';
  document.getElementById('carrinho-list').innerHTML=html+`<div style="padding:16px;display:flex;justify-content:flex-end;gap:16px;font-weight:800">Total: ${currency(total)}</div>`;
}
function mudaQtd(id,delta){
  const cart=loadCarrinho();const i=cart.findIndex(x=>x.id===id);if(i<0) return;
  cart[i].qtd+=delta;if(cart[i].qtd<=0) cart.splice(i,1);saveCarrinho(cart);updateNavCount();render();
}
render();
document.getElementById('finalizar').addEventListener('click',()=>alert('Checkout Mercado Pago será conectado em breve.'));
