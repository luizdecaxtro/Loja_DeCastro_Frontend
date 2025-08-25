
import { getProducts, saveProducts, getCategories, saveCategories, uid, money } from './js/store.js';

const el = (q)=>document.querySelector(q);
const listEl = el('#list-products');
const form = el('#form-product');
const catSelect = el('#category');
const imgInput = el('#image');
const imgPreview = el('#preview');

function loadCategories(){
  const cats = getCategories();
  catSelect.innerHTML = cats.map(c=>`<option value="${c}">${c}</option>`).join('');
}
function addCategory(){
  const name = prompt('Nova categoria:');
  if(!name) return;
  const cats = Array.from(new Set([...getCategories(), name]));
  saveCategories(cats);
  loadCategories();
  alert('✅ Categoria adicionada');
}

function drawList(){
  const items = getProducts();
  if(!items.length){
    listEl.innerHTML = `<div class="empty">Nenhum produto cadastrado ainda.</div>`;
    return;
  }
  listEl.innerHTML = `
    <table class="table">
      <thead><tr>
        <th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Status</th><th style="text-align:right">Ações</th>
      </tr></thead>
      <tbody>
        ${items.map(p=>`
          <tr>
            <td style="display:flex; gap:12px; align-items:center">
              <img src="${p.image}" style="width:56px;height:56px;object-fit:cover;border-radius:10px" alt="">
              <div><div class="title">${p.name}</div><div class="muted" style="max-width:420px">${p.desc||''}</div></div>
            </td>
            <td><span class="badge">${p.category||'-'}</span></td>
            <td>${money(p.price)}</td>
            <td>${p.stock ?? '-'}</td>
            <td>${p.active? 'Ativo':'Inativo'}</td>
            <td style="text-align:right">
              <button class="btn btn-ghost" onclick="editProduct('${p.id}')">Editar</button>
              <button class="btn btn-ghost" onclick="removeProduct('${p.id}')">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

window.removeProduct = (id)=>{
  const items = getProducts().filter(p=>p.id!==id);
  saveProducts(items);
  drawList();
}

let editingId = null;
window.editProduct = (id)=>{
  const p = getProducts().find(x=>x.id===id);
  if(!p) return;
  editingId = id;
  form.name.value = p.name;
  form.price.value = p.price;
  form.desc.value = p.desc||'';
  form.stock.value = p.stock||0;
  form.active.checked = !!p.active;
  catSelect.value = p.category||'';
  imgPreview.src = p.image;
  imgPreview.style.display='block';
  window.scrollTo({top:0, behavior:'smooth'});
}

imgInput.addEventListener('change', (e)=>{
  const file = e.target.files?.[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    imgPreview.src = reader.result;
    imgPreview.style.display='block';
  };
  reader.readAsDataURL(file);
});

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  const obj = {
    id: editingId || uid(),
    name: fd.get('name'),
    desc: fd.get('desc') || '',
    price: parseFloat(fd.get('price')) || 0,
    category: fd.get('category') || '',
    stock: parseInt(fd.get('stock')||'0'),
    active: fd.get('active') === 'on',
    image: imgPreview.src || ''
  };
  let items = getProducts();
  const idx = items.findIndex(x=>x.id===obj.id);
  if(idx>=0){ items[idx]=obj; } else { items.push(obj); }
  saveProducts(items);
  editingId = null;
  form.reset();
  imgPreview.src=''; imgPreview.style.display='none';
  drawList();
  alert('💾 Produto salvo');
});

// Init
(function init(){
  loadCategories();
  drawList();
  document.querySelector('#btn-new-category').addEventListener('click', addCategory);
})();
