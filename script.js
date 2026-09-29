const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.documentElement.dataset.theme = 'light';

const updateThemeToggle = () => {
  const isLight = document.documentElement.dataset.theme === 'light';
  themeToggle?.setAttribute('aria-pressed', String(isLight));
  themeToggle?.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  if (themeToggle) themeToggle.textContent = isLight ? 'Dark' : 'Light';
};

themeToggle?.addEventListener('click', () => {
  const isLight = document.documentElement.dataset.theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');
  updateThemeToggle();
});

updateThemeToggle();
menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.mobile-expander').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector('.' + button.dataset.target);
    if (!target) return;

    const expanded = target.classList.toggle('is-expanded');
    button.setAttribute('aria-expanded', String(expanded));
    button.innerHTML = expanded
      ? 'Show less <span>↑</span>'
      : 'View full ' + (button.dataset.target === 'timeline' ? 'journey' : 'toolkit') + ' <span>↓</span>';
  });
});
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
