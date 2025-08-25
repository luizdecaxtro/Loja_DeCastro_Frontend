
import { storage, LS_KEYS } from './js/store.js';
import { updateCartCount } from './js/main.js';
function renderList(){ const list=document.querySelector('[data-pages-list]'); if(!list) return; const items=storage.get(LS_KEYS.PAGES,[]);
  list.innerHTML=items.length?items.map(p=>`<div class="card"><div class="body"><strong>${p.title}</strong> — <code>${p.slug}</code><div style="margin-top:10px;display:flex;gap:10px"><a class="btn" href="page.html?slug=${encodeURIComponent(p.slug)}" target="_blank">Abrir</a><button class="btn warning" data-del="${p.slug}">Excluir</button></div></div></div>`).join(''):'<p>Nenhuma página criada ainda.</p>';
  list.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>{ const slug=b.dataset.del; const next=storage.get(LS_KEYS.PAGES,[]).filter(x=>x.slug!==slug); storage.set(LS_KEYS.PAGES,next); renderList(); }));
}
document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
  const form=document.querySelector('[data-page-form]');
  if(form){ form.addEventListener('submit',e=>{ e.preventDefault(); const title=form.querySelector('[name=title]').value.trim(); const slug=form.querySelector('[name=slug]').value.trim().toLowerCase(); const html=form.querySelector('[name=html]').value.trim(); if(!title||!slug||!html) return; const items=storage.get(LS_KEYS.PAGES,[]); if(items.some(p=>p.slug===slug)) return; items.push({title,slug,html}); storage.set(LS_KEYS.PAGES,items); form.reset(); renderList(); }); renderList(); }
  const params=new URLSearchParams(location.search); const slug=params.get('slug'); if(slug){ const p=storage.get(LS_KEYS.PAGES,[]).find(x=>x.slug===slug); const target=document.querySelector('[data-page-target]'); const title=document.querySelector('[data-page-title]'); if(p&&target){ target.innerHTML=p.html; title.textContent=p.title; } else if(target){ target.innerHTML='<p>Página não encontrada.</p>'; } }
});
