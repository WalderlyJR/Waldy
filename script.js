// ===== NAV em scroll (adiciona fundo quando rola)
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ===== Menu móvel (hamburger + drawer)
(function () {
  const hamb = document.getElementById('hamb');
  const drawer = document.getElementById('drawer');
  if (!hamb || !drawer) return;
  // popular drawer apenas uma vez (com os links da .menu):
  if (!drawer.innerHTML.trim()) {
    const anchors = Array.from(document.querySelectorAll('.menu a'));
    drawer.innerHTML = anchors.map(a => `<a href="${a.getAttribute('href')}">${a.textContent}</a>`).join('');
  }
  hamb.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') drawer.classList.remove('open');
  });
})();

// ===== Vídeo do hero: pausa quando sai da tela + respeita "reduzir movimento"
(function () {
  const video = document.getElementById('bgv');
  if (!video) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { video.removeAttribute('autoplay'); video.pause(); }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(ent => ent.isIntersecting ? video.play().catch(()=>{}) : video.pause()),
      { threshold: 0.2 }
    );
    io.observe(video);
  }
})();

// ===== Galeria (botões prev/next)
(function () {
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const grid = document.getElementById('grid');
  if (!prevBtn || !nextBtn || !grid) return;
  prevBtn.addEventListener('click', () => grid.scrollBy({ left: -320, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => grid.scrollBy({ left: 320, behavior: 'smooth' }));
})();

// ===== Contador (até 27/11/2025 00:00 — usa horário local do navegador)
(function () {
  const target = new Date('2025-11-27T00:00:00');
  const el = id => document.getElementById(id);
  const d = el('dias'), h = el('horas'), m = el('minutos'), s = el('segundos');
  const wrap = el('contador'), cta = document.getElementById('botao-compra');
  if (!d || !h || !m || !s || !wrap) return;

  function tick () {
    const now = new Date();
    const ms = target - now;
    if (ms <= 0) {
      clearInterval(timer);
      wrap.innerHTML = '<h3>🚀 O livro já está disponível!</h3>';
      if (cta) cta.style.display = 'inline-flex';
      return;
    }
    const dd = Math.floor(ms / 86400000);
    const hh = Math.floor(ms % 86400000 / 3600000);
    const mm = Math.floor(ms % 3600000 / 60000);
    const ss = Math.floor(ms % 60000 / 1000);
    d.textContent = String(dd).padStart(2, '0');
    h.textContent = String(hh).padStart(2, '0');
    m.textContent = String(mm).padStart(2, '0');
    s.textContent = String(ss).padStart(2, '0');
  }
  tick();
  const timer = setInterval(tick, 1000);
})();
// === HERO: playlist infinita com 2 vídeos (forçado, compatível com Linux/Firefox/Chromium) ===
(function () {
  const A = document.getElementById('bgvA');
  const B = document.getElementById('bgvB');
  if (!A || !B) return;

  const playlist = [
    'video/caiaquevideo.mp4',
    'video/horacaojet.mp4',
    'video/saidajet.mp4',
    'video/velavideo.mp4'
  ];

  let idx = 0;
  let onA = true;
  let timer = null;

  function playVideo(player, src) {
    player.pause();
    player.src = src;
    player.load();
    player.muted = true;
    player.autoplay = true;
    player.playsInline = true;
    player.setAttribute('playsinline', '');
    player.play().catch(() => {});
  }

  function swapVideos() {
    const active = onA ? A : B;
    const standby = onA ? B : A;

    idx = (idx + 1) % playlist.length;
    playVideo(standby, playlist[idx]);

    // fade suave
    active.classList.remove('active');
    standby.classList.add('active');
    onA = !onA;

    scheduleNext(standby);
  }

  function scheduleNext(player) {
    clearTimeout(timer);

    const duration = isFinite(player.duration) && player.duration > 0 ? player.duration : 20;
    const delay = (duration * 1000) - 1000; // 1s antes do fim

    timer = setTimeout(swapVideos, delay);
  }

  // inicializa o primeiro vídeo
  playVideo(A, playlist[idx]);
  A.addEventListener('loadedmetadata', () => scheduleNext(A));

  // também troca se o evento "ended" ocorrer de fato
  [A, B].forEach(v => v.addEventListener('ended', swapVideos));
})();
// ===== Fim do código =====