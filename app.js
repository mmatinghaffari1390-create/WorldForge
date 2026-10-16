'use strict';
(() => {
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const menu=$('.menu-toggle'), nav=$('#primary-nav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});}
 const theme=$('#theme-toggle');let light=false;try{light=localStorage.getItem('wf-theme-v2')==='light'}catch{};document.body.classList.toggle('light',light);
 theme?.addEventListener('click',()=>{light=!document.body.classList.contains('light');document.body.classList.toggle('light',light);try{localStorage.setItem('wf-theme-v2',light?'light':'dark')}catch{};theme.setAttribute('aria-pressed',String(light));});
 const langButton=$('#language-toggle');let lang='fa';try{lang=localStorage.getItem('wf-lang-v2')||'fa'}catch{};
 function setLang(next){lang=next;document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';$$('[data-fa][data-en]').forEach(el=>{el.innerHTML=el.dataset[lang]});if(langButton)langButton.textContent=lang==='fa'?'EN':'فا';try{localStorage.setItem('wf-lang-v2',lang)}catch{}}
 langButton?.addEventListener('click',()=>setLang(lang==='fa'?'en':'fa'));setLang(lang);
 const links=$$('.primary-nav a,.mobile-dock a');const current=location.pathname.split('/').pop()||'index.html';links.forEach(a=>{if(a.getAttribute('href')===current){a.classList.add('active','dock-active');a.setAttribute('aria-current','page')}});
 const reveal=$('.portal,.feature-copy,.feature-visual,.community-card,.inner-hero,.inner-panel');if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){reveal.forEach(el=>el.classList.add('reveal'));const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.12});reveal.forEach(el=>io.observe(el))}
})();