

// DOM login
const navLogin = document.querySelector('#nav-login');
const inputMensaje = document.querySelector('#input-mensaje');
const formContainer = document.querySelector('#form');
let loginInp = document.querySelector('#input-login');
let passwordInp = document.querySelector('#input-password');
const inputBoton = document.querySelector('#button-form');
let prodCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
const numerito = document.querySelector('#numero')


// llamamos a la funcion actualizar cantidad (declarada más abajo)
actualizarNumerito();


// Function actualizar cantidad de productos teniendo en cuenta producto.cantidad 
function actualizarNumerito() {
    const lastNumerito = prodCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = lastNumerito;
}