const btn = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
