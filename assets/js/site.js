// Mobile navigation toggle
const navBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navBtn && nav) {
  navBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', String(open));
  });
}

// Colour-theme toggle: auto (follow system) -> light -> dark -> auto
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  const root = document.documentElement;
  const order = ['auto', 'light', 'dark'];
  const icon = { auto: '◐', light: '☀', dark: '☾' }; // ◐ ☀ ☾
  const label = {
    auto: themeBtn.dataset.labelAuto,
    light: themeBtn.dataset.labelLight,
    dark: themeBtn.dataset.labelDark,
  };
  const read = () => {
    try { return localStorage.getItem('theme') || 'auto'; } catch (e) { return 'auto'; }
  };
  const apply = (mode) => {
    if (mode === 'dark' || mode === 'light') {
      root.setAttribute('data-theme', mode);
    } else {
      root.removeAttribute('data-theme');
    }
    themeBtn.textContent = icon[mode];
    themeBtn.setAttribute('aria-label', label[mode] || 'Colour theme');
    themeBtn.setAttribute('title', label[mode] || 'Colour theme');
  };
  apply(read());
  themeBtn.addEventListener('click', () => {
    const next = order[(order.indexOf(read()) + 1) % order.length];
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    apply(next);
  });
}
