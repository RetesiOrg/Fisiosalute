import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {CONSENT_KEY, parseConsent, newConsent} from '../src/scripts/consent-store.ts';
const source=readFileSync(new URL('../src/components/CookieConsent.astro',import.meta.url),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1].replace(/import .*?from .*?;/,'');
const js=ts.transpile(source,{target:ts.ScriptTarget.ES2022});
function setup(raw=null,blocked=false){
 const listeners={};
 const element=()=>({hidden:false,checked:false,open:false,listeners:{},children:[],dataset:{mapTitle:'Mappa'},addEventListener(n,f){this.listeners[n]=f},click(){this.listeners.click?.()},focus(){},closest(){return null},querySelector(){return this.children[0]??null},append(e){this.children.push(e)},replaceChildren(){this.children=[]},showModal(){this.open=true},close(){this.open=false;this.listeners.close?.()}});
 const banner=element(),dialog=element(),checkbox=element(),status=element(),placeholder=element(),frame=element(),settings=element(),accept=element(),reject=element(),save=element(),close=element();
 const map=element();map.querySelector=s=>s==='[data-map-placeholder]'?placeholder:frame;
 const selectors={'#cookie-banner':banner,'#cookie-preferences':dialog,'#consent-maps':checkbox,'#cookie-status':status,'#consent-save':save,'#consent-close':close};
 const lists={'[data-consent-map]':[map],'[data-cookie-settings]':[settings],'[data-consent-accept]':[accept],'[data-consent-reject]':[reject]};
 let value=raw;
 const localStorage={getItem(){if(blocked)throw Error();return value},setItem(k,v){if(blocked)throw Error();value=v}};
 const document={hidden:false,querySelector:s=>selectors[s],querySelectorAll:s=>lists[s]??[],createElement:()=>element(),addEventListener(n,f){listeners[n]=f}};
 vm.runInNewContext(js,{document,window:{addEventListener(n,f){listeners[n]=f}},localStorage,CONSENT_KEY,parseConsent,newConsent,Date,setTimeout:()=>1,clearTimeout(){}});
 return {banner,dialog,checkbox,status,placeholder,frame,settings,accept,reject,save,close,listeners,getStored:()=>value,setStored:v=>value=v};
}
test('maps have no iframe until consent; refusal persists across page loads',()=>{
 const ui=setup();assert.equal(ui.banner.hidden,false);assert.equal(ui.frame.children.length,0);
 ui.reject.click();assert.equal(ui.banner.hidden,true);assert.equal(ui.frame.children.length,0);
 const next=setup(ui.getStored());assert.equal(next.banner.hidden,true);assert.equal(next.frame.children.length,0);
});
test('accept loads map, preference revocation removes it, reload stays blocked',()=>{
 const ui=setup();ui.accept.click();assert.equal(ui.frame.children.length,1);assert.match(ui.frame.children[0].src,/google.com\/maps/);
 ui.settings.click();assert.equal(ui.dialog.open,true);assert.equal(ui.checkbox.checked,true);
 ui.checkbox.checked=false;ui.save.click();assert.equal(ui.dialog.open,false);assert.equal(ui.frame.children.length,0);
 assert.equal(setup(ui.getStored()).frame.children.length,0);
});
test('custom preferences start off; closing does not consent; storage failure fails closed on next load',()=>{
 const ui=setup(null,true);ui.settings.click();assert.equal(ui.checkbox.checked,false);ui.close.click();assert.equal(ui.frame.children.length,0);assert.equal(ui.banner.hidden,false);
 ui.checkbox.checked=true;ui.save.click();assert.equal(ui.frame.children.length,1);assert.match(ui.status.textContent,/non consente/);assert.equal(setup(null,true).frame.children.length,0);
});
test('revocation in another tab removes loaded frame',()=>{
 const ui=setup(JSON.stringify(newConsent(true)));assert.equal(ui.frame.children.length,1);
 ui.setStored(JSON.stringify(newConsent(false)));ui.listeners.storage({key:CONSENT_KEY});assert.equal(ui.frame.children.length,0);
});
