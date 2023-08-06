

// DOM login
const navLogin = document.querySelector('#nav-login');
const LoginMensaje = document.querySelector('#login-input-mensaje');
const PasswordMensaje = document.querySelector('#pass-input-mensaje');
const formContainer = document.querySelector('#form');
let loginInp = document.querySelector('#input-login');
let passwordInp = document.querySelector('#input-password');
let direccionInp = document.querySelector('#input-direccion');
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



loginInp.onchange = () => {
    if(loginInp.value.length < 3){
        loginInp.style.color = 'red';
        LoginMensaje.innerText = '*Mínimo 3 caracteres'
    } else {
        loginInp.style.color = 'black';
        LoginMensaje.innerText = ''
    }

}

passwordInp.onchange = () => {
    if(passwordInp.value.length < 6){
        passwordInp.style.color = 'red';
        PasswordMensaje.innerText = '*Mínimo 6 caracteres'
    } else {
        passwordInp.style.color = 'black';
        PasswordMensaje.innerText = ''
    }

}