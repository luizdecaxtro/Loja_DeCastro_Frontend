
import { products, storage, LS_KEYS, formatBRL } from './js/store.js';
export function updateCartCount(){ const cart=storage.get(LS_KEYS.CART,[]); const c=cart.reduce((s,i)=>s+i.qty,0); document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=c); }
export function toast(msg){ let el=document.querySelector('.toast'); if(!el){ el=document.createElement('div'); el.className='toast'; document.body.appendChild(el);} el.textContent=msg; el.classList.remove('hide'); setTimeout(()=>el.classList.add('hide'),2200); }
export function addToCart(id){ const p=products.find(x=>x.id===id); if(!p) return; const cart=storage.get(LS_KEYS.CART,[]); const idx=cart.findIndex(x=>x.id===id); if(idx>=0) cart[idx].qty+=1; else cart.push({id,title:p.title,price:p.price,img:p.img,qty:1}); storage.set(LS_KEYS.CART,cart); updateCartCount(); toast('✅ Item adicionado ao carrinho'); }
export function renderProductGrid(container){ if(!container) return; container.innerHTML=products.map(p=>`
  <article class="card"><img class="media" src="${p.img}" alt="${p.title}"><div class="body">
    <div class="badge">${p.category}</div><h3>${p.title}</h3><p style="color:#374151;margin:.2rem 0 1rem">${p.desc}</p>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><strong class="price">${formatBRL(p.price)}</strong><button class="btn" data-add="${p.id}">🛒 Comprar</button></div>
  </div></article>`).join(''); container.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add))); }
export function setupSearch(input,container){ if(!input) return; input.addEventListener('input',()=>{ const q=input.value.toLowerCase().trim(); const f=products.filter(p=>p.title.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)); container.innerHTML=f.map(p=>`
  <article class="card"><img class="media" src="${p.img}" alt="${p.title}"><div class="body">
    <div class="badge">${p.category}</div><h3>${p.title}</h3><p style="color:#374151;margin:.2rem 0 1rem">${p.desc}</p>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><strong class="price">${formatBRL(p.price)}</strong><button class="btn" data-add="${p.id}">🛒 Comprar</button></div>
  </div></article>`).join(''); container.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add))); }); }
document.addEventListener('DOMContentLoaded',()=>{ updateCartCount(); const grid=document.querySelector('[data-grid-products]'); if(grid){renderProductGrid(grid);} const search=document.querySelector('[data-search]'); if(search&&grid){setupSearch(search,grid);} });
