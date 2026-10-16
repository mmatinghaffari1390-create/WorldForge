/* WORLDFORGE UX layer — progressive enhancement, no dependencies. */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const skipLink = document.createElement('a');
  skipLink.className = 'skip-to-content';
  skipLink.href = '#home';
  skipLink.textContent = 'Skip to main content / رفتن به محتوای اصلی';
  document.body.prepend(skipLink);

  // Scroll progress + back-to-top control.
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  const topButton = document.createElement('button');
  topButton.className = 'back-to-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', 'Back to top');
  topButton.title = 'Back to top';
  topButton.textContent = '↑';
  document.body.append(topButton);
  let scheduled = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    topButton.classList.toggle('visible', window.scrollY > 520);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();
  topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:reduceMotion?'auto':'smooth'}));

  // Reveal content only when supported; everything remains visible without JS/observer.
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.hub-tile, .mod-card, .server-card, .build-card, .section-head, .craft-app, .community-layout, .progress-layout').forEach((el, i) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${Math.min(i % 4, 3) * 55}ms`);
      observer.observe(el);
    });
  }

  // Quick command palette: keyboard-accessible site-wide page search.
  const links = [
    ['Home','خانه','index.html#home'], ['Explore portal','بخش‌ها','index.html#discover'],
    ['Mods & resources','مودها و منابع','mods.html'], ['Servers','سرورها','servers.html'],
    ['Build gallery','گالری سازه‌ها','gallery.html'], ['Crafting lab','کارگاه کرفتینگ','games.html'],
    ['Community','جامعه','community.html'], ['Progress & badges','پیشرفت و نشان‌ها','progress.html']
  ];
  const quickButton = document.createElement('button');
  quickButton.className = 'quick-nav-trigger';
  quickButton.type = 'button';
  quickButton.setAttribute('aria-label', 'Quick navigation');
  quickButton.title = 'Quick navigation · Ctrl/Cmd+K';
  quickButton.innerHTML = '<span>⌘</span><small>GO TO</small>';
  document.body.append(quickButton);
  const overlay = document.createElement('div');
  overlay.className = 'command-overlay';
  overlay.hidden = true;
  overlay.innerHTML = '<section class="command-dialog" role="dialog" aria-modal="true" aria-labelledby="commandTitle"><div class="command-heading"><strong id="commandTitle">WORLDFORGE · QUICK NAVIGATION</strong><button type="button" class="command-close" aria-label="Close">×</button></div><input class="command-input" type="search" placeholder="Search pages… / جست‌وجوی بخش‌ها" autocomplete="off"><div class="command-results" role="listbox"></div><footer>ESC <span>close</span><kbd>⌘ K / CTRL K</kbd></footer></section>';
  document.body.append(overlay);
  const input = $('.command-input', overlay), results = $('.command-results', overlay);
  let active = 0, previousFocus = null;
  const render = () => {
    const q = input.value.trim().toLocaleLowerCase();
    const matches = links.filter(x => x.join(' ').toLocaleLowerCase().includes(q));
    active = Math.min(active, Math.max(0, matches.length - 1));
    results.innerHTML = matches.length ? matches.map((x,i)=>`<a role="option" aria-selected="${i===active}" class="command-option ${i===active?'active':''}" href="${x[2]}"><span><b>${x[0]}</b><small>${x[1]}</small></span><kbd>↵</kbd></a>`).join('') : '<p class="command-empty">No matching destination · بخشی پیدا نشد</p>';
    results.querySelectorAll('a').forEach(a=>a.addEventListener('mouseenter',()=>{active=[...results.querySelectorAll('a')].indexOf(a);render()}));
  };
  const open = () => { previousFocus=document.activeElement; overlay.hidden=false; document.body.classList.add('command-open'); input.value=''; render(); input.focus(); };
  const close = () => { overlay.hidden=true; document.body.classList.remove('command-open'); if(previousFocus && previousFocus.focus) previousFocus.focus(); };
  $('.command-close', overlay).addEventListener('click', close);
  quickButton.addEventListener('click', open);
  overlay.addEventListener('click', e=>{if(e.target===overlay)close()});
  input.addEventListener('input',()=>{active=0;render()});
  input.addEventListener('keydown',e=>{
    const options=[...results.querySelectorAll('a')];
    if(e.key==='ArrowDown'){e.preventDefault();active=Math.min(active+1,options.length-1);render()}
    if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(0,active-1);render()}
    if(e.key==='Enter'&&options[active]){e.preventDefault();window.location.href=options[active].getAttribute('href')}
    if(e.key==='Escape'){e.stopPropagation();close()}
  });
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.hidden?open():close()}
    if(e.key==='/'&&overlay.hidden&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();open()}
  });
  render();

  if (!document.querySelector('link[data-enhancement-css]')) { const css=document.createElement('link'); css.rel='stylesheet'; css.href='enhancement.css'; css.dataset.enhancementCss='true'; document.head.append(css); }


  // Floating mobile dock inspired by the supplied navigation references.
  if (!document.querySelector('.wf-mobile-dock')) {
    const destinations = [
      ['index.html#home','⌂','خانه','Home'],
      ['servers.html','◇','سرورها','Servers'],
      ['gallery.html','▧','گالری','Gallery'],
      ['community.html','☏','جامعه','Community'],
      ['account.html','♙','حساب','Account']
    ];
    const current = location.pathname.split('/').pop() || 'index.html';
    const activeIndex = destinations.findIndex(d => d[0].split('#')[0] === current);
    const dock = document.createElement('nav');
    dock.className = 'wf-mobile-dock';
    dock.setAttribute('aria-label','ناوبری سریع WORLDFORGE');
    dock.innerHTML = '<span class="wf-dock-glow" aria-hidden="true"></span>' + destinations.map((d,i) =>
      '<a class="wf-dock-item '+(i===activeIndex?'is-active':'')+'" href="'+d[0]+'" '+(i===activeIndex?'aria-current="page"':'')+' aria-label="'+d[2]+'" title="'+d[3]+'"><span class="wf-dock-icon" aria-hidden="true">'+d[1]+'</span><small>'+d[2]+'</small></a>'
    ).join('');
    document.body.append(dock);
    const glow = dock.querySelector('.wf-dock-glow');
    const moveGlow = item => {
      if (!item || !glow) return;
      const r = item.getBoundingClientRect(), p = dock.getBoundingClientRect();
      glow.style.left = (r.left - p.left + r.width/2) + 'px';
      glow.style.top = (r.top - p.top + r.height/2) + 'px';
    };
    moveGlow(dock.querySelector('.is-active'));
    dock.querySelectorAll('.wf-dock-item').forEach(item => item.addEventListener('pointerenter',()=>moveGlow(item)));
    dock.addEventListener('pointerleave',()=>moveGlow(dock.querySelector('.is-active')));
    window.addEventListener('resize',()=>moveGlow(dock.querySelector('.is-active')),{passive:true});
  }

  // Inject install metadata without requiring every HTML page to duplicate boilerplate.
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifest=document.createElement('link'); manifest.rel='manifest'; manifest.href='manifest.webmanifest'; document.head.append(manifest);
  }
  if ('serviceWorker' in navigator && location.protocol==='https:') {
    window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}),{once:true});
  }
})();