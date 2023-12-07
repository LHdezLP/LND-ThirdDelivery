const NAV = document.querySelector('.navbar');
const SHOW = document.querySelector('#open-menu');

SHOW.addEventListener('click', () => {
  NAV.classList.toggle('visible');
});