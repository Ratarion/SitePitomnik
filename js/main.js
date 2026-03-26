const navIcon = document.getElementById('nav-icon');
const navList = document.querySelector('.nav-list');

navIcon.addEventListener('click', () => {
  navIcon.classList.toggle('open');
  navList.classList.toggle('show');
});