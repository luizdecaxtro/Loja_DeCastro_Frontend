
function card(p){return `<article class="card">
  <img class="img" src="${p.imagem||placeholderImage(p.nome)}" alt="${p.nome}">
  <div class="body"><h3>${p.nome}</h3>
    <p style="color:#666;font-size:13px;margin:0">${p.descricao||''}</p>
    <div class="price">${currency(p.preco)}</div>
    <div class="controls"><button class="icon-btn" onclick="addToCart(${p.id})">Adicionar</button></div>
  </div></article>`}
const state={q:'',cat:''};
function render(){
  const all=loadProdutos();
  const filtered=all.filter(p=>(state.cat? p.categoria===state.cat : true) && (state.q? p.nome.toLowerCase().includes(state.q):true));
  document.getElementById('lista-produtos').innerHTML = filtered.map(card).join('') || '<p>Nenhum produto encontrado.</p>';
  const cats=[...new Set(all.map(p=>p.categoria).filter(Boolean))];
  const sel=document.getElementById('filtro');sel.innerHTML='<option value=\"\">Todas</option>'+cats.map(c=>`<option ${c===state.cat?'selected':''}>${c}</option>`).join('');
}
document.getElementById('busca').addEventListener('input',e=>{state.q=e.target.value.trim().toLowerCase();render()});
document.getElementById('filtro').addEventListener('change',e=>{state.cat=e.target.value;render()});
render();
