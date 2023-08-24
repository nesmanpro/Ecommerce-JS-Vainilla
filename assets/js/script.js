//declarar el array vacio que contendrá los productos
let productos = [];

// fetch de los productos del Json
fetch("./assets/js/products.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

    
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

    // llama a funcion con AddEventListener de cada boton "Agregar" nuevo
    ActualizarBotonesAgregar()
    actualizarNumerito()
}


// evento botones y filtrado productos por ID (currentTarget para que sea todo el boton y no solo un elemento suelto)
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', (e) => {

        // desactiva .active en el resto de botones
        botonesCategoria.forEach(boton => boton.classList.remove('active'));
        
        // activa .active el boton seleccionado
        e.currentTarget.classList.add('active');

        // condicional si id boton != "todos", filtra productos con id === id boton, y cambia titulo correspondiente.
        if (e.currentTarget.id != 'todos') {
            
            // constante busca exista categoria con mismo id del boton
            const prodsTitle = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            // cambia titulo al nombre categoria
            tituloPrincipal.innerText = prodsTitle.categoria.nombre

            // constante busca y muestra productos con mimsma categoria que id del boton
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

            cargarProductos(productosBoton);

        } else {

            // muestra todos productos
            tituloPrincipal.innerText = 'Todos los productos'
            cargarProductos(productos);
        }
    })
})



//funcion para cargar botones generados de productos con eventListener
function ActualizarBotonesAgregar(){

    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
        
    })
}



//funcion agregar productos al carrito y aumentar cantidad si ya existe en carrito (evitando duplicidad)
function agregarAlCarrito(e) {

    //Guarda id del boton del producto a agregar
    const idBoton = e.currentTarget.id;

    // Guarda objetos con mismo id que boton
    const productAdded = productos.find(producto => producto.id === idBoton);
    
    // Guarga posicion del producto con mismo id
    const index = prodCarrito.findIndex(producto => producto.id === idBoton);

    // sabiendo la posicion, podemos aumentar su cantidad en caso de que ya este agregado
    if(prodCarrito.some(producto => producto.id === idBoton)){
        prodCarrito[index].cantidad++;
        
    } else {

        // o agregarlo en caso de que no esté.
        productAdded.cantidad = 1;
        prodCarrito.push(productAdded);  
        
    }

    // toastify con el nombre del producto agregado
    Toastify({
        text: `Se ha agregado "${productAdded.titulo}" al carrito`,
        duration: 1500,
        className: "info",
        style: {
            background: "linear-gradient(to right, #E94057, #8A2387)",
        },
        offset: {
            y: 15,
        },
    }).showToast();

    // llamamos a la funcion actualizar cantidad (declarada más abajo)
    actualizarNumerito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(prodCarrito));
};



// Function actualizar cantidad de productos teniendo en cuenta producto.cantidad 
function actualizarNumerito() {
    const lastNumerito = prodCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerHTML = lastNumerito;


}




