const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();
if (localStorage.getItem('xiaoli-theme') === 'dark') body.classList.add('dark');
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('xiaoli-theme', body.classList.contains('dark') ? 'dark' : 'light');
});
document.querySelector('.back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
