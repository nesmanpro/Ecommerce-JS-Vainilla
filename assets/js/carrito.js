
// DOM carrito.html
let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
let datosFormulario = JSON.parse(localStorage.getItem('valores_de_input')) || [];
const carritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarrito = document.querySelector('#carrito-productos');
const carritoAcciones = document.querySelector('#carrito-acciones');
const carritoComprado  = document.querySelector('#carrito-comprado');
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const botonVaciar = document.querySelector('#botonVaciarCarrito');
const botonComprarAhora = document.querySelector('#botonComprarAhora');
const totalCompra = document.querySelector('#total');
const botonLogin = document.querySelector('#boton-login')




//funcion precargar productos del array carrito
function cargarProductos(){
    
    // condicional para ocultar o mostrar elementos ocultos mediante classes
    if(productosEnCarrito.length > 0) {
    
        carritoVacio.classList.add('disabled');
        carritoComprado.classList.add('disabled');
        carritoAcciones.classList.remove('disabled');
        contenedorCarrito.classList.remove('disabled');
    
        // reinicia carrito de cero
        contenedorCarrito.innerHTML = '';
    
        // carga productos del carrito
        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.foto}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3 class="tituloh3">${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio precio-mobile">
                    <small>precio</small>
                    <p>${producto.precio} €</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>subtotal</small>
                    <p>${producto.precio * producto.cantidad}€</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
    
            contenedorCarrito.append(div)
        });
        
    } else {
        carritoVacio.classList.remove('disabled');
        carritoComprado.classList.add('disabled');
        carritoAcciones.classList.add('disabled');
        contenedorCarrito.classList.add('disabled');
    }

    ActualizarBotonesEliminar()
    calcularTotal()
}

cargarProductos()
ActualizarBotonesEliminar()

//funcion cargar eventListener en botones cada vez q se generen 
function ActualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', eliminarDelCarrito);
        
    })
}


function eliminarDelCarrito(e) {

    //constante del id producto actual del boton eliminar
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if(productosEnCarrito[index].cantidad > 1) {
        productosEnCarrito[index].cantidad--;
    } else {
        productosEnCarrito.splice(index, 1);
    }

    cargarProductos();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
};

// Evento boton vaciar carrito 
botonVaciar.addEventListener('click', vaciarCarrito)
function vaciarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    cargarProductos(); 
};

// Funcion calcular precio total
function calcularTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
    totalCompra.innerText = `${totalCalculado} €`

};

// Funcion evento boton comprar
botonComprarAhora.addEventListener('click', comprarCarrito)
function comprarCarrito(){

    if(datosFormulario.length === 0){

        Swal.fire({
            title: `Parece que no estas registrado` ,
            text: "Primero debes suscribirte para realizar el pedido 🎉",
            icon: 'warning',
            color: "#4f2d8c",
            position: "center",
            backdrop: "0 0 0 100vmax rgba(0, 0, 0, .75)",
            background: "white",
            allowOutsideClick: true,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 3000
        });

    } else {
        productosEnCarrito.length = 0;
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    
        carritoVacio.classList.add('disabled');
        carritoComprado.classList.remove('disabled');
        carritoAcciones.classList.add('disabled');
        contenedorCarrito.classList.add('disabled');
    
        Swal.fire({
            title: `Gracias por tu compra ${datosFormulario[0].nombre}` ,
            text: "Esperamos verte pronto! 🎉",
            color: "#4f2d8c",
            icon: 'success',
            position: "center",
            backdrop: "linear-gradient(to right, #E94057, #8A2387)",
            background: "white",
            allowOutsideClick: true,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 3000
        });
    }
    
    
};
