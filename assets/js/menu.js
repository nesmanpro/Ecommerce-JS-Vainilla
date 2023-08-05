
// DOM menu mobile
const openMenu = document.querySelector('#open-menu')
const closeMenu = document.querySelector('#close-menu')
const aside = document.querySelector('aside')
botonesCategoria = document.querySelectorAll('.boton-categoria');


openMenu.addEventListener('click', () => {
    aside.classList.add('aside-visible');
});

closeMenu.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
});

botonesCategoria.forEach(boton => boton.addEventListener('click', () =>{
    aside.classList.remove('aside-visible');
}))

