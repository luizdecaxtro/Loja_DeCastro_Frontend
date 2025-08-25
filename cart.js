
import { getCart, saveCart, money } from './js/store.js';

const list = document.querySelector('#cart-list');
const totalEl = document.querySelector('#cart-total');

function draw(){
  const cart = getCart();
  if(!cart.length){
    list.innerHTML = `<div class="empty">Seu carrinho está vazio.</div>`;
    totalEl.textContent = money(0);
    return;
  }
  list.innerHTML = cart.map((i,idx)=>`
    <div class="card" style="flex-direction:row; gap:14px; align-items:center; padding:10px">
      <div class="thumb" style="width:120px;flex:0 0 120px">${i.image? `<img src="${i.image}" alt="">`:''}</div>
      <div class="body" style="flex:1">
        <div class="title">${i.name}</div>
        <div class="muted">R$ ${i.price.toFixed(2)}</div>
        <div style="display:flex; gap:8px; margin-top:8px; align-items:center">
          <button class="btn btn-ghost" data-dec="${idx}">-</button>
          <strong>${i.qty}</strong>
          <button class="btn btn-ghost" data-inc="${idx}">+</button>
          <button class="btn btn-ghost" data-del="${idx}">Remover</button>
        </div>
      </div>
      <div style="padding:14px; font-weight:800">${money(i.price * i.qty)}</div>
    </div>
  `).join('');
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  totalEl.textContent = money(total);
}

function modQty(idx, delta){
  const cart = getCart();
  cart[idx].qty += delta;
  if(cart[idx].qty<=0){ cart.splice(idx,1); }
  saveCart(cart);
  draw();
}

list.addEventListener('click',(e)=>{
  const inc = e.target.closest('[data-inc]');
  const dec = e.target.closest('[data-dec]');
  const del = e.target.closest('[data-del]');
  if(inc){ modQty(+inc.getAttribute('data-inc'), +1); }
  if(dec){ modQty(+dec.getAttribute('data-dec'), -1); }
  if(del){
    const cart = getCart();
    cart.splice(+del.getAttribute('data-del'),1);
    saveCart(cart);
    draw();
  }
});

document.querySelector('#btn-pay').addEventListener('click', ()=>{
  alert('🧰 Checkout será conectado ao Mercado Pago no backend. Por enquanto, este botão é ilustrativo.');
});

(function init(){ draw(); })();
