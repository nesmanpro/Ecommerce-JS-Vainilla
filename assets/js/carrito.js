
// DOM carrito.html
let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || [];
const carritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarrito = document.querySelector('#carrito-productos');
const carritoAcciones = document.querySelector('#carrito-acciones');
const carritoComprado  = document.querySelector('#carrito-comprado');
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')


//funcion cargar productos del array carrito
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
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
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

