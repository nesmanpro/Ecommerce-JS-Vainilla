
// DOM menu mobile
const openMenu = document.querySelector('#open-menu')
const closeMenu = document.querySelector('#close-menu')
const aside = document.querySelector('aside')
botonesCategoria = document.querySelectorAll('.boton-categoria');
// const botonLogin = document.querySelector('#login');

// // DOM login
// const navLogin = document.querySelector('#nav-login');
// const inputMensaje = document.querySelector('#input-mensaje');
// const formContainer = document.querySelector('#form');
// let loginInp = document.querySelector('#input-login');
// let passwordInp = document.querySelector('#input-password');
// const inputBoton = document.querySelector('#button-form');


openMenu.addEventListener('click', () => {
    aside.classList.add('aside-visible');
});

closeMenu.addEventListener('click', () => {
    aside.classList.remove('aside-visible');
});

botonesCategoria.forEach(boton => boton.addEventListener('click', () =>{
    aside.classList.remove('aside-visible');
}))


// // login popup
// botonLogin.addEventListener('click', loginNav)
// function loginNav(){
//     if(navLogin.classList.contains('disabled')){
//         navLogin.classList.remove('disabled');
//     } else if(!navLogin.classList.contains('disabled')) {
//         navLogin.className.add('disabled');
//         console.log('esta funcionando');
//     }
// };

// declaraciones formulario
// let inputLogin = document.querySelector('#input-login');
// let inputPassword = document.getElementById('input-password');
// const formLogin = document-querySelector('.form-login');

// inputLogin.onkeydown = () => {
//     if(inputLogin.value.length < 3){
//         inputLogin.style.color = 'red';
//     } else {
//         inputLogin.style.color = 'black';
//     }
// }