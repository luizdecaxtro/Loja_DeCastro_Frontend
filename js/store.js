
// Keys
const DC_PRODUCTS_KEY = 'dc_products';
const DC_CATEGORIES_KEY = 'dc_categories';
const DC_CART_KEY = 'dc_cart';

// Utilities
const money = (v) => Number(v || 0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

// Products & Categories
export function getProducts(){
  return JSON.parse(localStorage.getItem(DC_PRODUCTS_KEY) || '[]');
}
export function saveProducts(list){
  localStorage.setItem(DC_PRODUCTS_KEY, JSON.stringify(list));
}
export function getCategories(){
  return JSON.parse(localStorage.getItem(DC_CATEGORIES_KEY) || '[]');
}
export function saveCategories(list){
  localStorage.setItem(DC_CATEGORIES_KEY, JSON.stringify(list));
}
export function ensureDemo(){
  const has = getProducts().length;
  const cats = getCategories();
  if(!cats.length){
    saveCategories(['E-books','Cursos','Planilhas']);
  }
  if(!has){
    const demo = [
      {id:uid(), name:'E-book: Produtividade 2.0', price:39.9, category:'E-books', desc:'Guia prático para turbinar sua rotina.', stock:999, active:true, image:'assets/img/ebook.svg'},
      {id:uid(), name:'Curso JS Essencial', price:149.0, category:'Cursos', desc:'Aprenda JavaScript do zero ao avançado.', stock:999, active:true, image:'assets/img/js.svg'},
      {id:uid(), name:'Template Pro Notion', price:59.0, category:'Planilhas', desc:'Organização total com um clique.', stock:999, active:true, image:'assets/img/template.svg'}
    ];
    saveProducts(demo);
  }
}

// Cart
export function getCart(){
  return JSON.parse(localStorage.getItem(DC_CART_KEY) || '[]');
}
export function saveCart(items){
  localStorage.setItem(DC_CART_KEY, JSON.stringify(items));
}
export function addToCart(productId, qty=1){
  const products = getProducts();
  const p = products.find(x=>x.id===productId);
  if(!p || !p.active) return;
  const cart = getCart();
  const found = cart.find(x=>x.productId===productId);
  if(found){ found.qty += qty; } else {
    cart.push({productId: productId, name:p.name, price:p.price, qty:qty, image:p.image});
  }
  saveCart(cart);
  alert('✅ Adicionado ao carrinho!');
}
