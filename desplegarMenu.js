// Dinamismo para el menu desplegable
const side_btn = document.querySelector('#side_menu_btn');
const side_menu = document.querySelector('#side_menu');

side_btn.addEventListener('click', e => {
    side_menu.classList.toggle("side_menu_expanded");
    side_menu.classList.toggle("side_menu_collapsed");
    document.querySelector('main').classList.toggle('main_expanded');
})