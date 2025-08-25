
export const LS_KEYS={ CART:'dc_cart', PAGES:'dc_pages', PREF_ID:'dc_mp_preference_id', MP_PK:'dc_mp_pk' };
export const products=[
  {id:'ebook-marketing',title:'E-book Marketing Digital',desc:'Guia completo de estratégias para pequenas empresas.',price:29.90,img:'assets/img/ebook.svg',category:'E-books'},
  {id:'curso-js',title:'Curso JavaScript Básico',desc:'Aprenda JS moderno com exercícios práticos e projetos.',price:89.90,img:'assets/img/js.svg',category:'Cursos'},
  {id:'template-site',title:'Template HTML/CSS Responsivo',desc:'Layout corporativo, pronto para personalizar.',price:49.90,img:'assets/img/template.svg',category:'Templates'}
];
export const storage={ get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}}, set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)) };
export const formatBRL = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
