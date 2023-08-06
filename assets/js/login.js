

// DOM login
const navLogin = document.querySelector('#nav-login');
const mensaje = document.querySelector('#input-mensaje');
const formContainer = document.querySelector('#form');
let loginInp = document.querySelector('#input-login');
let emailInp = document.querySelector('#input-email');
let direccionInp = document.querySelector('#input-direccion');
const inputBoton = document.querySelector('#button-form');

// DOM Actualizar numerito carro
let prodCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
const numerito = document.querySelector('#numero')

// llamamos a la funcion actualizar cantidad (declarada más abajo)
actualizarNumerito();


// Function actualizar cantidad de productos teniendo en cuenta producto.cantidad 
function actualizarNumerito() {
    const lastNumerito = prodCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = lastNumerito;
}




// Funcion para obtener datos en caso de que ya esten guardados
const obtenerDatos = async () => {
    const res = localStorage['valores_de_input'] ? JSON.parse(localStorage['valores_de_input']) : [];
    const datos = getData()

    nombreCompleto.value = datos[0].nombre
    fechaNacimiento.value = datos[0].nacimiento
    fechaNacimiento.value = datos[0].nacimiento

}

// funcion que guarda datos formulario

let datosFormulario = JSON.parse(localStorage.getItem('valores_de_input')) || [];

const save = () => {

    datosFormulario = [];

    const datoUsuario = {
        nombre: loginInp.value,
        email: emailInp.value,
        direccionInp: direccionInp.value
    }

    datosFormulario.push(datoUsuario);

    localStorage.setItem("valores_de_input", JSON.stringify(datosFormulario));


}


// lanzar aviso que campos no estan correctos


navLogin.addEventListener('submit', validarForm);
function validarForm(e){

    e.preventDefault()

    if(loginInp.value.length < 3){

        mensaje.innerText = '* El nombre debe contener mínimo 3 caracteres'

    } else if(!emailInp.value.includes('@') || !emailInp.value.includes('.')){


        mensaje.innerText = '* Ingresa una direccion de correo válida.'

    } else if(direccionInp.value.length < 5) {


        mensaje.innerText = '* Una dirección válida es obligarotia para el envío.'

    } else {

        mensaje.innerText = '';

        save()

    Swal.fire({
        title: `Gracias ${loginInp.value}`,
        text: "Tus datos se han guardado.🥳 \n Ya puedes realizar tu pedido.🎉",
        color: "#4f2d8c",
        icon: 'success',
        position: "center",
        backdrop: "linear-gradient(to right, #E94057, #8A2387)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2500
    });
    }


}

