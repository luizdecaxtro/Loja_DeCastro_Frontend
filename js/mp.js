
import { LS_KEYS } from './js/store.js';
let mp=null;
export function initMercadoPago(){ const pk=localStorage.getItem(LS_KEYS.MP_PK)||'SUA_PUBLIC_KEY_AQUI'; if(!window.MercadoPago){ console.warn('SDK MP não carregado'); return; } mp=new MercadoPago(pk,{locale:'pt-BR'}); }
export async function openWallet(){ if(!mp){ alert('MP não inicializado'); return; } const preferenceId=localStorage.getItem(LS_KEYS.PREF_ID); if(!preferenceId){ alert('Gere um preferenceId no backend e salve:
localStorage.setItem("dc_mp_preference_id","PREF_ID")'); return; } const bricks=mp.bricks(); const target=document.getElementById('mp-wallet'); target.innerHTML=''; await bricks.create('wallet','mp-wallet',{initialization:{preferenceId},customization:{texts:{valueProp:'security_details'}}}); }
