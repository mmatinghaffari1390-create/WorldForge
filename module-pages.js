'use strict';
(() => {
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const main=$('[data-module-page]'); if(!main)return;
let active='all'; const search=$('[data-module-search]'); const cards=$$('.module-card[data-category]',main); const empty=$('[data-empty]',main);
function apply(){let shown=0;cards.forEach(card=>{const category=(card.dataset.category||'').toLowerCase();const query=(search?search.value:'').trim().toLowerCase();const text=(card.dataset.search||card.textContent).toLowerCase();const ok=(active==='all'||category===active)&&(!query||text.includes(query));card.hidden=!ok;if(ok)shown++;});if(empty)empty.hidden=shown>0;}
if(search)search.addEventListener('input',apply);
$$('[data-filter]',main).forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;$$('[data-filter]',main).forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));apply();}));
if(main.dataset.modulePage==='community'){
const form=$('#idea-form'),list=$('#idea-list'),status=$('#idea-status');let ideas=[];try{ideas=JSON.parse(localStorage.getItem('wf-local-ideas')||'[]');if(!Array.isArray(ideas))ideas=[];}catch(e){ideas=[];}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){list.textContent='';ideas.forEach((idea,index)=>{const article=document.createElement('article');article.className='module-card';const body=document.createElement('div');body.className='module-card-body';const tag=document.createElement('span');tag.className='module-tag';tag.textContent=document.documentElement.lang==='en'?'LOCAL NOTE':'یادداشت محلی';const h=document.createElement('h3');h.textContent=idea.title;const p=document.createElement('p');p.textContent=idea.description;const del=document.createElement('button');del.type='button';del.className='filter-chip';del.textContent=document.documentElement.lang==='en'?'Delete note':'حذف یادداشت';del.addEventListener('click',()=>{ideas.splice(index,1);persist();render();});body.append(tag,h,p,del);article.append(body);list.append(article);});}
function persist(){try{localStorage.setItem('wf-local-ideas',JSON.stringify(ideas));status.textContent=document.documentElement.lang==='en'?'Saved in this browser only.':'فقط در همین مرورگر ذخیره شد.';}catch(e){status.textContent=document.documentElement.lang==='en'?'Browser storage is unavailable.':'ذخیره‌سازی مرورگر در دسترس نیست.';}}
if(form)form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const title=String(data.get('title')||'').trim(),description=String(data.get('description')||'').trim();if(!title||!description)return;ideas.unshift({title,description});ideas=ideas.slice(0,12);persist();render();form.reset();});render();
}
})();
