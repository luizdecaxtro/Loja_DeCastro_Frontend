
const KEYS={PRODUTOS:'ldc_produtos',CARRINHO:'ldc_carrinho'};
function currency(n){return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function loadProdutos(){try{const r=localStorage.getItem(KEYS.PRODUTOS);const a=r?JSON.parse(r):[];return Array.isArray(a)?a:[]}catch(e){return[]}}
function saveProdutos(list){localStorage.setItem(KEYS.PRODUTOS,JSON.stringify(list||[]))}
function loadCarrinho(){try{const r=localStorage.getItem(KEYS.CARRINHO);return r?JSON.parse(r):[]}catch(e){return[]}}
function saveCarrinho(list){localStorage.setItem(KEYS.CARRINHO,JSON.stringify(list||[]))}
function addToCart(id){const c=loadCarrinho();const i=c.findIndex(x=>x.id===id);if(i>=0)c[i].qtd+=1;else c.push({id,qtd:1});saveCarrinho(c);updateNavCount()}
function removeFromCart(id){saveCarrinho(loadCarrinho().filter(i=>i.id!==id));updateNavCount()}
function updateNavCount(){const n=loadCarrinho().reduce((s,i)=>s+i.qtd,0);const el=document.getElementById('nav-count');if(el)el.textContent=n?`(${n})`:''}
updateNavCount();
function placeholderImage(text='Produto'){const bg='#d9d4cf',fg='#3d3330';const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='550'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' style='font:700 42px sans-serif; fill:${fg};'>${text}</text></svg>`;return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg)}
(function seed(){const cur=loadProdutos();if(cur.length)return;const now=Date.now();const base=[
  {id:now+1,nome:'E-book Finanças',descricao:'Guia rápido para organizar suas finanças pessoais.',preco:39.9,categoria:'E-books',imagem:placeholderImage('E‑book'),destaque:true},
  {id:now+2,nome:'Planilha Orçamento',descricao:'Planilha inteligente para controlar gastos e receitas.',preco:29.9,categoria:'Planilhas',imagem:placeholderImage('Planilha'),destaque:true},
  {id:now+3,nome:'Pacote Ícones',descricao:'Ícones minimalistas em SVG e PNG.',preco:49.0,categoria:'Design',imagem:placeholderImage('Ícones'),destaque:false},
];saveProdutos(base)})();
