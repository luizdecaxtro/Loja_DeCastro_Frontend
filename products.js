
import { getProducts, getCategories, addToCart, money } from './js/store.js';

const grid = document.querySelector('#grid-products');
const catSelect = document.querySelector('#filter-category');
const qInput = document.querySelector('#q');

function loadFilters(){
  const cats = getCategories();
  catSelect.innerHTML = `<option value="">Todas as categorias</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join('');
}
function render(){
  const q = (qInput.value||'').toLowerCase();
  const cat = catSelect.value;
  const items = getProducts().filter(p => p.active !== false);
  const filtered = items.filter(p => (cat? p.category===cat : true) && (p.name.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q)));
  if(!filtered.length){
    grid.innerHTML = `<div class="empty">Nenhum produto encontrado.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(p=>`
    <article class="card">
      <div class="thumb">${p.image? `<img src="${p.image}" alt="">` : ''}</div>
      <div class="body">
        <div class="badge">${p.category||'Produto'}</div>
        <h3 class="title">${p.name}</h3>
        <p class="muted">${p.desc||''}</p>
        <div class="price">${money(p.price)}</div>
      </div>
      <div class="actions">
        <button class="btn btn-primary" data-buy="${p.id}">Comprar</button>
        <button class="btn btn-ghost" data-cart="${p.id}">Adicionar ao carrinho</button>
      </div>
    </article>
  `).join('');
}
grid.addEventListener('click', (e)=>{
  const buy = e.target.closest('[data-buy]');
  const cart = e.target.closest('[data-cart]');
  if(buy){ addToCart(buy.getAttribute('data-buy')); location.href='carrinho.html'; }
  if(cart){ addToCart(cart.getAttribute('data-cart')); }
});

[qInput, catSelect].forEach(el=> el.addEventListener('input', render));

// Init
(function init(){
  render();
  loadFilters();
})();
