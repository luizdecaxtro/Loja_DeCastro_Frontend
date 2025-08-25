
import { storage, LS_KEYS, formatBRL } from './js/store.js';
import { updateCartCount } from './js/main.js';
import { initMercadoPago, openWallet } from './js/mp.js';
function render(){ const tbody=document.querySelector('[data-cart-body]'); const totalEl=document.querySelector('[data-cart-total]'); const empty=document.querySelector('[data-cart-empty]'); const tableWrap=document.querySelector('[data-cart-table]'); const cart=storage.get(LS_KEYS.CART,[]);
  if(cart.length===0){ empty.classList.remove('hide'); tableWrap.classList.add('hide'); totalEl.textContent=formatBRL(0); return; } else { empty.classList.add('hide'); tableWrap.classList.remove('hide'); }
  tbody.innerHTML=cart.map((item,idx)=>`<tr>
    <td style="display:flex;align-items:center;gap:12px"><img src="${item.img}" style="width:50px;height:50px;border-radius:10px;object-fit:cover">${item.title}</td>
    <td>${formatBRL(item.price)}</td><td><div class="qty"><button data-dec="${idx}">-</button><strong>${item.qty}</strong><button data-inc="${idx}">+</button></div></td>
    <td>${formatBRL(item.price*item.qty)}</td><td><button class="btn warning" data-del="${idx}">Remover</button></td></tr>`).join('');
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0); totalEl.textContent=formatBRL(total);
  tbody.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.inc,+1)));
  tbody.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.dec,-1)));
  tbody.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>removeItem(+b.dataset.del)));
}
function changeQty(idx,d){ const cart=storage.get(LS_KEYS.CART,[]); if(!cart[idx]) return; cart[idx].qty+=d; if(cart[idx].qty<=0) cart.splice(idx,1); storage.set(LS_KEYS.CART,cart); updateCartCount(); render(); }
function removeItem(idx){ const cart=storage.get(LS_KEYS.CART,[]); cart.splice(idx,1); storage.set(LS_KEYS.CART,cart); updateCartCount(); render(); }
document.addEventListener('DOMContentLoaded',()=>{ updateCartCount(); render(); initMercadoPago(); document.querySelector('[data-checkout]').addEventListener('click',()=>openWallet()); });
