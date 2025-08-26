
let imagemBase64=null;
const form=document.getElementById('form-produto');
const imgInput=document.getElementById('imagem');
const preview=document.getElementById('preview');
imgInput.addEventListener('change',e=>{const f=e.target.files[0];if(!f){imagemBase64=null;preview.style.display='none';return;}
  const reader=new FileReader();reader.onload=ev=>{imagemBase64=ev.target.result;preview.src=imagemBase64;preview.style.display='block'};reader.readAsDataURL(f)});
form.addEventListener('submit',e=>{e.preventDefault();
  const nome=document.getElementById('nome').value.trim();
  const categoria=document.getElementById('categoria').value.trim();
  const preco=parseFloat(document.getElementById('preco').value);
  const destaque=document.getElementById('destaque').value==='true';
  const descricao=document.getElementById('descricao').value.trim();
  if(!nome||isNaN(preco)){alert('Preencha nome e preço.');return;}
  const prods=loadProdutos();
  prods.push({id:Date.now(),nome,categoria,preco,destaque,descricao,imagem:imagemBase64||placeholderImage(nome)});
  saveProdutos(prods);form.reset();imagemBase64=null;preview.style.display='none';renderTabela();
});
function renderTabela(){
  const prods=loadProdutos();const tbody=document.querySelector('#tabela tbody');
  tbody.innerHTML=prods.map(p=>`<tr>
    <td><img src="${'${p.imagem||placeholderImage(p.nome)}'}" style="width:64px;height:48px;object-fit:cover;border-radius:8px"></td>
    <td>${'${p.nome}'}</td><td>${'${p.categoria||"-"}'}</td>
    <td>${'${currency(p.preco)}'}</td><td>${'${p.destaque?"Sim":"Não"}'}</td>
    <td><button class="icon-btn light" onclick="excluir(${ '${p.id}' })">Excluir</button></td></tr>`).join('');
}
function excluir(id){if(!confirm('Excluir este produto?'))return;saveProdutos(loadProdutos().filter(p=>p.id!==id));renderTabela()}
renderTabela();
