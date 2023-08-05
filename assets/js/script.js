
// DOM
const contenedorProducts = document.querySelector('#contenedor-productos');
const botonesCategoria = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numero');
let prodCarrito = JSON.parse(localStorage.getItem('productos-en-carrito')) || []; 



//funcion crea producto por cada objeto de objetos.js
function cargarProductos(productosElegidos) {
    //vaciar div Productos para que reinicie cada vez que se llama a la funcion
    contenedorProducts.innerHTML = '';

    //añade HTML por cada producto
    productosElegidos.forEach(producto => {
        
        const prod = document.createElement('div');
        prod.classList.add('producto');
        prod.innerHTML = `
            <img class="producto-imagen" src="${producto.foto}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio} €</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;


        contenedorProducts.append(prod);
    })
    // llama a funcion con un AddEventListener de cada boton "Agregar" nuevo
    ActualizarBotonesAgregar()
    actualizarNumerito()
}


// llama a funcion anterior
cargarProductos(productos);




// evento botones y filtrado productos por ID (currentTarget para que sea todo el boton y no solo un elemento suelto)
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {

        // desactiva .active el resto de botones
        botonesCategoria.forEach(boton => boton.classList.remove('active'));
        
        // activa .active el boton seleccionado
        e.currentTarget.classList.add('active');

        // condicional si id boton != "todos", filtra productos con id === id boton, y cambia titulo correspondiente
        if (e.currentTarget.id != 'todos') {
            
            const prodsTitle = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = prodsTitle.categoria.nombre
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        } else {
            tituloPrincipal.innerText = 'Todos los productos'
            cargarProductos(productos);
        }
    })
})



//funcion cargar eventListener en botones cada vez q se generen 
function ActualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
        
    })
}



//funcion agregar productos al carrito y aumentar cantidad si ya existe en carrito (evitando duplicidad)
function agregarAlCarrito(e) {

    //constante del id producto actual del boton que se selecciona
    const idBoton = e.currentTarget.id;
    // constante producto encontrado con coincidencia de 
    const productAdded = productos.find(producto => producto.id === idBoton);

    const index = prodCarrito.findIndex(producto => producto.id === idBoton);

    if(prodCarrito.some(producto => producto.id === idBoton)){
        prodCarrito[index].cantidad++;
        
    } else {

        productAdded.cantidad = 1;
        prodCarrito.push(productAdded);  
        
    }

    // toastify con el nombre del producto
    Toastify({
        text: `Se ha agregado "${productAdded.titulo}" al carrito`,
        duration: 1500,
        className: "info",
        style: {
            background: "linear-gradient(to right, #4f2d8c, #e72362)",
        },
        offset: {
            y: 15,
        },
    }).showToast();


    actualizarNumerito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(prodCarrito));
};



// Function sumar numero de productos y mostrarlo en aside
function actualizarNumerito() {
    const lastNumerito = prodCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = lastNumerito;
}